"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
// prismaClient.ts
const client_1 = require("@prisma/client");
// Create an instance of PrismaClient
const prisma = new client_1.PrismaClient();
exports.prisma = prisma;
