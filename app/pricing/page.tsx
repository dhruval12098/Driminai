"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Check, ArrowRight, Zap, Users, Crown, X, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const plans = [
    {
      name: "Free Forever",
      description: "Perfect for getting started",
      price: { monthly: 0, yearly: 0 },
      icon: Zap,
      features: [
        "Up to 2 projects",
        "Basic client portal",
        "Email support",
        "2GB storage",
        "Basic templates",
        "Standard chat support",
        "25 Emails Per Day",
        "Document Creator Free",
        "No Team Adding",
      ],
      cta: "Get Started Free",
      popular: false,
      available: true,
    },
    {
      name: "Plus Plan",
      description: "For growing agencies",
      price: { monthly: 499, yearly: 4999 },
      icon: Users,
      features: [
        "5 projects/ Month",
        "Advanced AI automation For E-mail",
        "Priority support",
        "10GB storage",
        "Custom templates",
        "Team collaboration",
        "Advanced analytics",
        "50 Emails Per Day",
        
        
      ],
      cta: "Notify Me",
      popular: true,
      available: false,
    },
    {
      name: "Enterprise",
      description: "For large organizations",
      price: { monthly: "Custom", yearly: "Custom" },
      icon: Crown,
      features: [
        "Everything in Pro",
        "Unlimited team members",
        "Custom integrations",
        "Dedicated account manager",
        "SLA guarantee",
        "Advanced security",
        "Custom training",
        "24/7 phone support",
      ],
      cta: "Contact Sales",
      popular: false,
      available: true,
    },
  ]

  return (
    <div className="min-h-screen bg-white text-[#1C1C1E] font-[family-name:var(--font-geist-sans)]">
      {/* Navigation */}
      <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-4xl">
        <div className="bg-white/90 backdrop-blur-md border border-gray-200 rounded-full shadow-lg px-6 py-3">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-xl font-semibold text-[#1C1C1E]">
              DriminAI
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-[#1C1C1E] hover:text-[#6C3EFF] transition-colors">
                Home
              </Link>
              <Link href="/features" className="text-[#1C1C1E] hover:text-[#6C3EFF] transition-colors">
                Features
              </Link>
              <Link href="/pricing" className="text-[#6C3EFF] font-medium">
                Pricing
              </Link>
              <Link href="/waitlist">
                <Button className="bg-gradient-to-r from-[#6C3EFF] to-[#C5B5FD] text-white px-6 py-2 rounded-full">
                  Join Waitlist
                </Button>
              </Link>
            </div>

            {/* Mobile Navigation Toggle */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(true)} className="text-[#1C1C1E] hover:text-[#6C3EFF]">
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation - Slide from right */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Mobile Menu */}
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white backdrop-blur-md shadow-2xl z-50 p-6 border-l border-gray-200"
            >
              <div className="flex justify-between items-center mb-8">
                <span className="text-xl font-semibold text-[#1C1C1E]">Menu</span>
                <button onClick={() => setIsMenuOpen(false)} className="text-[#1C1C1E] hover:text-[#6C3EFF]">
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-6">
                <Link
                  href="/"
                  className="block text-lg text-[#1C1C1E] hover:text-[#6C3EFF] py-3 border-b border-gray-100 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/features"
                  className="block text-lg text-[#1C1C1E] hover:text-[#6C3EFF] py-3 border-b border-gray-100 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Features
                </Link>
                <Link
                  href="/pricing"
                  className="block text-lg text-[#6C3EFF] font-medium py-3 border-b border-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Pricing
                </Link>

                {/* Join Waitlist Button in Mobile Menu */}
                <div className="pt-4">
                  <Link href="/waitlist" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full bg-gradient-to-r from-[#6C3EFF] to-[#C5B5FD] hover:from-[#5A2FE6] hover:to-[#B8A5FC] text-white rounded-full py-3 text-lg font-medium">
                      Join Waitlist
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Header */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link href="/">
            <Button variant="ghost" className="text-[#6C3EFF] hover:text-[#5A2FE6] p-0">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight mb-6">
            Simple,{" "}
            <span className="bg-gradient-to-r from-[#6C3EFF] to-[#C5B5FD] bg-clip-text text-transparent">
              transparent pricing
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12">
            Start free, upgrade when you're ready to scale. No hidden fees, no surprises.
          </p>

          {/* Pricing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-16">
            <span className={`text-lg ${!isYearly ? "text-[#6C3EFF] font-medium" : "text-gray-500"}`}>Monthly</span>
            <motion.button
              onClick={() => setIsYearly(!isYearly)}
              className={`relative w-16 h-8 rounded-full transition-colors ${
                isYearly ? "bg-gradient-to-r from-[#6C3EFF] to-[#C5B5FD]" : "bg-gray-300"
              }`}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute w-6 h-6 bg-white rounded-full top-1 shadow-md"
                animate={{ x: isYearly ? 36 : 4 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </motion.button>
            <span className={`text-lg ${isYearly ? "text-[#6C3EFF] font-medium" : "text-gray-500"}`}>Yearly</span>
            <AnimatePresence>
              {isYearly && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <Badge
                    variant="secondary"
                    className="bg-gradient-to-r from-[#C5B5FD]/20 to-[#6C3EFF]/20 text-[#6C3EFF] border-[#C5B5FD]/30"
                  >
                    Save 20%
                  </Badge>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <Badge className="bg-gradient-to-r from-[#6C3EFF] to-[#C5B5FD] text-white px-4 py-1 text-sm font-medium">
                    Most Popular
                  </Badge>
                </div>
              )}

              <Card
                className={`h-full transition-all duration-300 ${
                  plan.popular
                    ? "border-2 border-[#6C3EFF] shadow-2xl bg-gradient-to-br from-white to-[#F6F0FF]/30"
                    : "border-2 border-gray-200 hover:border-[#C5B5FD] shadow-lg hover:shadow-xl bg-gradient-to-br from-white to-gray-50/30"
                }`}
              >
                <CardContent className="p-8">
                  {/* Plan Header */}
                  <div className="text-center mb-8">
                    <motion.div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${
                        plan.popular ? "from-[#6C3EFF] to-[#C5B5FD]" : "from-gray-400 to-gray-500"
                      } flex items-center justify-center mx-auto mb-4`}
                      whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <plan.icon className="h-8 w-8 text-white" />
                    </motion.div>

                    <h3 className="text-2xl font-semibold mb-2">{plan.name}</h3>
                    <p className="text-gray-600 mb-4">{plan.description}</p>

                    <div className="mb-4">
                      {typeof plan.price.monthly === "number" ? (
                        <motion.div
                          key={isYearly ? "yearly" : "monthly"}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="text-4xl font-bold">₹{isYearly ? plan.price.yearly : plan.price.monthly}</div>
                          {plan.price.monthly > 0 && (
                            <div className="text-gray-500">/{isYearly ? "year" : "month"}</div>
                          )}
                        </motion.div>
                      ) : (
                        <div className="text-4xl font-bold">{plan.price.monthly}</div>
                      )}
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <motion.li
                        key={featureIndex}
                        className="flex items-start space-x-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + featureIndex * 0.05 }}
                      >
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                            plan.popular ? "bg-gradient-to-r from-[#6C3EFF] to-[#C5B5FD]" : "bg-gray-400"
                          }`}
                        >
                          <Check className="h-3 w-3 text-white" />
                        </div>
                        <span className="text-gray-700">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link href={plan.available ? (plan.name === "Enterprise" ? "/contact" : "/waitlist") : "/waitlist"}>
                      <Button
                        className={`w-full py-3 rounded-full font-medium transition-all duration-300 ${
                          plan.popular
                            ? "bg-gradient-to-r from-[#6C3EFF] to-[#C5B5FD] hover:from-[#5A2FE6] hover:to-[#B8A5FC] text-white shadow-lg hover:shadow-xl"
                            : plan.available
                              ? "bg-[#1C1C1E] hover:bg-[#2C2C2E] text-white"
                              : "bg-gray-200 hover:bg-gray-300 text-gray-600"
                        }`}
                        disabled={!plan.available && plan.name !== "Enterprise"}
                      >
                        {plan.cta}
                        {plan.available && <ArrowRight className="ml-2 h-4 w-4" />}
                      </Button>
                    </Link>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#F6F0FF] to-[#EDE4FF]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-semibold mb-4">
              Compare all{" "}
              <span className="bg-gradient-to-r from-[#6C3EFF] to-[#C5B5FD] bg-clip-text text-transparent">
                features
              </span>
            </h2>
            <p className="text-xl text-gray-600">See what's included in each plan</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-white/50"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-[#F6F0FF] to-[#EDE4FF]">
                  <tr>
                    <th className="text-left p-6 font-semibold">Features</th>
                    <th className="text-center p-6 font-semibold">Free</th>
                    <th className="text-center p-6 font-semibold">Pro</th>
                    <th className="text-center p-6 font-semibold">Enterprise</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { feature: "Projects", free: "3", pro: "Unlimited", enterprise: "Unlimited" },
                    { feature: "Storage", free: "5GB", pro: "100GB", enterprise: "Unlimited" },
                    { feature: "Team Members", free: "1", pro: "10", enterprise: "Unlimited" },
                    { feature: "AI Automation", free: "Basic", pro: "Advanced", enterprise: "Custom" },
                    { feature: "Client Portals", free: "✓", pro: "✓", enterprise: "White-label" },
                    { feature: "Email Campaigns", free: "✗", pro: "✓", enterprise: "✓" },
                    { feature: "API Access", free: "✗", pro: "✓", enterprise: "✓" },
                    { feature: "Priority Support", free: "✗", pro: "✓", enterprise: "24/7 Phone" },
                    { feature: "Custom Integrations", free: "✗", pro: "✗", enterprise: "✓" },
                    { feature: "SLA Guarantee", free: "✗", pro: "✗", enterprise: "✓" },
                  ].map((row, index) => (
                    <motion.tr
                      key={row.feature}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      viewport={{ once: true }}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="p-6 font-medium">{row.feature}</td>
                      <td className="p-6 text-center">{row.free}</td>
                      <td className="p-6 text-center">{row.pro}</td>
                      <td className="p-6 text-center">{row.enterprise}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-semibold mb-4">
            Pricing{" "}
            <span className="bg-gradient-to-r from-[#6C3EFF] to-[#C5B5FD] bg-clip-text text-transparent">
              Questions?
            </span>
          </h2>
          <p className="text-xl text-gray-600">Everything you need to know about our pricing</p>
        </motion.div>

        <div className="space-y-4">
          {[
            {
              question: "Can I change plans anytime?",
              answer:
                "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately and we'll prorate any charges.",
            },
            {
              question: "What happens if I exceed my plan limits?",
              answer:
                "We'll notify you when you're approaching your limits. You can upgrade your plan or we'll help you optimize your usage.",
            },
            {
              question: "Do you offer refunds?",
              answer: "Yes, we offer a 30-day money-back guarantee for all paid plans. No questions asked.",
            },
            {
              question: "Is there a setup fee?",
              answer:
                "No setup fees, ever. You only pay for your chosen plan, and you can start using DriminAI immediately.",
            },
            {
              question: "Can I get a custom plan?",
              answer:
                "Contact our sales team to discuss custom plans tailored to your specific needs and requirements.",
            },
          ].map((faq, index) => (
            <PricingFAQItem key={index} question={faq.question} answer={faq.answer} index={index} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#F6F0FF] to-[#EDE4FF]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-semibold mb-6">
              Ready to get{" "}
              <span className="bg-gradient-to-r from-[#6C3EFF] to-[#C5B5FD] bg-clip-text text-transparent">
                started?
              </span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of Indian freelancers and agencies who trust DriminAI to manage their business.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/waitlist">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#6C3EFF] to-[#C5B5FD] hover:from-[#5A2FE6] hover:to-[#B8A5FC] text-white px-8 py-4 rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1C1C1E] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-semibold mb-4">DriminAI</h3>
              <p className="text-gray-400 mb-6 max-w-md">
                The smart AI-powered portal for Indian freelancers and agencies. Manage everything in one place.
              </p>
              <div className="flex space-x-4">
                <motion.a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                  whileHover={{ scale: 1.1 }}
                >
                  Instagram
                </motion.a>
                <motion.a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                  whileHover={{ scale: 1.1 }}
                >
                  LinkedIn
                </motion.a>
                <motion.a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                  whileHover={{ scale: 1.1 }}
                >
                  Twitter
                </motion.a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/features" className="text-gray-400 hover:text-white transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-gray-400 hover:text-white transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Roadmap
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 DriminAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function PricingFAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-white/50"
    >
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-white/50 transition-colors rounded-lg"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <span className="font-medium">{question}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }} className="text-[#6C3EFF]">
          <ArrowRight className="h-5 w-5" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-4">
              <p className="text-gray-600">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
