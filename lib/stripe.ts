
# Generate lib/stripe.ts - Stripe configuration

stripe_config = """import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export const getStripeSession = async ({
  priceId,
  domainUrl,
  customerId,
}: {
  priceId: string;
  domainUrl: string;
  customerId: string;
}) => {
  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: "subscription",
    billing_address_collection: "auto",
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: `${domainUrl}/dashboard?success=true`,
    cancel_url: `${domainUrl}/pricing?canceled=true`,
    subscription_data: {
      trial_period_days: 14,
    },
  });

  return session;
};

export const createStripeCustomer = async (email: string, name: string) => {
  const customer = await stripe.customers.create({
    email,
    name,
  });
  return customer;
};

export const getSubscription = async (subscriptionId: string) => {
  return stripe.subscriptions.retrieve(subscriptionId);
};
"""

print("=" * 60)
print("FILE 7: lib/stripe.ts")
print("=" * 60)
print(stripe_config)

