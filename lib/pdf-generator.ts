import { jsPDF } from "jspdf"

interface InvoiceData {
  invoice_number: string
  created_at: string
  due_date: string
  total_amount: number
  status: string
  items?: Array<{
    description: string
    quantity: number
    unit_price: number
    total: number
  }>
}

interface ReportData {
  title: string
  type: string
  created_at: string
  summary?: string
  content?: string
}

function formatDateDE(dateString: string): string {
  return new Date(dateString).toLocaleDateString('de-CH', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

function formatCurrency(amount: number): string {
  return `CHF ${amount.toLocaleString('de-CH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

export function generateInvoicePDF(invoice: InvoiceData): void {
  const doc = new jsPDF()
  
  // Company header
  doc.setFontSize(24)
  doc.setTextColor(0, 123, 228) // #007be4
  doc.text("prime CPP", 20, 25)
  
  doc.setFontSize(10)
  doc.setTextColor(100, 100, 100)
  doc.text("prime CPP GmbH", 20, 35)
  doc.text("Baarerstrasse 21", 20, 40)
  doc.text("6300 Zug, Schweiz", 20, 45)
  doc.text("info@primecpp.com", 20, 50)
  doc.text("+41 41 552 22 40", 20, 55)
  
  // Invoice title
  doc.setFontSize(20)
  doc.setTextColor(30, 30, 30)
  doc.text("RECHNUNG", 140, 25)
  
  // Invoice details
  doc.setFontSize(10)
  doc.setTextColor(80, 80, 80)
  doc.text(`Rechnungsnummer:`, 140, 40)
  doc.setTextColor(30, 30, 30)
  doc.text(invoice.invoice_number, 180, 40)
  
  doc.setTextColor(80, 80, 80)
  doc.text(`Rechnungsdatum:`, 140, 47)
  doc.setTextColor(30, 30, 30)
  doc.text(formatDateDE(invoice.created_at), 180, 47)
  
  doc.setTextColor(80, 80, 80)
  doc.text(`Falligkeitsdatum:`, 140, 54)
  doc.setTextColor(30, 30, 30)
  doc.text(formatDateDE(invoice.due_date), 180, 54)
  
  // Separator line
  doc.setDrawColor(220, 220, 220)
  doc.line(20, 70, 190, 70)
  
  // Table header
  const tableTop = 85
  doc.setFillColor(245, 247, 250)
  doc.rect(20, tableTop - 7, 170, 10, 'F')
  
  doc.setFontSize(9)
  doc.setTextColor(80, 80, 80)
  doc.text("Beschreibung", 25, tableTop)
  doc.text("Menge", 120, tableTop)
  doc.text("Einzelpreis", 140, tableTop)
  doc.text("Gesamt", 170, tableTop)
  
  // Table content
  let yPos = tableTop + 15
  doc.setTextColor(30, 30, 30)
  
  if (invoice.items && invoice.items.length > 0) {
    invoice.items.forEach((item) => {
      doc.text(item.description, 25, yPos)
      doc.text(item.quantity.toString(), 125, yPos)
      doc.text(formatCurrency(item.unit_price), 140, yPos)
      doc.text(formatCurrency(item.total), 170, yPos)
      yPos += 10
    })
  } else {
    // Default item if no items provided
    doc.text("Dienstleistung", 25, yPos)
    doc.text("1", 125, yPos)
    doc.text(formatCurrency(invoice.total_amount), 140, yPos)
    doc.text(formatCurrency(invoice.total_amount), 170, yPos)
    yPos += 10
  }
  
  // Total section
  yPos += 10
  doc.setDrawColor(220, 220, 220)
  doc.line(120, yPos, 190, yPos)
  yPos += 10
  
  doc.setFontSize(10)
  doc.setTextColor(80, 80, 80)
  doc.text("Zwischensumme:", 120, yPos)
  doc.setTextColor(30, 30, 30)
  doc.text(formatCurrency(invoice.total_amount), 170, yPos)
  
  yPos += 8
  doc.setTextColor(80, 80, 80)
  doc.text("MwSt. (8.1%):", 120, yPos)
  const mwst = invoice.total_amount * 0.081
  doc.setTextColor(30, 30, 30)
  doc.text(formatCurrency(mwst), 170, yPos)
  
  yPos += 12
  doc.setFillColor(0, 123, 228)
  doc.rect(115, yPos - 7, 75, 12, 'F')
  doc.setFontSize(11)
  doc.setTextColor(255, 255, 255)
  doc.text("Gesamtbetrag:", 120, yPos)
  doc.text(formatCurrency(invoice.total_amount + mwst), 170, yPos)
  
  // Payment info
  yPos += 30
  doc.setFontSize(10)
  doc.setTextColor(30, 30, 30)
  doc.text("Zahlungsinformationen", 20, yPos)
  yPos += 8
  doc.setFontSize(9)
  doc.setTextColor(80, 80, 80)
  doc.text("Bank: Zuger Kantonalbank", 20, yPos)
  yPos += 5
  doc.text("IBAN: CH93 0078 7000 0000 0000 0", 20, yPos)
  yPos += 5
  doc.text("BIC: ZKBKCHZZ80A", 20, yPos)
  yPos += 5
  doc.text(`Referenz: ${invoice.invoice_number}`, 20, yPos)
  
  // Footer
  doc.setFontSize(8)
  doc.setTextColor(150, 150, 150)
  doc.text("prime CPP GmbH | CHE-000.000.000 | Vielen Dank fur Ihr Vertrauen!", 105, 280, { align: 'center' })
  
  // Download
  doc.save(`Rechnung_${invoice.invoice_number}.pdf`)
}

export function generateReportPDF(report: ReportData): void {
  const doc = new jsPDF()
  
  // Company header
  doc.setFontSize(24)
  doc.setTextColor(0, 123, 228)
  doc.text("prime CPP", 20, 25)
  
  doc.setFontSize(10)
  doc.setTextColor(100, 100, 100)
  doc.text("Digital Marketing & Content Solutions", 20, 33)
  
  // Report type badge
  const typeLabels: Record<string, string> = {
    "seo": "SEO Report",
    "audit": "Page Audit",
    "backlinks": "Backlink Analyse",
    "ugc": "UGC Lieferung",
    "general": "Report",
  }
  const typeLabel = typeLabels[report.type] || "Report"
  
  doc.setFillColor(0, 123, 228)
  doc.roundedRect(140, 18, 50, 10, 2, 2, 'F')
  doc.setFontSize(9)
  doc.setTextColor(255, 255, 255)
  doc.text(typeLabel, 165, 24.5, { align: 'center' })
  
  // Date
  doc.setFontSize(10)
  doc.setTextColor(100, 100, 100)
  doc.text(`Erstellt am ${formatDateDE(report.created_at)}`, 140, 35)
  
  // Separator
  doc.setDrawColor(220, 220, 220)
  doc.line(20, 45, 190, 45)
  
  // Report title
  doc.setFontSize(18)
  doc.setTextColor(30, 30, 30)
  const titleLines = doc.splitTextToSize(report.title, 170)
  doc.text(titleLines, 20, 60)
  
  let yPos = 60 + (titleLines.length * 10) + 10
  
  // Summary
  if (report.summary) {
    doc.setFontSize(11)
    doc.setTextColor(80, 80, 80)
    doc.text("Zusammenfassung", 20, yPos)
    yPos += 8
    
    doc.setFontSize(10)
    doc.setTextColor(60, 60, 60)
    const summaryLines = doc.splitTextToSize(report.summary, 170)
    doc.text(summaryLines, 20, yPos)
    yPos += (summaryLines.length * 6) + 15
  }
  
  // Content placeholder
  doc.setFontSize(11)
  doc.setTextColor(80, 80, 80)
  doc.text("Inhalt", 20, yPos)
  yPos += 10
  
  // Placeholder content box
  doc.setDrawColor(220, 220, 220)
  doc.setFillColor(250, 250, 250)
  doc.roundedRect(20, yPos, 170, 100, 3, 3, 'FD')
  
  doc.setFontSize(10)
  doc.setTextColor(150, 150, 150)
  doc.text("Der vollstandige Report-Inhalt wird in Kurze verfugbar sein.", 105, yPos + 50, { align: 'center' })
  doc.text("Bitte kontaktieren Sie uns bei Fragen.", 105, yPos + 60, { align: 'center' })
  
  // Footer
  doc.setFontSize(8)
  doc.setTextColor(150, 150, 150)
  doc.text("prime CPP GmbH | www.primecpp.com | info@primecpp.com | +41 41 552 22 40", 105, 280, { align: 'center' })
  
  // Download
  const safeTitle = report.title.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 30)
  doc.save(`Report_${safeTitle}.pdf`)
}
