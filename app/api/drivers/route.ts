
# Generate app/api/drivers/route.ts - Driver CRUD API

drivers_api = """import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const driverSchema = z.object({
  name: z.string().min(1),
  phone: z.string().optional(),
  email: z.string().email().optional(),
});

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.tenantId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const drivers = await prisma.driver.findMany({
      where: {
        tenantId: session.user.tenantId,
      },
      include: {
        loads: {
          where: {
            status: {
              in: ["ASSIGNED", "PICKED_UP", "IN_TRANSIT"],
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(drivers);
  } catch (error) {
    console.error("GET drivers error:", error);
    return NextResponse.json(
      { error: "Failed to fetch drivers" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.tenantId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = driverSchema.parse(body);

    const driver = await prisma.driver.create({
      data: {
        ...validatedData,
        tenantId: session.user.tenantId,
      },
    });

    return NextResponse.json(driver, { status: 201 });
  } catch (error) {
    console.error("POST driver error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid data", details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to create driver" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.tenantId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { id, ...updateData } = body;

    const driver = await prisma.driver.update({
      where: {
        id,
        tenantId: session.user.tenantId,
      },
      data: updateData,
    });

    return NextResponse.json(driver);
  } catch (error) {
    console.error("PATCH driver error:", error);
    return NextResponse.json(
      { error: "Failed to update driver" },
      { status: 500 }
    );
  }
}
"""

print("=" * 60)
print("FILE 11: app/api/drivers/route.ts")
print("=" * 60)
print(drivers_api)

