"use client"

import { useRouter, usePathname } from "next/navigation"
import { Users, Shield } from "lucide-react"
import { cn } from "@/lib/utils"

export function RoleSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  
  const isAdmin = pathname.startsWith("/admin")
  const isClient = pathname.startsWith("/dashboard")

  const switchToClient = () => {
    router.push("/dashboard")
  }

  const switchToAdmin = () => {
    router.push("/admin")
  }

  if (!isAdmin && !isClient) return null

  return (
    <div className="fixed bottom-4 left-4 z-[90] bg-white rounded-2xl shadow-xl border border-gray-200 p-1.5 flex gap-1">
      <button
        onClick={switchToClient}
        className={cn(
          "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all",
          isClient
            ? "bg-[#007be4] text-white shadow-md"
            : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
        )}
      >
        <Users className="h-4 w-4" />
        <span>Client</span>
      </button>
      <button
        onClick={switchToAdmin}
        className={cn(
          "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all",
          isAdmin
            ? "bg-[#007be4] text-white shadow-md"
            : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
        )}
      >
        <Shield className="h-4 w-4" />
        <span>Superadmin</span>
      </button>
    </div>
  )
}
