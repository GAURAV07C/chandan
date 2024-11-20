// prismaClient.ts
import { PrismaClient } from '@prisma/client';

// Create an instance of PrismaClient
const prisma = new PrismaClient();

// Export the instance so you can use it in other parts of your application
export { prisma };
