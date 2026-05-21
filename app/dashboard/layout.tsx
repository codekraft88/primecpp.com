"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import Image from "next/image"
import {
  LayoutDashboard,
  ShoppingCart,
  FileQuestion,
  FileCheck,
  Briefcase,
  FileText,
  CreditCard,
  BarChart3,
  User,
  HelpCircle,
  LogOut,
  Menu,
  ChevronDown,
  Coins,
  FileSearch,
  Link2,
  Video,
  Settings,
  Bell,
  Search,
  Loader2,
  Shield,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { createClient } from "@/lib/supabase/client"

const navGroups = [
  {
    label: "Hauptbereich",
    items: [
      { href: "/dashboard", label: "Ubersicht", icon: LayoutDashboard },
      { href: "/dashboard/new-order", label: "Neue Bestellung", icon: ShoppingCart, highlight: true },
      { href: "/dashboard/requests", label: "Meine Anfragen", icon: FileQuestion },
      { href: "/dashboard/offers", label: "Angebote", icon: FileCheck },
      { href: "/dashboard/orders", label: "Aktive Auftrage", icon: Briefcase },
    ]
  },
  {
    label: "Leistungen",
    items: [
      { href: "/dashboard/seo-texts", label: "SEO Texte", icon: FileText },
      { href: "/dashboard/audits", label: "Audits", icon: FileSearch },
      { href: "/dashboard/backlinks", label: "Backlinks", icon: Link2 },
      { href: "/dashboard/ugc-videos", label: "UGC Videos", icon: Video },
    ]
  },
  {
    label: "Finanzen",
    items: [
      { href: "/dashboard/credits", label: "Credits", icon: Coins, comingSoon: true },
      { href: "/dashboard/invoices", label: "Rechnungen", icon: FileText },
      { href: "/dashboard/payments", label: "Zahlungen", icon: CreditCard },
    ]
  },
  {
    label: "Account",
    items: [
      { href: "/dashboard/reports", label: "Reports", icon: BarChart3 },
      { href: "/dashboard/support", label: "Support", icon: HelpCircle },
      { href: "/dashboard/profile", label: "Profil", icon: User },
    ]
  },
]

function Logo() {
  return (
    <Link href="/" className="flex items-center group">
      <Image 
        src="/logo-blau.png" 
        alt="prime CPP" 
        width={140} 
        height={36} 
        className="h-9 w-auto transition-transform group-hover:scale-105"
        priority
      />
    </Link>
  )
}

type NavItem = {
  href: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  highlight?: boolean
  badge?: number
  actionBadge?: boolean
  comingSoon?: boolean
}

function NavLink({
  item,
  isActive,
  onClick,
}: {
  item: NavItem
  isActive: boolean
  onClick?: () => void
}) {
  const Icon = item.icon

  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={cn(
        "flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200",
        isActive
          ? "bg-[#007be4] text-white shadow-md shadow-[#007be4]/20"
          : item.highlight
          ? "text-[#007be4] bg-[#007be4]/5 hover:bg-[#007be4]/10"
          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
      )}
    >
      <div className="flex items-center gap-3">
        <Icon className="h-4 w-4" />
        <span>{item.label}</span>
      </div>
      <div className="flex items-center gap-2">
        {item.badge && item.badge > 0 && (
          <span className={cn(
            "flex items-center justify-center h-5 min-w-[20px] px-1.5 text-[10px] font-semibold rounded-full",
            isActive 
              ? "bg-white/20 text-white" 
              : item.actionBadge
              ? "bg-amber-100 text-amber-700"
              : "bg-[#007be4] text-white"
          )}>
            {item.badge}
          </span>
        )}
        {item.comingSoon && (
          <span className="text-[10px] text-gray-400 font-medium bg-gray-100 px-1.5 py-0.5 rounded">Bald</span>
        )}
      </div>
    </Link>
  )
}

interface UserProfile {
  id: string
  email: string
  full_name: string | null
  company: string | null
  role: string
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [user, setUser] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient()
      const { data: { user: authUser }, error: authError } = await supabase.auth.getUser()
      
      if (!authUser) {
        router.push("/login")
        return
      }

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", authUser.id)
        .single()

