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
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (query.trim() && !isLoading) {
      try {
        await onSearch(query.trim())
      } catch (err) {
        setError("Sorry, something went wrong. Please try again.")
      }
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
          {/* Glassmorphic container with flex layout for robust alignment */}
          <div
            className="relative rounded-xl backdrop-blur-xl border transition-all duration-300 flex items-center"
            style={{
              backgroundColor: "var(--glass)",
              borderColor: isFocused ? "var(--primary)" : "var(--border)",
              boxShadow: isFocused
                ? `0 0 0 1px var(--primary), 0 8px 32px rgba(0, 0, 0, 0.1)`
                : `0 4px 16px rgba(0, 0, 0, 0.1)`,
            }}
          >
            {/* Search icon - always vertically centered, never moves */}
            <span className="flex items-center justify-center pl-4 pr-2 h-full">
              <Search
                className="w-5 h-5"
                style={{
                  color: isFocused ? "var(--primary)" : "var(--muted-foreground)",
                }}
              />
            </span>
            <Input
              type="text"
              placeholder="Search anything..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              disabled={isLoading}
              className="flex-1 bg-transparent border-0 focus:ring-0 focus:outline-none text-lg py-4 pr-4"
              style={{
                color: "var(--foreground)",
              }}
            />
            {/* Search button - always in the bar, never moves */}
            <motion.div
              className="flex items-center pr-2"
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
        {/* Error message always below the bar */}
        {error && (
          <div className="text-red-500 text-sm text-center mt-2">{error}</div>
        )}
      </form>
    </motion.div>
  )
}
