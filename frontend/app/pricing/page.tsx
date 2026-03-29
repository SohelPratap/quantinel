"use client"

import Link from "next/link"
import { Activity, Check, ArrowRight, Zap, Shield, Cpu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const plans = [
  {
    name: "Free",
    description: "For hobbyists and beginners exploring algo trading",
    price: "$0",
    period: "forever",
    features: [
      "5 backtests per month",
      "Basic AI strategy generation",
      "1 trading pair",
      "7-day historical data",
      "Community support",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    description: "For serious traders who want unlimited testing",
    price: "$29",
    period: "/month",
    features: [
      "Unlimited backtests",
      "Advanced AI with GPT-4",
      "All trading pairs",
      "1-year historical data",
      "Multiple timeframes",
      "Custom indicators",
      "Priority support",
      "Export reports",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    description: "For funds and professional trading teams",
    price: "Custom",
    period: "",
    features: [
      "Everything in Pro",
      "5-year historical data",
      "API access",
      "Team collaboration",
      "Custom integrations",
      "Dedicated account manager",
      "SLA guarantee",
      "On-premise deployment",
    ],
    cta: "Contact Sales",
    popular: false,
  },
]

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Run backtests on millions of candles in seconds with our optimized engine",
  },
  {
    icon: Cpu,
    title: "AI-Powered",
    description: "Generate trading strategies from natural language using GPT-4 Turbo",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-grade encryption and SOC 2 Type II compliance for your data",
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="h-14 border-b border-border bg-card/80 backdrop-filter backdrop-blur-sm flex items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
            <Activity className="w-5 h-5 text-primary" />
          </div>
          <span className="text-lg font-semibold text-foreground">Quantinel</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Sign in
          </Link>
          <Button asChild size="sm" className="bg-primary hover:bg-primary/90">
            <Link href="/signup">Get Started</Link>
          </Button>
        </div>
      </header>

      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
      </div>

      <main className="relative z-10 py-16 px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">
            Simple, transparent pricing
          </h1>
          <p className="text-lg text-muted-foreground text-balance">
            Start for free. Upgrade when you need more power. No hidden fees.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-24">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "glass-panel rounded-2xl p-6 relative",
                plan.popular && "border-primary/50 neon-blue"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                  Most Popular
                </div>
              )}

              <h3 className="text-lg font-semibold text-foreground">{plan.name}</h3>
              <p className="text-sm text-muted-foreground mt-1 h-10">
                {plan.description}
              </p>

              <div className="mt-4 mb-6">
                <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                <span className="text-muted-foreground">{plan.period}</span>
              </div>

              <Button
                className={cn(
                  "w-full mb-6",
                  plan.popular
                    ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                    : "bg-secondary hover:bg-secondary/80 text-foreground"
                )}
                asChild
              >
                <Link href={plan.name === "Enterprise" ? "/contact" : "/signup"}>
                  {plan.cta}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>

              <ul className="space-y-3">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-[#10B981] mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground text-center mb-12">
            Why choose Quantinel?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <div key={feature.title} className="text-center">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-24">
          <p className="text-muted-foreground mb-4">
            Questions? We&apos;re here to help.
          </p>
          <Button variant="outline" className="bg-secondary/50 border-border">
            Contact Support
          </Button>
        </div>
      </main>
    </div>
  )
}