      if (profileError) {
        // If profile doesn't exist, create a basic one from auth metadata
        if (profileError.code === "PGRST116") {
          setUser({
            id: authUser.id,
            email: authUser.email || "",
            full_name: authUser.user_metadata?.full_name || null,
            company: authUser.user_metadata?.company || null,
            role: authUser.user_metadata?.role || "client"
          })
        }
      } else if (profile) {
        setUser(profile)
      }
      setIsLoading(false)
    }

    fetchUser()
  }, [router])

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/")
  }

  const getInitials = (name: string | null, email: string) => {
    if (name) {
      const parts = name.split(" ")
      return parts.length >= 2 
        ? `${parts[0][0]}${parts[1][0]}`.toUpperCase()
        : parts[0].slice(0, 2).toUpperCase()
    }
    return email.slice(0, 2).toUpperCase()
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#007be4]" />
      </div>
    )
  }

  const displayName = user?.full_name || user?.email || "Benutzer"
  const displayEmail = user?.email || ""
  const initials = getInitials(user?.full_name || null, displayEmail)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col h-full bg-white border-r border-gray-200">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-5 border-b border-gray-100 shrink-0">
            <Logo />
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-6 overflow-y-auto min-h-0">
            {navGroups.map((group, groupIndex) => (
              <div key={groupIndex}>
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">
                  {group.label}
                </p>
                <div className="space-y-1">
                  {group.items.map((item) => (
                    <NavLink
                      key={item.href}
                      item={item}
                      isActive={pathname === item.href}
                    />
                  ))}
                </div>
              </div>
            ))}
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-gray-100 shrink-0">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-3 w-full p-2.5 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#007be4] to-[#00a8ff] flex items-center justify-center shadow-md shadow-[#007be4]/20">
                    <span className="text-[11px] font-bold text-white">{initials}</span>
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <p className="text-[13px] font-semibold text-gray-900 truncate">{displayName}</p>
                    <p className="text-[11px] text-gray-500 truncate">{displayEmail}</p>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/profile">
                    <User className="mr-2 h-4 w-4" />
                    Profil
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    Einstellungen
                  </Link>
                </DropdownMenuItem>
                {user?.role === 'superadmin' && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/admin" className="text-rose-600 focus:text-rose-600">
                        <Shield className="mr-2 h-4 w-4" />
                        Admin Dashboard
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="text-red-600 focus:text-red-600 cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  Abmelden
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </aside>

      {/* Top Header Bar */}
      <header className="lg:pl-64 fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200">
        <div className="flex items-center justify-between h-16 px-4 lg:px-6">
          {/* Mobile Logo */}
          <div className="flex items-center gap-3 lg:hidden">
            <Logo />
          </div>

          {/* Breadcrumb / Page Title (Desktop) */}
          <div className="hidden lg:flex items-center">
            <nav className="flex items-center gap-2 text-sm">
              <Link href="/dashboard" className="text-gray-500 hover:text-gray-700 transition-colors">
                Dashboard
              </Link>
              <span className="text-gray-300">/</span>
              <span className="text-gray-900 font-medium">Ubersicht</span>
            </nav>
          </div>

          {/* Search */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Suchen..."
                className="w-full pl-9 h-10 bg-gray-50 border-gray-200 text-sm placeholder:text-gray-400 focus:border-[#007be4] focus:ring-[#007be4]/20 rounded-xl"
              />
              <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-flex h-5 items-center gap-1 rounded-md border border-gray-200 bg-gray-50 px-1.5 font-mono text-[10px] font-medium text-gray-400">
                <span className="text-[10px]">cmd</span>K
              </kbd>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-10 w-10 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-xl relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-[#007be4] rounded-full" />
            </Button>
            <Button variant="ghost" size="icon" asChild className="h-10 w-10 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-xl">
              <Link href="/dashboard/settings">
                <Settings className="h-5 w-5" />
              </Link>
            </Button>
            
            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden h-10 w-10 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-xl">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 p-0 bg-white">
                <SheetTitle className="sr-only">Navigation</SheetTitle>
                <div className="flex flex-col h-full">
                  <div className="flex items-center h-16 px-5 border-b border-gray-100">
                    <Logo />
                  </div>
                  <nav className="flex-1 px-3 py-4 space-y-6 overflow-y-auto">
                    {navGroups.map((group, groupIndex) => (
                      <div key={groupIndex}>
                        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">
                          {group.label}
                        </p>
                        <div className="space-y-1">
                          {group.items.map((item) => (
                            <NavLink
                              key={item.href}
                              item={item}
                              isActive={pathname === item.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </nav>
                  {/* Mobile User Section */}
                  <div className="p-4 border-t border-gray-100">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#007be4] to-[#00a8ff] flex items-center justify-center">
                        <span className="text-xs font-bold text-white">{initials}</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{displayName}</p>
                        <p className="text-xs text-gray-500">{displayEmail}</p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full text-red-600 border-red-200 hover:bg-red-50"
                      onClick={handleSignOut}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Abmelden
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            {/* Desktop User Avatar */}
            <div className="hidden lg:block">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="w-10 h-10 rounded-full bg-gradient-to-br from-[#007be4] to-[#00a8ff] flex items-center justify-center shadow-md shadow-[#007be4]/20 hover:shadow-lg transition-shadow">
                    <span className="text-[11px] font-bold text-white">{initials}</span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-3 py-2 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-900">{displayName}</p>
                    <p className="text-xs text-gray-500">{displayEmail}</p>
                  </div>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/profile">
                      <User className="mr-2 h-4 w-4" />
                      Profil
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/settings">
                      <Settings className="mr-2 h-4 w-4" />
                      Einstellungen
                    </Link>
                  </DropdownMenuItem>
                  {user?.role === 'superadmin' && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/admin" className="text-rose-600 focus:text-rose-600">
                          <Shield className="mr-2 h-4 w-4" />
                          Admin Dashboard
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="text-red-600 focus:text-red-600 cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    Abmelden
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="lg:pl-64 pt-16">
        <div className="p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
