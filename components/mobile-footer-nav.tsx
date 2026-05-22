"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { 
  LayoutDashboard, 
  FileText, 
  ShoppingBag, 
  FileCheck,
  User
} from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Home" },
  { href: "/dashboard/requests", icon: FileText, label: "Anfragen" },
  { href: "/dashboard/orders", icon: ShoppingBag, label: "Auftrage" },
  { href: "/dashboard/offers", icon: FileCheck, label: "Angebote" },
  { href: "/dashboard/profile", icon: User, label: "Profil" },
]

export function MobileFooterNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
      {/* Liquid Glass Container */}
      <div className="mx-3 mb-3">
        <div 
          className={cn(
            "relative overflow-hidden rounded-2xl",
            // Glass effect base
            "bg-white/70 dark:bg-gray-900/70",
            // Backdrop blur for frosted glass effect
            "backdrop-blur-xl backdrop-saturate-150",
            // Subtle border with gradient-like glow
            "border border-white/40 dark:border-white/10",
            // Soft shadow for floating effect
            "shadow-lg shadow-black/5",
            // Inner highlight for depth
            "before:absolute before:inset-0 before:rounded-2xl before:pointer-events-none",
            "before:bg-gradient-to-b before:from-white/50 before:to-transparent before:opacity-60",
          )}
        >
          {/* Inner glow effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none" />
          
          {/* Navigation Items */}
          <div className="relative flex items-center justify-around px-2 py-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href || 
                (item.href !== "/dashboard" && pathname.startsWith(item.href))
              const Icon = item.icon

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative flex flex-col items-center justify-center",
                    "w-16 py-2 rounded-xl",
                    "transition-all duration-300 ease-out",
                    // Tap state
                    "active:scale-95",
                    // Active vs inactive states
                    isActive ? [
                      "text-[#007be4]",
                    ] : [
                      "text-gray-500",
                      "hover:text-gray-700 dark:hover:text-gray-300",
                    ]
                  )}
                >
                  {/* Active indicator - pill background */}
                  {isActive && (
                    <div 
                      className={cn(
                        "absolute inset-1 rounded-xl",
                        "bg-[#007be4]/10",
                        "transition-all duration-300",
                      )}
                    />
                  )}
                  
                  {/* Icon with subtle animation */}
                  <div className={cn(
                    "relative z-10 transition-transform duration-300",
                    isActive && "scale-110"
                  )}>
                    <Icon 
                      className={cn(
                        "h-5 w-5 transition-all duration-300",
                        isActive ? "stroke-[2.5px]" : "stroke-[1.5px]"
                      )} 
                    />
                  </div>
                  
                  {/* Label */}
                  <span className={cn(
                    "relative z-10 mt-1 text-[10px] font-medium",
                    "transition-all duration-300",
                    isActive ? "opacity-100" : "opacity-70"
                  )}>
                    {item.label}
                  </span>

                  {/* Active dot indicator */}
                  {isActive && (
                    <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#007be4]" />
                  )}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
      
      {/* Safe area padding for devices with home indicator */}
      <div className="h-safe-area-inset-bottom bg-transparent" />
    </nav>
  )
}
