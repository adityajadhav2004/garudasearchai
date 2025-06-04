"use client"

import { useState } from "react"
import { SearchInput } from "@/components/search-input"
import { LoadingScreen } from "@/components/loading-screen"
import { ResultAnswer } from "@/components/result-answer"
import { BentoGrid } from "@/components/bento-grid"
import { SourcesSection } from "@/components/sources-section"
import { ThemeToggle } from "@/components/theme-toggle"
import { searchWithSerper } from "@/lib/serper"
import { generateAIResponse, type AIResponse } from "@/lib/openrouter"
import { motion, AnimatePresence } from "framer-motion"

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [currentQuery, setCurrentQuery] = useState("")
  const [aiResponse, setAiResponse] = useState<AIResponse | null>(null)

  const handleSearch = async (query: string) => {
    setIsLoading(true)
    setCurrentQuery(query)
    setAiResponse(null)

    try {
      const searchResults = await searchWithSerper(query)
      const response = await generateAIResponse(query, searchResults.organic || [])
      setAiResponse(response)
    } catch (error) {
      console.error("Search error:", error)
      setAiResponse({
        answer: `**Quantum Processing Error** - Unable to analyze "${query}". Neural networks recalibrating...`,
        followUpQuestions: [
          "Can you rephrase your question for better quantum processing?",
          "Try a different search approach",
          "Search for something else",
        ],
        sources: [],
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen transition-all duration-500 relative overflow-hidden"
      style={{
        background: "var(--background)",
      }}
    >
      {/* Quantum field background */}
      <div className="fixed inset-0 opacity-30 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px h-px rounded-full"
            style={{ backgroundColor: "var(--primary)" }}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0,
            }}
            animate={{
              x: [
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth,
              ],
              y: [
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight,
              ],
              opacity: [0, 1, 0.5, 1, 0],
              scale: [1, 2, 1],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.1,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <LoadingScreen isVisible={isLoading} />

      {/* Futuristic Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="sticky top-0 z-40 backdrop-blur-3xl border-b"
        style={{
          background: `linear-gradient(145deg, var(--neuLight), var(--neuDark))`,
          borderColor: "var(--border)",
          boxShadow: `
            0 8px 32px rgba(0, 0, 0, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.1)
          `,
        }}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            <motion.div
              className="relative w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden"
              style={{
                background: "var(--gradient)",
                boxShadow: `0 0 20px var(--glow)`,
              }}
              whileHover={{ scale: 1.1, rotate: 180 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="w-5 h-5 bg-white rounded-sm"
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />
            </motion.div>
            <div>
              <motion.h1
                className="text-2xl font-bold"
                style={{
                  color: "var(--foreground)",
                  textShadow: `0 0 10px var(--primary)`,
                }}
                animate={{
                  textShadow: [`0 0 10px var(--primary)`, `0 0 20px var(--primary)`, `0 0 10px var(--primary)`],
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              >
                Garuda AI
              </motion.h1>
              <motion.div
                className="text-xs tracking-wider"
                style={{ color: "var(--muted-foreground)" }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                QUANTUM INTELLIGENCE
              </motion.div>
            </div>
          </motion.div>
          <ThemeToggle />
        </div>
      </motion.header>

      <main className="container mx-auto px-4 py-8 relative z-10">
        {/* Hero Section */}
        <AnimatePresence>
          {!aiResponse && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 1, type: "spring" }}
              className="text-center mb-16 mt-20"
            >
              <motion.h2
                className="text-7xl font-bold mb-8 relative"
                style={{
                  background: "var(--gradient)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  lineHeight: "1.1",
                }}
                animate={{
                  filter: [
                    `drop-shadow(0 0 20px var(--glow))`,
                    `drop-shadow(0 0 40px var(--glow))`,
                    `drop-shadow(0 0 20px var(--glow))`,
                  ],
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              >
                Neural Search
                <br />
                Revolution
              </motion.h2>
              <motion.p
                className="text-xl mb-12 max-w-3xl mx-auto leading-relaxed"
                style={{ color: "var(--muted-foreground)" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                Experience the future of search with quantum AI that understands context, processes meaning, and
                delivers insights at the speed of thought.
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search Bar */}
        <div className={`mb-12 ${!aiResponse ? "mt-8" : ""}`}>
          <SearchInput onSearch={handleSearch} isLoading={isLoading} />
        </div>

        {/* Results */}
        <AnimatePresence>
          {aiResponse && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-12">
              <ResultAnswer answer={aiResponse.answer} query={currentQuery} />

              {aiResponse.followUpQuestions && aiResponse.followUpQuestions.length > 0 && (
                <BentoGrid questions={aiResponse.followUpQuestions} onQuestionClick={handleSearch} />
              )}

              {aiResponse.sources && aiResponse.sources.length > 0 && <SourcesSection sources={aiResponse.sources} />}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-24 text-center"
        >
          <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
            Powered by <span style={{ color: "var(--primary)", textShadow: `0 0 5px var(--primary)` }}>Quantum AI</span>{" "}
            • Built for the Future
          </p>
        </motion.footer>
      </main>
    </div>
  )
}
