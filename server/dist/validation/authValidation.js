"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgetPasswordSchema = exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z
    .object({
    name: zod_1.z
        .string({ message: "Name is required" })
        .min(3, { message: "Name must be 3 characters long" }),
    email: zod_1.z
        .string({ message: "Email is required." })
        .email({ message: "Please enter correct email" }),
    password: zod_1.z
        .string({ message: "Password is required" })
        .min(6, { message: "Password must be 6 characters long" }),
    confirm_password: zod_1.z.string({ message: "Confirm Password is required" }),
    role: zod_1.z
        .enum(["editor", 'user'], { message: "Role is required" }) // Added role validation
})
    .refine((data) => data.password === data.confirm_password, {
    message: "Confirm password not matched",
    path: ["confirm_password"],
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z
        .string({ message: "Email is required." })
        .email({ message: "Please enter correct email" }),
    password: zod_1.z.string({ message: "Password is required" }),
});
exports.forgetPasswordSchema = zod_1.z.object({
    email: zod_1.z.string({ message: "Email is required." }).email(),
});
