
# Generate app/pricing/page.tsx - Pricing Page

pricing_page = """import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, ArrowRight } from "lucide-react";

export default function PricingPage() {
  const plans = [
    {
      name: "Starter",
      price: "$99",
      period: "/month",
      description: "Perfect for solo dispatchers just getting started",
      features: [
        "1 dispatcher seat",
        "Up to 5 drivers",
        "Basic load tracking",
        "Driver management",
        "Email support",
        "14-day free trial",
      ],
      cta: "Start Free Trial",
      popular: false,
    },
    {
      name: "Pro",
      price: "$199",
      period: "/month",
      description: "For growing dispatch teams that need more power",
      features: [
        "3 dispatcher seats",
        "Up to 20 drivers",
        "Advanced reporting & analytics",
        "API access",
        "Priority email support",
        "Custom fields",
        "14-day free trial",
      ],
      cta: "Start Free Trial",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "$399",
      period: "/month",
      description: "For large operations with custom needs",
      features: [
        "Unlimited dispatchers",
        "Unlimited drivers",
        "Custom reporting",
        "White-label option",
        "Dedicated account manager",
        "Custom onboarding & training",
        "SLA guarantee",
        "14-day free trial",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/landing" className="text-gray-600 hover:text-gray-900">
            ← Back to home
          </Link>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900">
              Simple, Transparent Pricing
            </h1>
            <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">
              Start free for 14 days. No credit card required. Cancel anytime.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={`relative ${
                  plan.popular
                    ? "border-blue-600 shadow-xl scale-105"
                    : "border-gray-200"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-blue-600 text-white text-sm font-semibold px-4 py-1.5 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardContent className="pt-8 pb-6">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {plan.name}
                  </h3>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-5xl font-bold text-gray-900">
                      {plan.price}
                    </span>
                    <span className="ml-2 text-gray-500">{plan.period}</span>
                  </div>
                  <p className="mt-3 text-sm text-gray-500">
                    {plan.description}
                  </p>

                  <ul className="mt-8 space-y-4">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href="/register">
                    <Button
                      className="w-full mt-8"
                      size="lg"
                      variant={plan.popular ? "default" : "outline"}
                    >
                      {plan.cta}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* FAQ */}
          <div className="mt-20 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {[
                {
                  q: "Can I change plans later?",
                  a: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect on your next billing cycle.",
                },
                {
                  q: "What happens after the 14-day trial?",
                  a: "You'll be prompted to enter payment details to continue. If you choose not to, your account will be suspended but data is kept for 30 days.",
                },
                {
                  q: "Is there a setup fee?",
                  a: "No setup fees. The monthly price is all you pay.",
                },
                {
                  q: "Can I get a refund?",
                  a: "We offer pro-rated refunds if you cancel within the first 30 days of paid service.",
                },
              ].map((faq) => (
                <div key={faq.q} className="border-b border-gray-200 pb-6">
                  <h3 className="font-semibold text-gray-900">{faq.q}</h3>
                  <p className="mt-2 text-gray-500">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
"""

print("=" * 60)
print("FILE 34: app/pricing/page.tsx")
print("=" * 60)
print(pricing_page)
