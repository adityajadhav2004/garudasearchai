"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Brain, Target, Clock, TrendingUp } from "lucide-react"
import type { RelevancyInsights } from "@/lib/openrouter"

interface RelevancyInsightsProps {
  insights: RelevancyInsights
  processingTime?: number
}

export function RelevancyInsightsComponent({ insights, processingTime }: RelevancyInsightsProps) {
  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "simple":
        return "#10b981"
      case "moderate":
        return "#f59e0b"
      case "complex":
        return "#ef4444"
      case "expert":
        return "#8b5cf6"
      default:
        return "#6b7280"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="w-full"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {/* Confidence Score */}
        <Card
          className="backdrop-blur-xl border"
          style={{ backgroundColor: "var(--glass)", borderColor: "var(--border)" }}
        >
          <CardContent className="p-4 text-center">
            <Target className="w-6 h-6 mx-auto mb-2" style={{ color: "var(--primary)" }} />
            <div className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>
              {insights.confidenceScore}%
            </div>
            <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>
              Confidence
            </div>
          </CardContent>
        </Card>

        {/* Query Complexity */}
        <Card
          className="backdrop-blur-xl border"
          style={{ backgroundColor: "var(--glass)", borderColor: "var(--border)" }}
        >
          <CardContent className="p-4 text-center">
            <Brain className="w-6 h-6 mx-auto mb-2" style={{ color: getComplexityColor(insights.queryComplexity) }} />
            <div className="text-lg font-bold capitalize" style={{ color: "var(--foreground)" }}>
              {insights.queryComplexity}
            </div>
            <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>
              Complexity
            </div>
          </CardContent>
        </Card>

        {/* Processing Time */}
        <Card
          className="backdrop-blur-xl border"
          style={{ backgroundColor: "var(--glass)", borderColor: "var(--border)" }}
        >
          <CardContent className="p-4 text-center">
            <Clock className="w-6 h-6 mx-auto mb-2" style={{ color: "var(--accent)" }} />
            <div className="text-lg font-bold" style={{ color: "var(--foreground)" }}>
              {processingTime ? `${processingTime}ms` : "< 1s"}
            </div>
            <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>
              Response Time
            </div>
          </CardContent>
        </Card>

        {/* Categories */}
        <Card
          className="backdrop-blur-xl border"
          style={{ backgroundColor: "var(--glass)", borderColor: "var(--border)" }}
        >
          <CardContent className="p-4 text-center">
            <TrendingUp className="w-6 h-6 mx-auto mb-2" style={{ color: "var(--primary)" }} />
            <div className="text-lg font-bold" style={{ color: "var(--foreground)" }}>
              {insights.topicCategories.length}
            </div>
            <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>
              Categories
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Key Insights */}
      {insights.keyInsights.length > 0 && (
        <Card
          className="backdrop-blur-xl border"
          style={{ backgroundColor: "var(--glass)", borderColor: "var(--border)" }}
        >
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2" style={{ color: "var(--foreground)" }}>
              <Brain className="w-4 h-4" style={{ color: "var(--primary)" }} />
              Key Insights
            </h3>
            <div className="flex flex-wrap gap-2">
              {insights.keyInsights.map((insight, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="px-3 py-1 rounded-full text-xs font-medium"
                  style={{
                    backgroundColor: "var(--muted)",
                    color: "var(--muted-foreground)",
                  }}
                >
                  {insight}
                </motion.span>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </motion.div>
  )
}
