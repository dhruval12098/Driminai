"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
  Menu,
  X,
  MessageSquare,
  FolderOpen,
  Mail,
  FileText,
  Users,
  Zap,
  Check,
  Plus,
  Minus,
  ArrowUp,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isYearly, setIsYearly] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const automationRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  useEffect(() => {
    // Animated navbar expansion
    const tl = gsap.timeline()

    if (navRef.current) {
      gsap.set(navRef.current, { width: "20%", x: "200%" })

      tl.to(navRef.current, {
        width: "100%",
        x: "0%",
        duration: 1.2,
        ease: "power2.out",
        delay: 1.2,
      })
    }

    // Automation section animations
    if (automationRef.current) {
      const automationItems = automationRef.current.querySelectorAll(".automation-item")

      gsap.fromTo(
        automationItems,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: automationRef.current,
            start: "top 80%",
            end: "bottom 20%",
          },
        },
      )
    }

    // Scroll to top button
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-white text-[#1C1C1E] font-[family-name:var(--font-geist-sans)]">
      {/* Navigation */}
      <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-6xl">
        <div
          ref={navRef}
          className="bg-white/90 backdrop-blur-md border border-gray-200 rounded-full shadow-lg px-8 py-3"
        >
          <div className="flex justify-between items-center w-full">
            <Link href="/" className="text-xl font-semibold text-[#1C1C1E] flex-shrink-0">
              DriminAI
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-10 flex-1 justify-center">
              <Link
                href="/"
                className="text-[#1C1C1E] hover:text-[#6C3EFF] transition-colors relative group font-medium"
              >
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#6C3EFF] to-[#C5B5FD] group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link
                href="/features"
                className="text-[#1C1C1E] hover:text-[#6C3EFF] transition-colors relative group font-medium"
              >
                Features
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#6C3EFF] to-[#C5B5FD] group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link
                href="/pricing"
                className="text-[#1C1C1E] hover:text-[#6C3EFF] transition-colors relative group font-medium"
              >
                Pricing
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#6C3EFF] to-[#C5B5FD] group-hover:w-full transition-all duration-300"></span>
              </Link>
            </div>

            {/* Desktop Join Waitlist Button */}
            <div className="hidden md:block flex-shrink-0">
              <Link href="/waitlist">
                <Button className="bg-gradient-to-r from-[#6C3EFF] to-[#C5B5FD] hover:from-[#5A2FE6] to-[#B8A5FC] text-white px-6 py-2 rounded-full transition-all duration-300 hover:scale-105 font-medium">
                  Join Waitlist
                </Button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-[#1C1C1E] hover:text-[#6C3EFF]">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

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
                    className="block text-lg text-[#1C1C1E] hover:text-[#6C3EFF] py-3 border-b border-gray-100 transition-colors"
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
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
          className="text-center"
        >
          <Badge
            variant="secondary"
            className="mb-6 bg-gradient-to-r from-[#F6F0FF] to-[#EDE4FF] text-[#6C3EFF] border-[#C5B5FD]/30"
          >
            🚀 Now in Beta
          </Badge>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight mb-6">
            Manage Clients, Projects,
            <br />
            <span className="bg-gradient-to-r from-[#6C3EFF] to-[#C5B5FD] bg-clip-text text-transparent">
              and Campaigns
            </span>{" "}
            in One Place
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Built for Indian freelancers and agencies. No noise, just results.
          </p>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/waitlist">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#6C3EFF] to-[#C5B5FD] hover:from-[#5A2FE6] hover:to-[#B8A5FC] text-white px-8 py-4 rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  Join Free Beta
                  <motion.div
                    className="ml-2"
                    animate={{ rotate: 0 }}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ArrowRight className="h-5 w-5" />
                  </motion.div>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#8B5CF6] to-[#D8B4FE] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Floating Dashboard Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.5 }}
          style={{ y }}
          className="mt-16 relative"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="bg-gradient-to-br from-[#F6F0FF] to-[#EDE4FF] rounded-3xl p-8 backdrop-blur-sm border border-[#C5B5FD]/30"
          >
            <div className="bg-white rounded-2xl shadow-2xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              </div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gradient-to-r from-[#C5B5FD]/50 to-[#C5B5FD]/30 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0 }}
                    className="h-20 bg-gradient-to-br from-[#6C3EFF]/20 to-[#6C3EFF]/10 rounded-lg"
                  ></motion.div>
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
                    className="h-20 bg-gradient-to-br from-[#C5B5FD]/30 to-[#C5B5FD]/20 rounded-lg"
                  ></motion.div>
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
                    className="h-20 bg-gradient-to-br from-[#6C3EFF]/20 to-[#6C3EFF]/10 rounded-lg"
                  ></motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-semibold mb-4">
            Everything you need to{" "}
            <span className="bg-gradient-to-r from-[#6C3EFF] to-[#C5B5FD] bg-clip-text text-transparent">
              scale your business
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Powerful features designed specifically for Indian freelancers and agencies
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: MessageSquare,
              title: "Chat",
              description: "Real-time communication with clients and team members",
              gradient: "from-blue-500 to-blue-600",
            },
            {
              icon: FolderOpen,
              title: "Projects",
              description: "Organize and track all your projects in one place",
              gradient: "from-green-500 to-green-600",
            },
            {
              icon: Mail,
              title: "Campaigns",
              description: "Automated email marketing with AI-powered content",
              gradient: "from-purple-500 to-purple-600",
            },
            {
              icon: FileText,
              title: "Templates",
              description: "Pre-built templates for proposals, contracts, and more",
              gradient: "from-orange-500 to-orange-600",
            },
            {
              icon: Users,
              title: "Team",
              description: "Collaborate with your team and track productivity",
              gradient: "from-pink-500 to-pink-600",
            },
            {
              icon: Zap,
              title: "AI Automation",
              description: "Smart workflows that save hours every week",
              gradient: "from-yellow-500 to-yellow-600",
            },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group"
            >
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-[#F6F0FF]/30">
                <CardContent className="p-6">
                  <motion.div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-4`}
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <feature.icon className="h-6 w-6 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  <motion.button
                    className="text-[#6C3EFF] font-medium hover:text-[#5A2FE6] transition-colors flex items-center group"
                    whileHover={{ x: 5 }}
                  >
                    Learn More
                    <motion.div
                      className="ml-1"
                      animate={{ x: 0 }}
                      whileHover={{ x: 3 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </motion.div>
                  </motion.button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Smart Automation Section */}
      <section ref={automationRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#F6F0FF] to-[#EDE4FF]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-semibold mb-4">
              <span className="bg-gradient-to-r from-[#6C3EFF] to-[#C5B5FD] bg-clip-text text-transparent">
                Smart Automation
              </span>{" "}
              that works for you
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Let AI handle the repetitive tasks while you focus on growing your business
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {[
                "Automatically generate project proposals from brief descriptions",
                "Smart email responses based on client communication patterns",
                "Intelligent task assignment based on team member expertise",
                "Automated invoice generation and payment reminders",
              ].map((item, index) => (
                <div key={index} className="automation-item flex items-start space-x-3">
                  <motion.div
                    className="w-6 h-6 bg-gradient-to-r from-[#6C3EFF] to-[#C5B5FD] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.5 }}
                  >
                    <Check className="h-3 w-3 text-white" />
                  </motion.div>
                  <p className="text-gray-700">{item}</p>
                </div>
              ))}
            </div>

            <div className="relative">
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                className="bg-white rounded-2xl shadow-2xl p-8"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">AI Assistant</span>
                    <motion.div
                      className="w-2 h-2 bg-green-400 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                    ></motion.div>
                  </div>
                  <div className="space-y-3">
                    <motion.div
                      className="bg-gradient-to-r from-[#6C3EFF]/10 to-[#C5B5FD]/20 rounded-lg p-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <p className="text-sm">✨ Generated 3 proposals automatically</p>
                    </motion.div>
                    <motion.div
                      className="bg-gradient-to-r from-[#C5B5FD]/20 to-[#6C3EFF]/10 rounded-lg p-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1 }}
                    >
                      <p className="text-sm">📧 Sent 12 follow-up emails</p>
                    </motion.div>
                    <motion.div
                      className="bg-gradient-to-r from-[#6C3EFF]/10 to-[#C5B5FD]/20 rounded-lg p-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.5 }}
                    >
                      <p className="text-sm">⚡ Saved 4.5 hours today</p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Preview Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-semibold mb-4">
            Simple,{" "}
            <span className="bg-gradient-to-r from-[#6C3EFF] to-[#C5B5FD] bg-clip-text text-transparent">
              transparent pricing
            </span>
          </h2>
          <p className="text-xl text-gray-600 mb-8">Start free, upgrade when you're ready to scale</p>

          {/* Pricing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-12">
            <span className={`${!isYearly ? "text-[#6C3EFF]" : "text-gray-500"}`}>Monthly</span>
            <motion.button
              onClick={() => setIsYearly(!isYearly)}
              className={`relative w-14 h-7 rounded-full transition-colors ${isYearly ? "bg-gradient-to-r from-[#6C3EFF] to-[#C5B5FD]" : "bg-gray-300"}`}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute w-5 h-5 bg-white rounded-full top-1 shadow-md"
                animate={{ x: isYearly ? 32 : 4 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </motion.button>
            <span className={`${isYearly ? "text-[#6C3EFF]" : "text-gray-500"}`}>Yearly</span>
            <AnimatePresence>
              {isYearly && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <Badge
                    variant="secondary"
                    className="bg-gradient-to-r from-[#C5B5FD]/20 to-[#6C3EFF]/20 text-[#6C3EFF]"
                  >
                    Save 20%
                  </Badge>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Plan */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
          >
            <Card className="h-full border-2 border-gray-200 hover:border-[#C5B5FD] transition-all duration-300 bg-gradient-to-br from-white to-[#F6F0FF]/20">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-semibold mb-2">Free Forever</h3>
                  <div className="text-4xl font-bold mb-2">₹0</div>
                  <p className="text-gray-600">Perfect for getting started</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {["Up to 3 projects", "Basic client portal", "Email support", "5GB storage", "Basic templates"].map(
                    (feature, index) => (
                      <motion.li
                        key={index}
                        className="flex items-center space-x-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <Check className="h-5 w-5 text-[#6C3EFF]" />
                        <span>{feature}</span>
                      </motion.li>
                    ),
                  )}
                </ul>

                <Link href="/waitlist">
                  <Button className="w-full bg-[#1C1C1E] hover:bg-[#2C2C2E] text-white rounded-full transition-all duration-300 hover:scale-105">
                    Get Started Free
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>

          {/* Pro Plan */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
          >
            <Card className="h-full border-2 border-[#6C3EFF] relative overflow-hidden bg-gradient-to-br from-white to-[#F6F0FF]/30">
              <div className="absolute top-0 right-0 bg-gradient-to-r from-[#6C3EFF] to-[#C5B5FD] text-white px-4 py-1 text-sm">
                Coming Soon
              </div>
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-semibold mb-2">Pro Plan</h3>
                  <motion.div
                    className="text-4xl font-bold mb-2"
                    key={isYearly ? "yearly" : "monthly"}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    ₹{isYearly ? "1,999" : "2,499"}
                    <span className="text-lg font-normal text-gray-600">/{isYearly ? "year" : "month"}</span>
                  </motion.div>
                  <p className="text-gray-600">For growing agencies</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {[
                    "Unlimited projects",
                    "Advanced AI automation",
                    "Priority support",
                    "100GB storage",
                    "Custom templates",
                    "Team collaboration",
                    "Advanced analytics",
                  ].map((feature, index) => (
                    <motion.li
                      key={index}
                      className="flex items-center space-x-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Check className="h-5 w-5 text-[#6C3EFF]" />
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                <Button
                  className="w-full bg-gradient-to-r from-[#6C3EFF] to-[#C5B5FD] hover:from-[#5A2FE6] hover:to-[#B8A5FC] text-white rounded-full transition-all duration-300"
                  disabled
                >
                  Notify Me
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#F6F0FF] to-[#EDE4FF]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-semibold mb-4">
              Frequently Asked{" "}
              <span className="bg-gradient-to-r from-[#6C3EFF] to-[#C5B5FD] bg-clip-text text-transparent">
                Questions
              </span>
            </h2>
            <p className="text-xl text-gray-600">Everything you need to know about DriminAI</p>
          </motion.div>

          <div className="space-y-4">
            {[
              {
                question: "Is DriminAI really free to start?",
                answer:
                  "Yes! Our Free Forever plan includes up to 3 projects, basic client portal, and essential features to get you started. No credit card required.",
              },
              {
                question: "How does the AI automation work?",
                answer:
                  "Our AI learns from your work patterns and automatically handles repetitive tasks like generating proposals, sending follow-ups, and organizing projects based on your preferences.",
              },
              {
                question: "Can I invite my team members?",
                answer:
                  "Team collaboration features will be available in our Pro plan (coming soon). The free plan is designed for individual freelancers and small agencies.",
              },
              {
                question: "Is my data secure?",
                answer:
                  "Absolutely. We use enterprise-grade security with end-to-end encryption, regular backups, and comply with international data protection standards.",
              },
              {
                question: "Do you offer customer support?",
                answer:
                  "Yes! Free users get email support, while Pro users (coming soon) will have priority support with faster response times.",
              },
            ].map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} index={index} />
            ))}
          </div>
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
                  <a href="#faq" className="text-gray-400 hover:text-white transition-colors">
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

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 bg-gradient-to-r from-[#6C3EFF] to-[#C5B5FD] text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}

function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
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
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
          {isOpen ? <Minus className="h-5 w-5 text-[#6C3EFF]" /> : <Plus className="h-5 w-5 text-[#6C3EFF]" />}
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
