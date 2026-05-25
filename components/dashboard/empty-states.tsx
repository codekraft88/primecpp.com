import Link from "next/link"
import { 
  FileQuestion, 
  FileCheck, 
  Briefcase, 
  FileText, 
  CreditCard, 
  BarChart3,
  HelpCircle,
  Plus,
  type LucideIcon
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  actionLabel?: string
  actionHref?: string
}

export function EmptyState({ icon: Icon, title, description, actionLabel, actionHref }: EmptyStateProps) {
  return (
    <div className="rounded-2xl bg-white border-2 border-dashed border-gray-200 p-12 text-center">
      <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
        <Icon className="h-8 w-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <p className="text-gray-500 mt-2 max-w-sm mx-auto">{description}</p>
      {actionLabel && actionHref && (
        <Button asChild className="mt-6 bg-[#007be4] hover:bg-[#0066c2] h-11 px-5 rounded-xl">
          <Link href={actionHref}>
            <Plus className="mr-2 h-4 w-4" />
            {actionLabel}
          </Link>
        </Button>
      )}
    </div>
  )
}

// Pre-configured empty states for each section
export function EmptyRequests() {
  return (
    <EmptyState
      icon={FileQuestion}
      title="Noch keine Anfragen"
      description="Stellen Sie Ihre erste Anfrage und erhalten Sie ein unverbindliches Angebot."
      actionLabel="Neue Anfrage"
      actionHref="/dashboard/new-order"
    />
  )
}

export function EmptyOffers() {
  return (
    <EmptyState
      icon={FileCheck}
      title="Noch keine Angebote"
      description="Sobald Sie eine Anfrage eingereicht haben, erhalten Sie hier Ihre Angebote."
      actionLabel="Anfrage stellen"
      actionHref="/dashboard/new-order"
    />
  )
}

export function EmptyOrders() {
  return (
    <EmptyState
      icon={Briefcase}
      title="Noch keine aktiven Auftrage"
      description="Sobald ein Angebot angenommen und bezahlt wurde, erscheint der Auftrag hier."
      actionLabel="Neue Bestellung"
      actionHref="/dashboard/new-order"
    />
  )
}

export function EmptyInvoices() {
  return (
    <EmptyState
      icon={CreditCard}
      title="Noch keine Rechnungen"
      description="Hier erscheinen alle Rechnungen zu Ihren Auftragen."
    />
  )
}

export function EmptyReports() {
  return (
    <EmptyState
      icon={BarChart3}
      title="Noch keine Reports"
      description="Reports zu Ihren abgeschlossenen Auftragen werden hier angezeigt."
    />
  )
}

export function EmptySupportTickets() {
  return (
    <EmptyState
      icon={HelpCircle}
      title="Noch keine Support-Anfragen"
      description="Haben Sie Fragen oder benotigen Hilfe? Kontaktieren Sie uns."
      actionLabel="Support kontaktieren"
      actionHref="/dashboard/support/new"
    />
  )
}

export function EmptyDashboard() {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 p-8 text-center">
      <div className="w-20 h-20 rounded-2xl bg-white shadow-sm flex items-center justify-center mx-auto mb-6">
        <FileText className="h-10 w-10 text-[#007be4]" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900">Willkommen bei prime CPP</h3>
      <p className="text-gray-600 mt-3 max-w-md mx-auto leading-relaxed">
        Ihr Dashboard ist bereit. Starten Sie mit Ihrer ersten Anfrage und entdecken Sie unsere Services fur SEO, Content und UGC.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
        <Button asChild className="bg-[#007be4] hover:bg-[#0066c2] h-11 px-6 rounded-xl shadow-md shadow-[#007be4]/20">
          <Link href="/dashboard/new-order">
            <Plus className="mr-2 h-4 w-4" />
            Erste Anfrage stellen
          </Link>
        </Button>
        <Button asChild variant="outline" className="h-11 px-6 rounded-xl border-gray-200">
          <Link href="/dashboard/packages">
            Pakete ansehen
          </Link>
        </Button>
      </div>
    </div>
  )
}

// Loading skeleton component
export function DashboardSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="h-8 w-64 bg-gray-200 rounded" />
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="p-5 rounded-2xl bg-white border border-gray-100">
            <div className="w-10 h-10 rounded-xl bg-gray-100 mb-3" />
            <div className="h-8 w-12 bg-gray-200 rounded mb-2" />
            <div className="h-4 w-24 bg-gray-100 rounded" />
          </div>
        ))}
      </div>
      <div className="rounded-2xl bg-white border border-gray-100 p-6">
        <div className="h-6 w-32 bg-gray-200 rounded mb-4" />
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-100 rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  )
}
