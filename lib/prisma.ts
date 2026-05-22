
# Generate lib/prisma.ts - Database client

prisma_client = """import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
"""

print("=" * 60)
print("FILE 6: lib/prisma.ts")
print("=" * 60)
print(prisma_client)

