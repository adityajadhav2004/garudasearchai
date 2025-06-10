"use client"

import type React from "react"
import { useState } from "react"
import { Search, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion, AnimatePresence } from "framer-motion"

interface SearchInputProps {
  onSearch: (query: string) => void
  isLoading: boolean
}

export function SearchInput({ onSearch, isLoading }: SearchInputProps) {
  const [query, setQuery] = useState("")
  const [isFocused, setIsFocused] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim() && !isLoading) {
      onSearch(query.trim())
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, type: "spring" }}
      className="w-full max-w-4xl mx-auto relative"
    >
      <form onSubmit={handleSubmit} className="relative">
        <motion.div className="relative group" whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
          {/* Glassmorphic container */}
          <div
            className="relative rounded-xl backdrop-blur-xl border transition-all duration-300"
            style={{
              backgroundColor: "var(--glass)",
              borderColor: isFocused ? "var(--primary)" : "var(--border)",
              boxShadow: isFocused
                ? `0 0 0 1px var(--primary), 0 8px 32px rgba(0, 0, 0, 0.1)`
                : `0 4px 16px rgba(0, 0, 0, 0.1)`,
            }}
          >
            {/* Search icon - fixed position, no animation */}
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
              <Search
                className="w-5 h-5"
                style={{
                  color: isFocused ? "var(--primary)" : "var(--muted-foreground)",
                }}
              />
            </div>

            <Input
              type="text"
              placeholder="Search anything..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              disabled={isLoading}
              className="pl-12 pr-28 py-4 text-lg bg-transparent border-0 focus:ring-0 focus:outline-none relative z-10"
              style={{
                color: "var(--foreground)",
              }}
            />

            {/* Glassmorphic search button */}
            <motion.div
              className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10"
              whileHover={{ scale: 1.02, backgroundColor: "var(--muted)" }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                type="submit"
                disabled={!query.trim() || isLoading}
                className="rounded-lg px-4 py-2 font-medium relative overflow-hidden backdrop-blur-xl border"
                style={{
                  backgroundColor: "var(--glass)",
                  borderColor: "var(--border)",
                  color: "var(--foreground)",
                }}
              >
                <div className="relative flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  {isLoading ? "Searching..." : "Search"}
                </div>
              </Button>
            </motion.div>
          </div>

          {/* Subtle focus glow */}
          <AnimatePresence>
            {isFocused && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute -inset-1 rounded-xl blur-sm pointer-events-none"
                style={{
                  background: `linear-gradient(90deg, transparent, var(--primary)20, transparent)`,
                }}
              />
            )}
          </AnimatePresence>
        </motion.div>
      </form>
    </motion.div>
  )
}
