import Link from "next/link"
import {
  FileQuestion,
  FileCheck,
  CreditCard,
  Briefcase,
  TrendingUp,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  Clock,
  Users,
  CheckCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Mock data
const stats = {
  newRequests: 3,
  openOffers: 2,
  pendingPayments: 1,
  activeOrders: 5,
  monthlyRevenue: "CHF 8.450",
  overdueInvoices: 0,
  openSupportTickets: 2,
}

const recentRequests = [
  {
    id: "REQ-010",
    client: "Tech Solutions AG",
    service: "Page Audit",
    date: "Heute, 14:32",
    status: "new",
  },
  {
    id: "REQ-009",
    client: "Muster AG",
    service: "UGC Videos",
    date: "Heute, 10:15",
    status: "new",
  },
  {
    id: "REQ-008",
    client: "Digital GmbH",
    service: "SEO Texte",
    date: "Gestern, 16:45",
    status: "in-review",
  },
]

const pendingOffers = [
  {
    id: "OFF-015",
    client: "Muster AG",
    service: "SEO Text Professional",
    amount: "CHF 490",
    sentDate: "27. April 2026",
    validUntil: "10. Mai 2026",
  },
  {
    id: "OFF-014",
    client: "Tech Solutions AG",
    service: "Backlink Check",
    amount: "CHF 490",
    sentDate: "25. April 2026",
    validUntil: "8. Mai 2026",
  },
]

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Übersicht aller Anfragen, Angebote und Aufträge
          </p>
        </div>
        <div className="flex gap-3">
          <Button asChild variant="outline">
            <Link href="/admin/clients">
              <Users className="h-4 w-4 mr-2" />
              Kunden
            </Link>
          </Button>
          <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/admin/requests">
              Neue Anfragen
              <Badge className="ml-2 bg-white/20">{stats.newRequests}</Badge>
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <Link href="/admin/requests">
          <Card className="hover:border-rose-500/50 transition-colors cursor-pointer">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <FileQuestion className="h-5 w-5 text-muted-foreground" />
                {stats.newRequests > 0 && (
                  <Badge className="bg-rose-500/10 text-rose-600 border-rose-500/20">
                    {stats.newRequests}
                  </Badge>
                )}
              </div>
              <p className="text-2xl font-bold">{stats.newRequests}</p>
              <p className="text-sm text-muted-foreground">Neue Anfragen</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/offers">
          <Card className="hover:border-amber-500/50 transition-colors cursor-pointer">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <FileCheck className="h-5 w-5 text-muted-foreground" />
                {stats.openOffers > 0 && (
                  <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20">
                    {stats.openOffers}
                  </Badge>
                )}
              </div>
              <p className="text-2xl font-bold">{stats.openOffers}</p>
              <p className="text-sm text-muted-foreground">Angebote offen</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/payments">
          <Card className="hover:border-blue-500/50 transition-colors cursor-pointer">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <CreditCard className="h-5 w-5 text-muted-foreground" />
                {stats.pendingPayments > 0 && (
                  <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/20">
                    {stats.pendingPayments}
                  </Badge>
                )}
              </div>
              <p className="text-2xl font-bold">{stats.pendingPayments}</p>
              <p className="text-sm text-muted-foreground">Zahlungen ausstehend</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/orders">
          <Card className="hover:border-emerald-500/50 transition-colors cursor-pointer">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <Briefcase className="h-5 w-5 text-muted-foreground" />
                <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Aktiv
                </Badge>
              </div>
              <p className="text-2xl font-bold">{stats.activeOrders}</p>
              <p className="text-sm text-muted-foreground">Aktive Aufträge</p>
            </CardContent>
          </Card>
        </Link>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="text-2xl font-bold">{stats.monthlyRevenue}</p>
            <p className="text-sm text-muted-foreground">Monatsumsatz</p>
          </CardContent>
        </Card>

        <Link href="/admin/invoices">
          <Card className="hover:border-primary/50 transition-colors cursor-pointer">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <AlertCircle className="h-5 w-5 text-muted-foreground" />
                {stats.overdueInvoices > 0 && (
                  <Badge className="bg-rose-500/10 text-rose-600 border-rose-500/20">
                    {stats.overdueInvoices}
                  </Badge>
                )}
              </div>
              <p className="text-2xl font-bold">{stats.overdueInvoices}</p>
              <p className="text-sm text-muted-foreground">Überfällige Rechnungen</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/support">
          <Card className="hover:border-violet-500/50 transition-colors cursor-pointer">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <HelpCircle className="h-5 w-5 text-muted-foreground" />
                {stats.openSupportTickets > 0 && (
                  <Badge className="bg-violet-500/10 text-violet-600 border-violet-500/20">
                    {stats.openSupportTickets}
                  </Badge>
                )}
              </div>
              <p className="text-2xl font-bold">{stats.openSupportTickets}</p>
              <p className="text-sm text-muted-foreground">Support-Tickets</p>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Requests */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Neue Anfragen</CardTitle>
                <CardDescription>Zuletzt eingegangene Anfragen</CardDescription>
              </div>
              <Button asChild variant="ghost" size="sm">
                <Link href="/admin/requests">
                  Alle anzeigen
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentRequests.map((request) => (
                <div
                  key={request.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-muted/30 border"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      request.status === "new" ? "bg-rose-500" : "bg-amber-500"
                    }`} />
                    <div>
                      <p className="font-medium text-sm">{request.client}</p>
                      <p className="text-xs text-muted-foreground">{request.service}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground">{request.date}</span>
                    <Button asChild variant="ghost" size="sm">
                      <Link href={`/admin/requests/${request.id}`}>
                        Prüfen
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pending Offers */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Offene Angebote</CardTitle>
                <CardDescription>Warten auf Kundenfreigabe</CardDescription>
              </div>
              <Button asChild variant="ghost" size="sm">
                <Link href="/admin/offers">
                  Alle anzeigen
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingOffers.map((offer) => (
                <div
                  key={offer.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-muted/30 border"
                >
                  <div>
                    <p className="font-medium text-sm">{offer.client}</p>
                    <p className="text-xs text-muted-foreground">{offer.service}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-sm">{offer.amount}</p>
                    <p className="text-xs text-muted-foreground flex items-center justify-end gap-1">
                      <Clock className="h-3 w-3" />
                      Bis {offer.validUntil}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Schnellaktionen</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button asChild variant="outline" className="h-auto py-4 flex-col gap-2">
              <Link href="/admin/requests">
                <FileQuestion className="h-5 w-5" />
                <span className="text-sm">Anfragen prüfen</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-auto py-4 flex-col gap-2">
              <Link href="/admin/offers/new">
                <FileCheck className="h-5 w-5" />
                <span className="text-sm">Angebot erstellen</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-auto py-4 flex-col gap-2">
              <Link href="/admin/reports/new">
                <TrendingUp className="h-5 w-5" />
                <span className="text-sm">Report hochladen</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-auto py-4 flex-col gap-2">
              <Link href="/admin/clients">
                <Users className="h-5 w-5" />
                <span className="text-sm">Kunden verwalten</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
