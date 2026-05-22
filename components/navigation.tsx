"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#platform-assets", label: "Ventures" },
  { href: "#packages", label: "Packages" },
  { href: "#contact", label: "Contact" },
]

function PrimeCPPLogo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center group", className)}>
      <Image 
        src="/logo-blau.png" 
        alt="prime CPP" 
        width={140} 
        height={36} 
        className="h-9 w-auto transition-transform duration-300 group-hover:scale-105"
        priority
      />
    </div>
  )
}

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
      
      // Update active section based on scroll position
      const sections = navItems.map(item => item.href.replace("#", ""))
      for (const section of sections.reverse()) {
        const element = document.getElementById(section)
        if (element && window.scrollY >= element.offsetTop - 100) {
          setActiveSection(section)
          break
        }
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "glass-strong py-3 shadow-lg shadow-primary/5"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 relative z-10">
            <PrimeCPPLogo />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 glass-subtle rounded-full px-2 py-1.5">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full",
                  activeSection === item.href.replace("#", "")
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                    : "text-foreground/70 hover:text-foreground hover:bg-white/60"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* CTA Buttons - Desktop */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/login"
              className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-foreground/70 hover:text-primary transition-all duration-300 rounded-full hover:bg-primary/5"
            >
              <User className="h-4 w-4" />
              Login
            </Link>
            <Button asChild size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6 shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5">
              <Link href="#contact">Projekt anfragen</Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="h-11 w-11 glass-subtle rounded-xl transition-all duration-300 hover:scale-105">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-80 p-0 glass-strong border-l-0">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <div className="flex flex-col h-full">
                <div className="flex items-center p-5 border-b border-primary/10">
                  <Link href="/" className="flex items-center">
                    <PrimeCPPLogo />
                  </Link>
                </div>
                <nav className="flex-1 overflow-y-auto p-5">
                  <div className="flex flex-col gap-2">
                    {navItems.map((item, index) => (
                      <SheetClose key={item.href} asChild>
                        <Link
                          href={item.href}
                          className="flex items-center gap-3 px-4 py-3.5 text-base font-medium text-foreground hover:bg-primary/10 hover:text-primary rounded-xl transition-all duration-300 animate-slide-in-right"
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          {item.label}
                        </Link>
                      </SheetClose>
                    ))}
                    <div className="h-px bg-primary/10 my-2" />
                    <SheetClose asChild>
                      <Link
                        href="/login"
                        className="flex items-center gap-3 px-4 py-3.5 text-base font-medium text-primary hover:bg-primary/10 rounded-xl transition-all duration-300"
                      >
                        <User className="h-5 w-5" />
                        Kundenbereich
                      </Link>
                    </SheetClose>
                  </div>
                </nav>
                <div className="p-5 border-t border-primary/10">
                  <SheetClose asChild>
                    <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl py-6">
                      <Link href="#contact">Projekt anfragen</Link>
                    </Button>
                  </SheetClose>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </header>
  )
}
