"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Download, Mail, MessageSquare } from "lucide-react"

interface EmailData {
  waitlist: Array<{ id: string; email: string; created_at: string; source_page: string }>
  contacts: Array<{ id: string; name: string; email: string; message: string; created_at: string }>
}

export default function EmailsPage() {
  const [emails, setEmails] = useState<EmailData>({ waitlist: [], contacts: [] })
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetchEmails()
  }, [])

  const fetchEmails = async () => {
    try {
      const response = await fetch("/api/admin/emails")
      if (response.status === 401) {
        router.push("/admin/login")
        return
      }
      const data = await response.json()
      setEmails(data)
    } catch (error) {
      console.error("Failed to fetch emails:", error)
    } finally {
      setLoading(false)
    }
  }

  const exportEmails = () => {
    const csvContent = [
      "Type,Email,Name,Message,Date",
      ...emails.waitlist.map((item) => `Waitlist,${item.email},,,${item.created_at}`),
      ...emails.contacts.map(
        (item) => `Contact,${item.email},${item.name},"${item.message.replace(/"/g, '""')}",${item.created_at}`,
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `drimin-emails-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => router.push("/admin")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <h1 className="text-3xl font-bold">All Emails & Contacts</h1>
          </div>
          <Button onClick={exportEmails} className="bg-green-600 hover:bg-green-700">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Waitlist Emails */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Waitlist Emails ({emails.waitlist.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {emails.waitlist.map((item) => (
                  <div key={item.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <div>
                      <div className="font-medium">{item.email}</div>
                      <div className="text-xs text-gray-500">{new Date(item.created_at).toLocaleString()}</div>
                    </div>
                    <div className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">{item.source_page}</div>
                  </div>
                ))}
                {emails.waitlist.length === 0 && (
                  <p className="text-gray-500 text-center py-4">No waitlist emails yet</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Contact Forms */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Contact Forms ({emails.contacts.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {emails.contacts.map((item) => (
                  <div key={item.id} className="p-3 bg-gray-50 rounded">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-gray-600">{item.email}</div>
                      </div>
                      <div className="text-xs text-gray-500">{new Date(item.created_at).toLocaleString()}</div>
                    </div>
                    <div className="text-sm text-gray-700 bg-white p-2 rounded border">{item.message}</div>
                  </div>
                ))}
                {emails.contacts.length === 0 && <p className="text-gray-500 text-center py-4">No contact forms yet</p>}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
