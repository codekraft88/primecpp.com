"use client"

import { useRouter, usePathname } from "next/navigation"
import { Users, Shield } from "lucide-react"
import { cn } from "@/lib/utils"
import { createClient } from "@/lib/supabase/client"
import { useEffect, useState } from "react"

export function RoleSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const [isSuperadmin, setIsSuperadmin] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  
  const isAdmin = pathname.startsWith("/admin")
  const isClient = pathname.startsWith("/dashboard")

  useEffect(() => {
    const checkRole = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        setIsLoading(false)
        return
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single()

      setIsSuperadmin(profile?.role === "superadmin")
      setIsLoading(false)
    }

    if (isAdmin || isClient) {
      checkRole()
    } else {
      setIsLoading(false)
    }
  }, [isAdmin, isClient])

  const switchToClient = () => {
    router.push("/dashboard")
  }

  const switchToAdmin = () => {
    router.push("/admin")
  }

  // Don't show for non-dashboard/admin pages
  if (!isAdmin && !isClient) return null
  
  // Don't show while loading or for non-superadmin users
  if (isLoading || !isSuperadmin) return null

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
