import { ZodError } from "zod";
import { Request, Response } from "express";
import { loginSchema, registerSchema } from "../validation/authValidation";
import { prisma } from "../utils/prismaClient";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
require("dotenv").config();

class Auth {
  // Helper function to check if the user exists
  private static checkUserExists = async (email: string) => {
    return await prisma.user.findUnique({
      where: { email },
    });
  };

  static register = async (req: Request, res: Response) => {
    try {
      const body = req.body;
      const payload = registerSchema.parse(body);

      const existingUser = await Auth.checkUserExists(payload.email);
      if (existingUser) {
        return res.status(400).json({
          error: "Email already exists",
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(payload.password, salt);

      const user = await prisma.user.create({
        data: {
          name: payload.name,
          email: payload.email,
          password: hashedPassword,
          role: payload.role,
        },
      });

      if (payload.role === "editor") {
        await prisma.editor.create({
          data: {
            userId: user.id,
          },
        });
      }

      return res.status(201).json({
        msg: "User registered successfully",
        data: payload,
      });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ errors: error.errors });
      }
      console.error(error);
      return res.status(500).json({ msg: "Internal server error", error });
    }
  };

  static login = async (req: Request, res: Response) => {
    try {
      const body = req.body;
      const payload = loginSchema.parse(body);

      const existingUser = await Auth.checkUserExists(payload.email);
      if (!existingUser) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      const isPasswordMatch = await bcrypt.compare(payload.password, existingUser.password);
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

      const token = jwt.sign(JWTPayload, process.env.JWT_SECRET as string, {
        expiresIn: process.env.JWT_EXPIRES_IN || "365d",  // Make the expiration configurable
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
    } catch (error) {
      if (error instanceof ZodError) {
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
  };
}

export default Auth;
