
# Generate app/landing/page.tsx - Marketing Landing Page

landing_page = """import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Truck,
  Users,
  BarChart3,
  Shield,
  Zap,
  Clock,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

export default function LandingPage() {
  const features = [
    {
      icon: Truck,
      title: "Load Management",
      description:
        "Create, assign, and track loads from pickup to delivery. Never lose track of a shipment again.",
    },
    {
      icon: Users,
      title: "Driver Fleet",
      description:
        "Manage your entire driver roster. Know who's available, who's on the road, and who's off duty.",
    },
    {
      icon: BarChart3,
      title: "Real-time Dashboard",
      description:
        "See everything at a glance. Active loads, revenue, overdue deliveries, and driver performance.",
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description:
        "Bank-level security with role-based access. Your data is encrypted and backed up daily.",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description:
        "Built for speed. No more waiting for pages to load. Dispatch in seconds, not minutes.",
    },
    {
      icon: Clock,
      title: "24/7 Access",
      description:
        "Access your dispatch board from anywhere, on any device. Desktop, tablet, or mobile.",
    },
  ];

  const plans = [
    {
      name: "Starter",
      price: "$99",
      description: "Perfect for solo dispatchers",
      features: [
        "1 dispatcher",
        "Up to 5 drivers",
        "Basic load tracking",
        "Email support",
        "14-day free trial",
      ],
      cta: "Start Free Trial",
      popular: false,
    },
    {
      name: "Pro",
      price: "$199",
      description: "For growing dispatch teams",
      features: [
        "3 dispatchers",
        "Up to 20 drivers",
        "Advanced reporting",
        "API access",
        "Priority support",
        "14-day free trial",
      ],
      cta: "Start Free Trial",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "$399",
      description: "For large operations",
      features: [
        "Unlimited dispatchers",
        "Unlimited drivers",
        "Custom reporting",
        "White-label option",
        "Dedicated support",
        "Custom onboarding",
        "14-day free trial",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Truck className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">
                DispatchHive
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                Sign In
              </Link>
              <Link href="/register">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Dispatch Management
              <span className="text-blue-600"> Made Simple</span>
            </h1>
            <p className="mt-6 text-xl text-gray-500 leading-relaxed">
              Stop juggling spreadsheets and phone calls. DispatchHive gives
              small carriers and freight brokers the tools to manage loads,
              track drivers, and grow revenue—all in one place.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" className="gap-2">
                  Start Free Trial
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline">
                  Sign In
                </Button>
              </Link>
            </div>
            <p className="mt-4 text-sm text-gray-400">
              No credit card required. 14-day free trial.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">
              Everything You Need to Dispatch
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Built specifically for small carriers and dispatch services
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <Card key={feature.title} className="border-0 shadow-sm">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-gray-500">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">
              Simple, Transparent Pricing
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Start free, scale as you grow. No hidden fees.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={`relative ${
                  plan.popular
                    ? "border-blue-600 shadow-lg"
                    : "border-gray-200"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {plan.name}
                  </h3>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-bold text-gray-900">
                      {plan.price}
                    </span>
                    <span className="ml-2 text-gray-500">/month</span>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    {plan.description}
                  </p>
                  <ul className="mt-6 space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-gray-600">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/register">
                    <Button
                      className="w-full mt-6"
                      variant={plan.popular ? "default" : "outline"}
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white">
            Ready to Streamline Your Dispatch?
          </h2>
          <p className="mt-4 text-xl text-blue-100">
            Join hundreds of carriers who've switched from spreadsheets to
            DispatchHive.
          </p>
          <div className="mt-10">
            <Link href="/register">
              <Button size="lg" variant="secondary" className="gap-2">
                Start Your Free Trial
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
          <p className="mt-4 text-sm text-blue-200">
            No credit card required. Cancel anytime.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                <Truck className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-gray-900">
                DispatchHive
              </span>
            </div>
            <p className="text-sm text-gray-500">
              © 2026 DispatchHive. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
"""

print("=" * 60)
print("FILE 31: app/landing/page.tsx")
print("=" * 60)
print(landing_page)
