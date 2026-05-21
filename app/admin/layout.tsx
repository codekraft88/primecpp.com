"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  LayoutDashboard,
  FileQuestion,
  FileCheck,
  Briefcase,
  Users,
  FileText,
  CreditCard,
  BarChart3,
  HelpCircle,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Coins,
  Shield,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase/client"

const navItems = [
  { href: "/admin", label: "Übersicht", icon: LayoutDashboard },
  { href: "/admin/requests", label: "Neue Anfragen", icon: FileQuestion, badge: 3 },
  { href: "/admin/offers", label: "Angebote", icon: FileCheck, badge: 2 },
  { href: "/admin/orders", label: "Aktive Aufträge", icon: Briefcase },
  { href: "/admin/clients", label: "Kunden", icon: Users },
  { divider: true, label: "Finanzen" },
  { href: "/admin/invoices", label: "Rechnungen", icon: FileText },
  { href: "/admin/payments", label: "Zahlungen", icon: CreditCard },
  { href: "/admin/credits", label: "Credits verwalten", icon: Coins, comingSoon: true },
  { divider: true, label: "Mehr" },
  { href: "/admin/reports", label: "Reports", icon: BarChart3 },
  { href: "/admin/support", label: "Support", icon: HelpCircle, badge: 2 },
  { href: "/admin/settings", label: "Einstellungen", icon: Settings },
  { href: "/admin/qa", label: "Systemprüfung", icon: Shield },
]

function NavLink({
  item,
  isActive,
  onClick,
}: {
  item: typeof navItems[number]
  isActive: boolean
  onClick?: () => void
}) {
  if ('divider' in item && item.divider) {
    return (
      <div className="pt-4 pb-2">
        <span className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {item.label}
        </span>
      </div>
    )
  }

  const Icon = item.icon!

  return (
    <Link
      href={item.href!}
      onClick={onClick}
      className={cn(
        "flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all",
        isActive
          ? "bg-primary text-primary-foreground shadow-sm"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
    >
      <div className="flex items-center gap-3">
        <Icon className="h-4 w-4" />
        <span>{item.label}</span>
      </div>
      <div className="flex items-center gap-2">
        {item.badge && (
          <Badge variant="secondary" className="h-5 min-w-[20px] px-1.5 text-xs bg-rose-500/20 text-rose-600">
            {item.badge}
          </Badge>
        )}
        {item.comingSoon && (
          <Badge variant="outline" className="h-5 px-1.5 text-[10px] text-muted-foreground">
            Soon
          </Badge>
        )}
      </div>
    </Link>
  )
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAdmin = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push('/login')
        return
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

      if (!profile || profile.role !== 'superadmin') {
        router.push('/dashboard')
        return
      }

      setIsAuthorized(true)
      setIsLoading(false)
    }

    checkAdmin()
  }, [router])

  if (isLoading || !isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:w-72 lg:flex-col">
        <div className="flex flex-col flex-1 bg-card border-r border-border">
          {/* Logo */}
          <div className="flex items-center h-16 px-6 border-b border-border">
            <Link href="/admin" className="flex items-center">
              <span className="text-xl font-bold tracking-tight text-foreground">prime</span>
              <span className="text-xl font-bold tracking-tight text-primary ml-1">CPP</span>
            </Link>
            <Badge className="ml-3 bg-rose-500/10 text-rose-600 border-rose-500/20">
              <Shield className="h-3 w-3 mr-1" />
              Admin
            </Badge>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
            {navItems.map((item, index) => (
              <NavLink
                key={item.href || `divider-${index}`}
                item={item}
                isActive={pathname === item.href}
              />
            ))}
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
              <div className="w-10 h-10 rounded-full bg-rose-500/10 flex items-center justify-center">
                <Shield className="h-5 w-5 text-rose-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">Admin</p>
                <p className="text-xs text-muted-foreground truncate">admin@primecpp.ch</p>
              </div>
            </div>
            <Button variant="ghost" className="w-full mt-2 text-muted-foreground hover:text-foreground" asChild>
              <Link href="/">
                <LogOut className="mr-2 h-4 w-4" />
                Abmelden
              </Link>
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-card border-b border-border">
        <div className="flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-2">
            <Link href="/admin" className="flex items-center">
              <span className="text-xl font-bold tracking-tight text-foreground">prime</span>
              <span className="text-xl font-bold tracking-tight text-primary ml-1">CPP</span>
            </Link>
            <Badge className="bg-rose-500/10 text-rose-600 border-rose-500/20 text-xs">
              Admin
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 p-0">
                <SheetTitle className="sr-only">Admin Navigation</SheetTitle>
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between p-4 border-b border-border">
                    <span className="font-semibold text-foreground">Admin Menu</span>
                    <SheetClose asChild>
                      <Button variant="ghost" size="icon">
                        <X className="h-5 w-5" />
                      </Button>
                    </SheetClose>
                  </div>
                  <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
                    {navItems.map((item, index) => (
                      <NavLink
                        key={item.href || `divider-mobile-${index}`}
                        item={item}
                        isActive={pathname === item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                      />
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="lg:pl-72 pt-16 lg:pt-0">
        <div className="p-4 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
