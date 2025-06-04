"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

interface BentoGridProps {
  questions: string[]
  onQuestionClick: (question: string) => void
}

export function BentoGrid({ questions, onQuestionClick }: BentoGridProps) {
  if (!questions || questions.length === 0) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full"
    >
      <h2 className="text-2xl font-bold mb-6" style={{ color: "var(--foreground)" }}>
        Related Questions
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {questions.slice(0, 6).map((question, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card
              className="cursor-pointer transition-all duration-200 hover:scale-105 border backdrop-blur-sm group"
              style={{
                backgroundColor: "var(--card)",
                borderColor: "var(--border)",
              }}
              onClick={() => onQuestionClick(question)}
            >
              <CardContent className="p-4">
                <p
                  className="text-sm leading-relaxed group-hover:text-blue-400 transition-colors"
                  style={{ color: "var(--foreground)" }}
                >
                  {question}
                </p>
                <div className="flex justify-end mt-3">
                  <ArrowRight
                    className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: "var(--primary)" }}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
