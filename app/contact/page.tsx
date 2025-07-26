"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Mail, Phone, MapPin, Send, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setIsSubmitted(true)
      } else {
        alert(data.error || "Failed to send message")
      }
    } catch (error) {
      alert("Failed to send message")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F6F0FF] via-white to-[#EDE4FF] text-[#1C1C1E] font-[family-name:var(--font-geist-sans)]">
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
              <Link href="/pricing" className="text-[#1C1C1E] hover:text-[#6C3EFF] transition-colors">
                Pricing
              </Link>
              <Link href="/waitlist">
                <Button className="bg-gradient-to-r from-[#6C3EFF] to-[#C5B5FD] text-white px-6 py-2 rounded-full">
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

      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Back Button */}
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-4xl sm:text-5xl font-semibold leading-tight mb-6">
              Get in{" "}
              <span className="bg-gradient-to-r from-[#6C3EFF] to-[#C5B5FD] bg-clip-text text-transparent">touch</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Have questions about DriminAI? We'd love to hear from you. Send us a message and we'll respond as soon as
              possible.
            </p>

            <div className="space-y-6">
              {[
                {
                  icon: Mail,
                  title: "Email",
                  content: "hello@drimin.ai",
                  description: "Send us an email anytime",
                },
                {
                  icon: Phone,
                  title: "Phone",
                  content: "+91 98765 43210",
                  description: "Mon-Fri from 9am to 6pm IST",
                },
                {
                  icon: MapPin,
                  title: "Office",
                  content: "Bangalore, India",
                  description: "Come say hello at our office",
                },
              ].map((contact, index) => (
                <motion.div
                  key={contact.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="flex items-start space-x-4"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-[#6C3EFF] to-[#C5B5FD] rounded-xl flex items-center justify-center flex-shrink-0">
                    <contact.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{contact.title}</h3>
                    <p className="text-[#6C3EFF] font-medium">{contact.content}</p>
                    <p className="text-gray-600 text-sm">{contact.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {!isSubmitted ? (
              <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-semibold mb-6">Send us a message</h2>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="h-12 border-2 border-gray-200 focus:border-[#6C3EFF] rounded-xl bg-white/50 backdrop-blur-sm transition-all duration-300"
                        placeholder="Your full name"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="h-12 border-2 border-gray-200 focus:border-[#6C3EFF] rounded-xl bg-white/50 backdrop-blur-sm transition-all duration-300"
                        placeholder="your@email.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={6}
                        className="border-2 border-gray-200 focus:border-[#6C3EFF] rounded-xl bg-white/50 backdrop-blur-sm transition-all duration-300 resize-none"
                        placeholder="Tell us about your project or ask us anything..."
                      />
                    </div>

                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full h-12 bg-gradient-to-r from-[#6C3EFF] to-[#C5B5FD] hover:from-[#5A2FE6] hover:to-[#B8A5FC] text-white rounded-xl font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
                      >
                        {isLoading ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          />
                        ) : (
                          <>
                            <span className="relative z-10 flex items-center justify-center">
                              Send Message
                              <Send className="ml-2 h-4 w-4" />
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-[#8B5CF6] to-[#D8B4FE] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </form>
                </CardContent>
              </Card>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-8 text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.5 }}
                        className="text-white text-2xl"
                      >
                        ✓
                      </motion.div>
                    </motion.div>

                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="text-2xl font-semibold mb-4"
                    >
                      Message sent! 🎉
                    </motion.h2>

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                      className="text-gray-600 mb-6"
                    >
                      Thanks for reaching out! We'll get back to you within 24 hours.
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.8 }}
                    >
                      <Link href="/">
                        <Button className="bg-gradient-to-r from-[#6C3EFF] to-[#C5B5FD] hover:from-[#5A2FE6] hover:to-[#B8A5FC] text-white px-8 py-3 rounded-xl">
                          Back to Home
                        </Button>
                      </Link>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

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
