"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Brain, ChevronRight } from "lucide-react"

interface IntentChainProps {
  questions: string[]
  onQuestionClick: (question: string) => void
}

export function IntentChain({ questions, onQuestionClick }: IntentChainProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="w-full"
    >
      <div className="flex items-center gap-3 mb-6">
        <Brain className="w-5 h-5" style={{ color: "var(--accent)" }} />
        <h2 className="text-xl font-bold" style={{ color: "var(--foreground)" }}>
          IntentChain™ — Dive Deeper
        </h2>
      </div>

      <div className="flex flex-wrap gap-3">
        {questions.map((question, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card
              className="cursor-pointer transition-all duration-300 hover:scale-105 backdrop-blur-xl border group"
              style={{
                backgroundColor: "var(--glass)",
                borderColor: "var(--border)",
              }}
              onClick={() => onQuestionClick(question)}
            >
              <CardContent className="px-4 py-3 flex items-center gap-2">
                <p className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
                  {question}
                </p>
                <ChevronRight
                  className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-200 transform group-hover:translate-x-1"
                  style={{ color: "var(--accent)" }}
                />
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
