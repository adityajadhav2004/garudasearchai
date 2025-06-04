"use client"

import { motion } from "framer-motion"
import { Copy, Download, Share, Bookmark, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ReactMarkdown from "react-markdown"
import { useState } from "react"

interface ResultAnswerProps {
  answer: string
  query: string
}

export function ResultAnswer({ answer, query }: ResultAnswerProps) {
  const [copied, setCopied] = useState(false)
  const [shared, setShared] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(answer)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("Failed to copy:", error)
      // Fallback for older browsers
      const textArea = document.createElement("textarea")
      textArea.value = answer
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand("copy")
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleDownload = () => {
    try {
      const blob = new Blob([`# ${query}\n\n${answer}`], { type: "text/markdown" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `garuda-ai-${Date.now()}.md`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Failed to download:", error)
    }
  }

  const handleShare = async () => {
    try {
      // Check if Web Share API is supported and available
      if (navigator.share && navigator.canShare) {
        const shareData = {
          title: `Garuda AI: ${query}`,
          text: answer.substring(0, 200) + (answer.length > 200 ? "..." : ""),
          url: window.location.href,
        }

        // Check if the data can be shared
        if (navigator.canShare(shareData)) {
          await navigator.share(shareData)
          setShared(true)
          setTimeout(() => setShared(false), 2000)
          return
        }
      }

      // Fallback: Copy to clipboard
      const shareText = `${query}\n\n${answer}\n\nShared from Garuda AI: ${window.location.href}`
      await navigator.clipboard.writeText(shareText)
      setShared(true)
      setTimeout(() => setShared(false), 2000)
    } catch (error) {
      console.error("Failed to share:", error)

      // Final fallback: Create a shareable link
      try {
        const shareUrl = `mailto:?subject=${encodeURIComponent(`Garuda AI: ${query}`)}&body=${encodeURIComponent(
          `${answer}\n\nShared from Garuda AI: ${window.location.href}`,
        )}`
        window.open(shareUrl, "_blank")
        setShared(true)
        setTimeout(() => setShared(false), 2000)
      } catch (emailError) {
        console.error("All share methods failed:", emailError)
        // Last resort: just copy to clipboard
        handleCopy()
      }
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, type: "spring" }}
    >
      <Card
        className="relative overflow-hidden backdrop-blur-xl border"
        style={{
          backgroundColor: "var(--glass)",
          borderColor: "var(--border)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
        }}
      >
        <CardHeader className="relative z-10">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-3" style={{ color: "var(--foreground)" }}>
              <motion.div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: "var(--primary)" }}
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
              AI Response
            </CardTitle>

            <div className="flex gap-2">
              {[
                {
                  icon: Copy,
                  action: handleCopy,
                  label: copied ? "Copied!" : "Copy",
                  active: copied,
                },
                {
                  icon: Download,
                  action: handleDownload,
                  label: "Download",
                  active: false,
                },
                {
                  icon: Share,
                  action: handleShare,
                  label: shared ? "Shared!" : "Share",
                  active: shared,
                },
                {
                  icon: Bookmark,
                  action: () => setBookmarked(!bookmarked),
                  label: bookmarked ? "Saved" : "Save",
                  active: bookmarked,
                },
              ].map(({ icon: Icon, action, label, active }, index) => (
                <motion.div key={index} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={action}
                    className="gap-2 relative overflow-hidden backdrop-blur-xl border transition-all duration-200"
                    style={{
                      backgroundColor: active ? "var(--primary)" : "var(--glass)",
                      borderColor: active ? "var(--primary)" : "var(--border)",
                      color: active ? "var(--primary-foreground)" : "var(--foreground)",
                    }}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{label}</span>
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </CardHeader>

        <CardContent className="relative z-10">
          <div
            className="prose prose-lg max-w-none"
            style={{
              color: "var(--foreground)",
            }}
          >
            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <motion.h1
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-3xl font-bold mb-4"
                    style={{ color: "var(--foreground)" }}
                  >
                    {children}
                  </motion.h1>
                ),
                h2: ({ children }) => (
                  <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-2xl font-semibold mb-3"
                    style={{ color: "var(--foreground)" }}
                  >
                    {children}
                  </motion.h2>
                ),
                p: ({ children }) => (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 leading-relaxed"
                    style={{ color: "var(--foreground)" }}
                  >
                    {children}
                  </motion.p>
                ),
                strong: ({ children }) => <strong style={{ color: "var(--primary)" }}>{children}</strong>,
                code: ({ children }) => (
                  <code
                    className="px-2 py-1 rounded text-sm font-mono relative backdrop-blur-xl border"
                    style={{
                      backgroundColor: "var(--muted)",
                      color: "var(--foreground)",
                      borderColor: "var(--border)",
                    }}
                  >
                    {children}
                  </code>
                ),
                a: ({ children, href }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:underline"
                    style={{ color: "var(--primary)" }}
                  >
                    {children}
                    <ExternalLink className="w-3 h-3" />
                  </a>
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
