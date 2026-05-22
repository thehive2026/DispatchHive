
# Generate app/api/loads/route.ts - Load CRUD API

loads_api = """import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const loadSchema = z.object({
  loadNumber: z.string().min(1),
  origin: z.string().min(1),
  destination: z.string().min(1),
  pickupDate: z.string().datetime(),
  deliveryDate: z.string().datetime().optional(),
  rate: z.number().optional(),
  driverId: z.string().optional(),
  notes: z.string().optional(),
});

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.tenantId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    const where = {
      tenantId: session.user.tenantId,
      ...(status && { status }),
    };

    const loads = await prisma.load.findMany({
      where,
      include: {
        driver: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(loads);
  } catch (error) {
    console.error("GET loads error:", error);
    return NextResponse.json(
      { error: "Failed to fetch loads" },
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
    const validatedData = loadSchema.parse(body);

    const load = await prisma.load.create({
      data: {
        ...validatedData,
        tenantId: session.user.tenantId,
        pickupDate: new Date(validatedData.pickupDate),
        deliveryDate: validatedData.deliveryDate
          ? new Date(validatedData.deliveryDate)
          : null,
      },
      include: {
        driver: true,
      },
    });

    return NextResponse.json(load, { status: 201 });
  } catch (error) {
    console.error("POST load error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid data", details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to create load" },
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

    const load = await prisma.load.update({
      where: {
        id,
        tenantId: session.user.tenantId,
      },
      data: {
        ...updateData,
        pickupDate: updateData.pickupDate
          ? new Date(updateData.pickupDate)
          : undefined,
        deliveryDate: updateData.deliveryDate
          ? new Date(updateData.deliveryDate)
          : null,
      },
      include: {
        driver: true,
      },
    });

    return NextResponse.json(load);
  } catch (error) {
    console.error("PATCH load error:", error);
    return NextResponse.json(
      { error: "Failed to update load" },
      { status: 500 }
    );
  }
}
"""

print("=" * 60)
print("FILE 10: app/api/loads/route.ts")
print("=" * 60)
print(loads_api)

