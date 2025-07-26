// components/Nav.tsx
"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-4xl">
      <div className="bg-white/90 backdrop-blur-md border border-gray-200 rounded-full shadow-lg px-6 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-semibold text-[#1C1C1E]">
            DriminAI
          </Link>

          {/* Desktop Navigation */}
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
  )
}