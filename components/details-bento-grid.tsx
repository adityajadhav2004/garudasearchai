"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { ExternalLink, Lightbulb, Cog, TrendingUp, BookOpen, Zap, Target } from "lucide-react"
import type { DetailCard } from "@/lib/openrouter"

interface DetailsBentoGridProps {
  details: DetailCard[]
  title: string
}

const getIcon = (type: string) => {
  switch (type) {
    case "concept":
      return Lightbulb
    case "process":
      return Cog
    case "benefits":
      return TrendingUp
    case "applications":
      return Target
    case "trends":
      return TrendingUp
    case "guide":
      return BookOpen
    default:
      return Zap
  }
}

const getGradient = (type: string) => {
  switch (type) {
    case "concept":
      return "from-blue-500 to-purple-600"
    case "process":
      return "from-green-500 to-teal-600"
    case "benefits":
      return "from-orange-500 to-red-600"
    case "applications":
      return "from-purple-500 to-pink-600"
    case "trends":
      return "from-cyan-500 to-blue-600"
    case "guide":
      return "from-yellow-500 to-orange-600"
    default:
      return "from-gray-500 to-gray-600"
  }
}

export function DetailsBentoGrid({ details, title }: DetailsBentoGridProps) {
  if (!details || details.length === 0) return null

  const gridLayouts = [
    "col-span-2 row-span-1",
    "col-span-1 row-span-2",
    "col-span-1 row-span-1",
    "col-span-1 row-span-1",
    "col-span-2 row-span-1",
    "col-span-1 row-span-1",
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="w-full"
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
          <Zap className="w-3 h-3 text-white" />
        </div>
        <h2 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>
          {title}
        </h2>
        <span
          className="text-xs px-2 py-1 rounded-full font-medium"
          style={{ backgroundColor: "var(--muted)", color: "var(--muted-foreground)" }}
        >
          {details.length} insights
        </span>
      </div>

      <div className="grid grid-cols-3 grid-rows-2 gap-4 h-80">
        {details.slice(0, 6).map((detail, index) => {
          const Icon = getIcon(detail.type)
          const gradient = getGradient(detail.type)

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={gridLayouts[index] || "col-span-1 row-span-1"}
            >
              <Card
                className="h-full cursor-pointer group transition-all duration-300 hover:scale-105 backdrop-blur-xl border overflow-hidden relative"
                style={{
                  backgroundColor: "var(--glass)",
                  borderColor: "var(--border)",
                }}
                onClick={() => detail.sourceUrl && window.open(detail.sourceUrl, "_blank")}
              >
                {/* Gradient overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                />

                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
                  style={{ backgroundColor: "var(--glow)" }}
                />

                <CardContent className="p-4 h-full flex flex-col justify-between relative z-10">
                  <div>
                    <div className="flex items-start justify-between mb-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-br ${gradient}`}>
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      {detail.sourceUrl && (
                        <ExternalLink
                          className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-200"
                          style={{ color: "var(--primary)" }}
                        />
                      )}
                    </div>

                    <h3
                      className="font-semibold text-sm mb-2 group-hover:text-white transition-colors duration-200"
                      style={{ color: "var(--foreground)" }}
                    >
                      {detail.title}
                    </h3>

                    <p className="text-xs leading-relaxed opacity-80" style={{ color: "var(--muted-foreground)" }}>
                      {detail.description}
                    </p>
                  </div>

                  <div className="flex justify-between items-end mt-3">
                    <span
                      className="text-xs uppercase tracking-wider font-medium"
                      style={{ color: "var(--muted-foreground)" }}
                    >
                      {detail.type}
                    </span>
                    <div
                      className="w-1 h-1 rounded-full group-hover:w-8 group-hover:h-1 transition-all duration-300"
                      style={{ backgroundColor: "var(--primary)" }}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
