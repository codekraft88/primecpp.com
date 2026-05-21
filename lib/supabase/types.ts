// Database types for Supabase tables

export interface Profile {
  id: string
  email: string
  full_name: string | null
  company: string | null
  phone: string | null
  role: 'client' | 'admin' | 'superadmin'
  avatar_url: string | null
  created_at: string
  updated_at: string
}

export interface Service {
  id: string
  name: string
  slug: string
  description: string | null
  category: 'seo' | 'content' | 'production' | 'marketing' | 'web'
  base_price: number | null
  is_active: boolean
  created_at: string
}

export interface Request {
  id: string
  user_id: string
  service_id: string | null
  service_name: string
  project_name: string | null
  description: string | null
  budget: string | null
  timeline: string | null
  status: 'pending' | 'in_review' | 'offer_sent' | 'completed' | 'cancelled'
  files: Array<{ name: string; url: string }> | null
  created_at: string
  updated_at: string
}

export interface Offer {
  id: string
  request_id: string | null
  user_id: string
  title: string
  description: string | null
  items: Array<{ name: string; description: string; price: number }>
  total_amount: number
  valid_until: string
  status: 'pending' | 'accepted' | 'declined' | 'expired'
  created_by: string | null
  created_at: string
  updated_at: string
}

export interface Order {
  id: string
  offer_id: string | null
  user_id: string
  order_number: string
  service_name: string
  status: 'pending' | 'in_progress' | 'review' | 'completed' | 'cancelled'
  progress: number
  amount: number
  start_date: string | null
  expected_completion: string | null
  completed_at: string | null
  notes: string | null
  assigned_to: string | null
  created_at: string
  updated_at: string
}

export interface Invoice {
  id: string
  order_id: string | null
  user_id: string
  invoice_number: string
  amount: number
  tax_amount: number
  total_amount: number
  status: 'draft' | 'open' | 'paid' | 'overdue' | 'cancelled'
  due_date: string
  paid_at: string | null
  pdf_url: string | null
  created_at: string
}

export interface Payment {
  id: string
  invoice_id: string | null
  user_id: string
  amount: number
  method: 'bank_transfer' | 'credit_card' | 'paypal' | 'stripe' | null
  status: 'pending' | 'completed' | 'failed' | 'refunded'
  transaction_id: string | null
  created_at: string
}

export interface Report {
  id: string
  order_id: string | null
  user_id: string
  title: string
  type: 'seo' | 'audit' | 'backlinks' | 'ugc' | 'general'
  summary: string | null
  data: Record<string, unknown>
  file_url: string | null
  status: 'new' | 'viewed' | 'archived'
  created_at: string
}

export interface SupportTicket {
  id: string
  user_id: string
  subject: string
  message: string
  category: 'general' | 'technical' | 'billing' | 'feedback'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  status: 'open' | 'in_progress' | 'resolved' | 'closed'
  assigned_to: string | null
  created_at: string
  updated_at: string
}

export interface TicketMessage {
  id: string
  ticket_id: string
  user_id: string
  message: string
  is_admin: boolean
  created_at: string
}

export interface ActivityLog {
  id: string
  user_id: string | null
  action: string
  entity_type: string
  entity_id: string | null
  metadata: Record<string, unknown>
  created_at: string
}

// Dashboard stats type
export interface DashboardStats {
  openRequests: number
  pendingOffers: number
  activeOrders: number
  openInvoices: number
  newReports: number
}
