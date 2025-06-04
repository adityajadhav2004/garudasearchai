"use client"

import { motion } from "framer-motion"
import { Copy, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ReactMarkdown from "react-markdown"

interface AnswerBlockProps {
  answer: string
  query: string
}

export function AnswerBlock({ answer, query }: AnswerBlockProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(answer)
  }

  const handleDownload = () => {
    const blob = new Blob([`# ${query}\n\n${answer}`], { type: "text/markdown" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `garuda-ai-${Date.now()}.md`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="border-2" style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2" style={{ color: "var(--foreground)" }}>
            🦅 Garuda AI Answer
          </CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleCopy} className="gap-2">
              <Copy className="w-4 h-4" />
              Copy
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownload} className="gap-2">
              <Download className="w-4 h-4" />
              Download
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="prose prose-lg max-w-none" style={{ color: "var(--foreground)" }}>
            <ReactMarkdown
              components={{
                h1: ({ children }) => <h1 style={{ color: "var(--foreground)" }}>{children}</h1>,
                h2: ({ children }) => <h2 style={{ color: "var(--foreground)" }}>{children}</h2>,
                h3: ({ children }) => <h3 style={{ color: "var(--foreground)" }}>{children}</h3>,
                p: ({ children }) => <p style={{ color: "var(--foreground)" }}>{children}</p>,
                li: ({ children }) => <li style={{ color: "var(--foreground)" }}>{children}</li>,
                strong: ({ children }) => <strong style={{ color: "var(--primary)" }}>{children}</strong>,
                code: ({ children }) => (
                  <code
                    style={{
                      backgroundColor: "var(--muted)",
                      color: "var(--foreground)",
                      padding: "2px 4px",
                      borderRadius: "4px",
                    }}
                  >
                    {children}
                  </code>
                ),
              }}
            >
              {answer}
            </ReactMarkdown>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
