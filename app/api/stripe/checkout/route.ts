
# Generate app/api/stripe/checkout/route.ts - Stripe Checkout API

checkout_api = """import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { stripe, getStripeSession, createStripeCustomer } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { priceId } = body;

    if (!priceId) {
      return NextResponse.json(
        { error: "Price ID is required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { tenant: true },
    });

    if (!user || !user.tenantId) {
      return NextResponse.json(
        { error: "No tenant found" },
        { status: 400 }
      );
    }

    let customerId = user.tenant?.stripeCustomerId;

    if (!customerId) {
      const customer = await createStripeCustomer(
        user.email,
        user.name || user.email
      );
      customerId = customer.id;

      await prisma.tenant.update({
        where: { id: user.tenantId },
        data: { stripeCustomerId: customerId },
      });
    }

    const stripeSession = await getStripeSession({
      priceId,
      domainUrl: process.env.NEXT_PUBLIC_APP_URL!,
      customerId,
    });

    return NextResponse.json({ sessionId: stripeSession.id });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
"""

print("=" * 60)
print("FILE 14: app/api/stripe/checkout/route.ts")
print("=" * 60)
print(checkout_api)

