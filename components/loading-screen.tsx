"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

const quantumMessages = [
  "Initializing quantum processors...",
  "Scanning neural pathways...",
  "Decoding information matrices...",
  "Synthesizing knowledge fragments...",
  "Optimizing response algorithms...",
  "Calibrating AI consciousness...",
  "Finalizing quantum synthesis...",
]

interface LoadingScreenProps {
  isVisible: boolean
}

export function LoadingScreen({ isVisible }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [messageIndex, setMessageIndex] = useState(0)
  const [phase, setPhase] = useState<"initializing" | "processing" | "finalizing">("initializing")

  useEffect(() => {
    if (!isVisible) {
      setProgress(0)
      setMessageIndex(0)
      setPhase("initializing")
      return
    }

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 12

        if (newProgress > 30 && phase === "initializing") setPhase("processing")
        if (newProgress > 70 && phase === "processing") setPhase("finalizing")

        return Math.min(newProgress, 100)
      })
    }, 80)

    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % quantumMessages.length)
    }, 800)

    return () => {
      clearInterval(progressInterval)
      clearInterval(messageInterval)
    }
  }, [isVisible, phase])

  if (!isVisible) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{
        background: "var(--background)",
      }}
    >
      {/* Quantum field background */}
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
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
              scale: [1, 3, 1, 2, 1],
            }}
            transition={{
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.02,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Central loading interface */}
      <div className="text-center space-y-8 z-10 max-w-md relative">
        {/* Holographic logo */}
        <motion.div
          initial={{ scale: 0, rotateY: 180 }}
          animate={{ scale: 1, rotateY: 0 }}
          transition={{ duration: 1, type: "spring" }}
        >
          <motion.div
            className="text-6xl font-bold relative"
            style={{
              background: "var(--gradient)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              filter: `drop-shadow(0 0 20px var(--glow))`,
            }}
            animate={{
              filter: [
                `drop-shadow(0 0 20px var(--glow))`,
                `drop-shadow(0 0 40px var(--glow))`,
                `drop-shadow(0 0 20px var(--glow))`,
              ],
            }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            Garuda AI
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-sm mt-2 tracking-wider"
            style={{ color: "var(--muted-foreground)" }}
          >
            QUANTUM INTELLIGENCE SYSTEM
          </motion.div>
        </motion.div>

        {/* Multi-layered progress system */}
        <div className="relative w-48 h-48 mx-auto">
          {/* Outer ring */}
          <svg className="w-48 h-48 transform -rotate-90 absolute" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" stroke="var(--border)" strokeWidth="0.5" fill="none" opacity="0.3" />
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              stroke="var(--primary)"
              strokeWidth="1"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 45}`}
              strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
              style={{
                filter: `drop-shadow(0 0 10px var(--primary))`,
              }}
            />
          </svg>

          {/* Middle ring */}
          <svg className="w-40 h-40 transform rotate-90 absolute inset-4" viewBox="0 0 100 100">
            <motion.circle
              cx="50"
              cy="50"
              r="40"
              stroke="var(--accent)"
              strokeWidth="1"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 40}`}
              strokeDashoffset={`${2 * Math.PI * 40 * (1 - (progress * 0.8) / 100)}`}
              style={{
                filter: `drop-shadow(0 0 8px var(--accent))`,
              }}
            />
          </svg>

          {/* Inner ring */}
          <svg className="w-32 h-32 transform -rotate-45 absolute inset-8" viewBox="0 0 100 100">
            <motion.circle
              cx="50"
              cy="50"
              r="35"
              stroke="var(--foreground)"
              strokeWidth="0.5"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 35}`}
              strokeDashoffset={`${2 * Math.PI * 35 * (1 - (progress * 0.6) / 100)}`}
              style={{
                filter: `drop-shadow(0 0 5px var(--foreground))`,
              }}
            />
          </svg>

          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div
              className="text-4xl font-bold mb-2"
              style={{ color: "var(--foreground)" }}
              animate={{
                scale: [1, 1.1, 1],
                textShadow: [`0 0 10px var(--primary)`, `0 0 20px var(--primary)`, `0 0 10px var(--primary)`],
              }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            >
              {Math.round(progress)}%
            </motion.div>
            <motion.div
              className="text-xs uppercase tracking-widest font-medium"
              style={{ color: "var(--muted-foreground)" }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              {phase}
            </motion.div>
          </div>

          {/* Rotating elements */}
          <motion.div
            className="absolute inset-0"
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  backgroundColor: "var(--primary)",
                  top: "50%",
                  left: "50%",
                  transformOrigin: "0 0",
                  transform: `rotate(${i * 60}deg) translateX(80px) translateY(-4px)`,
                  filter: `drop-shadow(0 0 5px var(--primary))`,
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.2,
                }}
              />
            ))}
          </motion.div>
        </div>

        {/* Quantum message display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={messageIndex}
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="h-8"
          >
            <p
              className="text-lg font-medium tracking-wide"
              style={{
                color: "var(--foreground)",
                textShadow: `0 0 10px var(--primary)`,
              }}
            >
              {quantumMessages[messageIndex]}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Data stream visualization */}
        <div className="flex justify-center space-x-1">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1 rounded-full"
              style={{ backgroundColor: "var(--primary)" }}
              animate={{
                height: [4, 20, 4],
                opacity: [0.3, 1, 0.3],
                filter: [`blur(0px)`, `blur(1px)`, `blur(0px)`],
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.1,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>

      {/* Scanning lines */}
      <motion.div className="absolute inset-0 pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-full h-px"
            style={{
              background: `linear-gradient(90deg, transparent, var(--primary), transparent)`,
              top: `${20 + i * 30}%`,
            }}
            animate={{
              x: ["-100%", "100%"],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 1,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  )
}
