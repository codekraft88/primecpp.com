"use client"

import { useRef, useEffect, useState, ReactNode } from "react"
import { cn } from "@/lib/utils"

interface StackingCard {
  id: string
  content: ReactNode
  backgroundColor?: string
}

interface StackingCardsProps {
  cards: StackingCard[]
  className?: string
  cardClassName?: string
}

export function StackingCards({ cards, className, cardClassName }: StackingCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState<number[]>(new Array(cards.length).fill(0))

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      const cardElements = container.querySelectorAll<HTMLDivElement>('[data-stacking-card]')
      const containerRect = container.getBoundingClientRect()
      const windowHeight = window.innerHeight

      const newProgress = Array.from(cardElements).map((card, index) => {
        const cardRect = card.getBoundingClientRect()
        const cardTop = cardRect.top
        
        // Calculate how much the card has scrolled past the sticky point
        const stickyTop = 80 + (index * 20) // Offset for each card
        const scrollPast = stickyTop - cardTop + windowHeight * 0.3
        const maxScroll = windowHeight * 0.5
        
        // Clamp between 0 and 1
        return Math.max(0, Math.min(1, scrollPast / maxScroll))
      })

      setScrollProgress(newProgress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll)
  }, [cards.length])

  return (
    <div 
      ref={containerRef}
      className={cn("relative", className)}
      style={{ 
        // Total height = cards * card height + extra scroll space
        minHeight: `${cards.length * 80 + 20}vh` 
      }}
    >
      {cards.map((card, index) => {
        const isLast = index === cards.length - 1
        const progress = scrollProgress[index] || 0
        const nextProgress = scrollProgress[index + 1] || 0
        
        // Scale down slightly as next card overlaps
        const scale = isLast ? 1 : 1 - (nextProgress * 0.05)
        
        // Move up slightly as next card overlaps
        const translateY = isLast ? 0 : -(nextProgress * 20)
        
        // Reduce opacity slightly as next card overlaps
        const opacity = isLast ? 1 : 1 - (nextProgress * 0.15)
        
        // Increase shadow as card becomes "buried"
        const shadowOpacity = nextProgress * 0.3

        return (
          <div
            key={card.id}
            data-stacking-card
            className={cn(
              "sticky w-full rounded-3xl overflow-hidden transition-shadow duration-300",
              cardClassName
            )}
            style={{
              top: `${80 + (index * 20)}px`,
              zIndex: cards.length - index,
              transform: `scale(${scale}) translateY(${translateY}px)`,
              opacity,
              boxShadow: `
                0 ${10 + shadowOpacity * 20}px ${30 + shadowOpacity * 40}px rgba(0, 0, 0, ${0.08 + shadowOpacity * 0.12}),
                0 ${2 + shadowOpacity * 4}px ${8 + shadowOpacity * 12}px rgba(0, 0, 0, ${0.04 + shadowOpacity * 0.08}),
                inset 0 1px 0 rgba(255, 255, 255, 0.1)
              `,
              backgroundColor: card.backgroundColor || 'var(--card)',
              willChange: 'transform, opacity',
            }}
          >
            {card.content}
          </div>
        )
      })}
    </div>
  )
}

// Preset card content wrapper with consistent padding
export function StackingCardContent({ 
  children, 
  className 
}: { 
  children: ReactNode
  className?: string 
}) {
  return (
    <div className={cn("p-8 md:p-12 lg:p-16", className)}>
      {children}
    </div>
  )
}
