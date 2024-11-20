"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Auth_1 = __importDefault(require("../controller/Auth"));
const router = (0, express_1.Router)();
// Register route
router.post("/register", Auth_1.default.register);
// Login route
router.post("/login", Auth_1.default.login);
exports.default = router;
