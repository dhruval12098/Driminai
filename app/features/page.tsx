"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
  ArrowLeft,
  MessageSquare,
  FolderOpen,
  Mail,
  FileText,
  Users,
  Zap,
  Check,
  ArrowRight,
  X,
  Menu,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function FeaturesPage() {
  const featuresRef = useRef<HTMLDivElement>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    if (featuresRef.current) {
      const sections = featuresRef.current.querySelectorAll(".feature-section")

      sections.forEach((section, index) => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 100 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          },
        )

        // Animate icons
        const icon = section.querySelector(".feature-icon")
        if (icon) {
          gsap.fromTo(
            icon,
            { scale: 0, rotation: -180 },
            {
              scale: 1,
              rotation: 0,
              duration: 0.8,
              delay: 0.3,
              scrollTrigger: {
                trigger: section,
                start: "top 80%",
              },
            },
          )
        }
      })
    }
  }, [])

  const features = [
    {
      icon: MessageSquare,
      title: "Chat",
      description: "Real-time Communication Hub",
      details:
        "Connect with clients and team members instantly. Our smart chat system organizes conversations by project, sends automated reminders, and integrates with your workflow to keep everyone on the same page.",
      benefits: [
        "Project-based chat organization",
        "Automated follow-up reminders",
        "File sharing and collaboration",
        "Mobile and desktop sync",
        "Smart notification management",
      ],
      gradient: "from-blue-500 to-blue-600",
      bgGradient: "from-blue-50 to-blue-100",
    },
    {
      icon: FolderOpen,
      title: "Projects",
      description: "Complete Project Management",
      details:
        "Organize, track, and deliver projects efficiently. From initial brief to final delivery, manage timelines, resources, and deliverables with AI-powered insights and automated progress tracking.",
      benefits: [
        "Visual project timelines",
        "Resource allocation tracking",
        "Automated progress reports",
        "Client milestone approvals",
        "Budget and time tracking",
      ],
      gradient: "from-green-500 to-green-600",
      bgGradient: "from-green-50 to-green-100",
    },
    {
      icon: Mail,
      title: "Email Campaigns",
      description: "AI-Powered Marketing Automation",
      details:
        "Create, send, and track email campaigns that convert. Our AI analyzes your audience and suggests optimal send times, subject lines, and content to maximize engagement and results.",
      benefits: [
        "AI-generated email content",
        "Smart audience segmentation",
        "Automated drip campaigns",
        "Performance analytics",
        "A/B testing capabilities",
      ],
      gradient: "from-purple-500 to-purple-600",
      bgGradient: "from-purple-50 to-purple-100",
    },
    {
      icon: Users,
      title: "Client Access",
      description: "Secure Client Portals",
      details:
        "Give clients a dedicated space to view project progress, approve deliverables, and communicate with your team. Branded portals that enhance your professional image and streamline client relationships.",
      benefits: [
        "Branded client portals",
        "Real-time project visibility",
        "Secure file sharing",
        "Approval workflows",
        "Client feedback system",
      ],
      gradient: "from-indigo-500 to-indigo-600",
      bgGradient: "from-indigo-50 to-indigo-100",
    },
    {
      icon: FileText,
      title: "Document Builder",
      description: "Professional Document Creation",
      details:
        "Generate proposals, contracts, invoices, and reports instantly. Our AI-powered templates adapt to your business needs and client requirements, ensuring professional documents every time.",
      benefits: [
        "Smart template library",
        "Auto-populated client data",
        "Digital signature integration",
        "Version control",
        "Custom branding options",
      ],
      gradient: "from-orange-500 to-orange-600",
      bgGradient: "from-orange-50 to-orange-100",
    },
    {
      icon: Zap,
      title: "Team Task Tracking",
      description: "Intelligent Team Management",
      details:
        "Assign tasks, track progress, and optimize team performance with AI insights. Understand workload distribution, identify bottlenecks, and improve productivity across your entire team.",
      benefits: [
        "Smart task assignment",
        "Workload balancing",
        "Performance analytics",
        "Deadline management",
        "Team collaboration tools",
      ],
      gradient: "from-yellow-500 to-yellow-600",
      bgGradient: "from-yellow-50 to-yellow-100",
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
              <Link href="/features" className="text-[#6C3EFF] font-medium">
                Features
              </Link>
              <Link href="/pricing" className="text-[#1C1C1E] hover:text-[#6C3EFF] transition-colors">
                Pricing
              </Link>
              <Link href="/waitlist">
                <Button className="bg-gradient-to-r from-[#6C3EFF] to-[#C5B5FD] text-white px-6 py-2 rounded-full">
                  Join Waitlist
                </Button>
              </Link>
            </div>

            {/* Mobile Navigation - Hamburger Menu */}
            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(true)}>
                <Menu size={24} className="text-[#1C1C1E]" />
              </Button>
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
                  className="block text-lg text-[#6C3EFF] font-medium py-3 border-b border-gray-100"
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
            Powerful Features for{" "}
            <span className="bg-gradient-to-r from-[#6C3EFF] to-[#C5B5FD] bg-clip-text text-transparent">
              Modern Agencies
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Everything you need to manage clients, projects, and campaigns efficiently. Built specifically for Indian
            freelancers and agencies.
          </p>
        </motion.div>
      </section>

      {/* Features Sections */}
      <div ref={featuresRef} className="space-y-32 pb-20">
        {features.map((feature, index) => (
          <section
            key={feature.title}
            className={`feature-section px-4 sm:px-6 lg:px-8 ${
              index % 2 === 0 ? "" : `bg-gradient-to-br ${feature.bgGradient}`
            }`}
          >
            <div className="max-w-7xl mx-auto py-20">
              <div
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 0 ? "" : "lg:grid-flow-col-dense"
                }`}
              >
                {/* Content */}
                <div className={index % 2 === 0 ? "" : "lg:col-start-2"}>
                  <div className="flex items-center mb-6">
                    <motion.div
                      className={`feature-icon w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mr-4`}
                      whileHover={{
                        scale: 1.1,
                        rotate: [0, -5, 5, 0],
                        transition: { duration: 0.3 },
                      }}
                    >
                      <feature.icon className="h-8 w-8 text-white" />
                    </motion.div>
                    <div>
                      <h2 className="text-3xl sm:text-4xl font-semibold">{feature.title}</h2>
                      <p className="text-lg text-gray-600">{feature.description}</p>
                    </div>
                  </div>

                  <p className="text-gray-700 text-lg mb-8 leading-relaxed">{feature.details}</p>

                  <div className="space-y-4 mb-8">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <motion.div
                        key={benefitIndex}
                        className="flex items-center space-x-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: benefitIndex * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <div
                          className={`w-6 h-6 bg-gradient-to-r ${feature.gradient} rounded-full flex items-center justify-center flex-shrink-0`}
                        >
                          <Check className="h-3 w-3 text-white" />
                        </div>
                        <span className="text-gray-700">{benefit}</span>
                      </motion.div>
                    ))}
                  </div>

                  <motion.div whileHover={{ x: 5 }}>
                    <Link href="/waitlist">
                      <Button
                        className={`bg-gradient-to-r ${feature.gradient} hover:opacity-90 text-white px-6 py-3 rounded-full transition-all duration-300 group`}
                      >
                        Get Started
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </motion.div>
                </div>

                {/* Visual */}
                <div className={index % 2 === 0 ? "" : "lg:col-start-1"}>
                  <motion.div className="relative" whileHover={{ y: -10 }} transition={{ duration: 0.3 }}>
                    <Card className="shadow-2xl border-0 overflow-hidden">
                      <CardContent className="p-8">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">{feature.title} Dashboard</span>
                            <motion.div
                              className="w-2 h-2 bg-green-400 rounded-full"
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                            />
                          </div>
                          <div className="space-y-3">
                            <div className={`h-4 bg-gradient-to-r ${feature.gradient} opacity-20 rounded w-3/4`}></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                            <div className={`h-4 bg-gradient-to-r ${feature.gradient} opacity-30 rounded w-2/3`}></div>
                            <div className="grid grid-cols-2 gap-4 mt-6">
                              <motion.div
                                className={`h-16 bg-gradient-to-br ${feature.gradient} opacity-10 rounded-lg`}
                                animate={{ opacity: [0.1, 0.2, 0.1] }}
                                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0 }}
                              />
                              <motion.div
                                className={`h-16 bg-gradient-to-br ${feature.gradient} opacity-15 rounded-lg`}
                                animate={{ opacity: [0.15, 0.25, 0.15] }}
                                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
                              />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

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
              Ready to transform your{" "}
              <span className="bg-gradient-to-r from-[#6C3EFF] to-[#C5B5FD] bg-clip-text text-transparent">
                workflow?
              </span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of Indian freelancers and agencies who are already using DriminAI to streamline their
              business.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/waitlist">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#6C3EFF] to-[#C5B5FD] hover:from-[#5A2FE6] hover:to-[#B8A5FC] text-white px-8 py-4 rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Join Free Beta
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
