"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { ExternalLink, Globe } from "lucide-react"
import type { Source } from "@/lib/openrouter"

interface SourcesSectionProps {
  sources: Source[]
}

export function SourcesSection({ sources }: SourcesSectionProps) {
  if (!sources || sources.length === 0) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="w-full"
    >
      <div className="flex items-center gap-3 mb-6">
        <Globe className="w-5 h-5" style={{ color: "var(--primary)" }} />
        <h2 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>
          Sources
        </h2>
        <span
          className="text-sm px-2 py-1 rounded-full"
          style={{
            backgroundColor: "var(--muted)",
            color: "var(--muted-foreground)",
          }}
        >
          {sources.length}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sources.map((source, index) => (
          <motion.div
            key={source.id}
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
              onClick={() => window.open(source.url, "_blank")}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-sm line-clamp-2" style={{ color: "var(--foreground)" }}>
                    {source.title}
                  </h3>
                  <ExternalLink
                    className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-2"
                    style={{ color: "var(--primary)" }}
                  />
                </div>

                <p className="text-xs line-clamp-2 mb-3" style={{ color: "var(--muted-foreground)" }}>
                  {source.snippet}
                </p>

                <div className="flex items-center justify-between text-xs">
                  <span style={{ color: "var(--muted-foreground)" }}>{source.domain}</span>
                  {source.relevancyScore && (
                    <span
                      className="px-2 py-1 rounded-full"
                      style={{
                        backgroundColor: "var(--muted)",
                        color: "var(--primary)",
                      }}
                    >
                      {source.relevancyScore}% relevant
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
