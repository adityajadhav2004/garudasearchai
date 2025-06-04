"use client"

import type React from "react"

import { useState } from "react"
import { Search, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface SearchBarProps {
  onSearch: (query: string) => void
  isLoading: boolean
}

export function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [query, setQuery] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim() && !isLoading) {
      onSearch(query.trim())
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5"
            style={{ color: "var(--muted-foreground)" }}
          />
          <Input
            type="text"
            placeholder="Ask Garuda AI anything..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={isLoading}
            className="pl-12 pr-32 py-6 text-lg rounded-2xl border-2 transition-all duration-200 focus:scale-[1.02]"
            style={{
              backgroundColor: "var(--card)",
              borderColor: "var(--border)",
              color: "var(--foreground)",
            }}
          />
          <Button
            type="submit"
            disabled={!query.trim() || isLoading}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-xl px-6"
            style={{
              backgroundColor: "var(--primary)",
              color: "var(--primary-foreground)",
            }}
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Search
          </Button>
        </div>
      </form>
    </div>
  )
}
