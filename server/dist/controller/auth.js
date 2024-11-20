"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const authValidation_1 = require("../validation/authValidation");
const prismaClient_1 = require("../utils/prismaClient");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv").config();
class Auth {
}
_a = Auth;
// Helper function to check if the user exists
Auth.checkUserExists = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prismaClient_1.prisma.user.findUnique({
        where: { email },
    });
});
Auth.register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const payload = authValidation_1.registerSchema.parse(body);
        const existingUser = yield _a.checkUserExists(payload.email);
        if (existingUser) {
            return res.status(400).json({
                error: "Email already exists",
            });
        }
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashedPassword = yield bcrypt_1.default.hash(payload.password, salt);
        const user = yield prismaClient_1.prisma.user.create({
            data: {
                name: payload.name,
                email: payload.email,
                password: hashedPassword,
                role: payload.role,
            },
        });
        if (payload.role === "editor") {
            yield prismaClient_1.prisma.editor.create({
                data: {
                    userId: user.id,
                },
            });
        }
        return res.status(201).json({
            msg: "User registered successfully",
            data: payload,
        });
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            return res.status(400).json({ errors: error.errors });
        }
        console.error(error);
        return res.status(500).json({ msg: "Internal server error", error });
    }
});
Auth.login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const payload = authValidation_1.loginSchema.parse(body);
        const existingUser = yield _a.checkUserExists(payload.email);
        if (!existingUser) {
            return res.status(404).json({
                message: "User not found",
            });
        }
        const isPasswordMatch = yield bcrypt_1.default.compare(payload.password, existingUser.password);
        if (!isPasswordMatch) {
            return res.status(401).json({
                message: "Password does not match",
            });
        }
        const JWTPayload = {
            id: existingUser.id,
            name: existingUser.name,
            email: existingUser.email,
            role: existingUser.role,
        };
        const token = jsonwebtoken_1.default.sign(JWTPayload, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN || "365d", // Make the expiration configurable
        });
        const resPayload = {
            id: existingUser.id,
            email: existingUser.email,
            name: existingUser.name,
            role: existingUser.role,
            token: `Bearer ${token}`,
        };
        return res.status(200).json({
            message: "Logged in successfully",
            data: resPayload,
        });
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            return res.status(422).json({
                message: "Invalid data",
                error: error.errors,
            });
        }
        console.error(error); // Improved logging
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
});
exports.default = Auth;
