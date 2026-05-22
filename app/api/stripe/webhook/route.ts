
# Generate app/api/stripe/webhook/route.ts - Stripe Webhook

webhook_api = """import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  try {
    const payload = await request.text();
    const signature = request.headers.get("stripe-signature")!;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        payload,
        signature,
        webhookSecret
      );
    } catch (err: any) {
      console.error(`Webhook signature verification failed: ${err.message}`);
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 400 }
      );
    }

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const customerId = session.customer as string;
        const subscriptionId = session.subscription as string;

        const tenant = await prisma.tenant.findFirst({
          where: { stripeCustomerId: customerId },
        });

        if (tenant) {
          await prisma.tenant.update({
            where: { id: tenant.id },
            data: {
              stripeSubscriptionId: subscriptionId,
              status: "ACTIVE",
            },
          });
        }
        break;
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice;
        const subscriptionId = invoice.subscription as string;

        await prisma.tenant.updateMany({
          where: { stripeSubscriptionId: subscriptionId },
          data: { status: "ACTIVE" },
        });
        break;
      }

      case "customer.subscription.deleted":
      case "invoice.payment_failed": {
        const subscription = event.data.object as Stripe.Subscription;

        await prisma.tenant.updateMany({
          where: { stripeSubscriptionId: subscription.id },
          data: { status: "SUSPENDED" },
        });
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
"""

print("=" * 60)
print("FILE 15: app/api/stripe/webhook/route.ts")
print("=" * 60)
print(webhook_api)

