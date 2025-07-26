"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, MessageSquare, Users, FileText } from "lucide-react"

interface EmailData {
  waitlist: Array<{ id: string; email: string; created_at: string }>
  contacts: Array<{ id: string; name: string; email: string; message: string; created_at: string }>
}

export default function AdminDashboard() {
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
      ...emails.contacts.map((item) => `Contact,${item.email},${item.name},"${item.message}",${item.created_at}`),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "drimin-emails.csv"
    a.click()
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">DriminAI Admin Dashboard</h1>
          <Button onClick={exportEmails} className="bg-blue-600 hover:bg-blue-700">
            Export All Emails
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Waitlist Emails</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{emails.waitlist.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Contact Forms</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{emails.contacts.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{emails.waitlist.length + emails.contacts.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Content Sections</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Button onClick={() => router.push("/admin/content/home")} className="h-20 bg-purple-600 hover:bg-purple-700">
            Edit Home Page
          </Button>
          <Button
            onClick={() => router.push("/admin/content/features")}
            className="h-20 bg-green-600 hover:bg-green-700"
          >
            Edit Features
          </Button>
          <Button onClick={() => router.push("/admin/content/pricing")} className="h-20 bg-blue-600 hover:bg-blue-700">
            Edit Pricing
          </Button>
          <Button onClick={() => router.push("/admin/emails")} className="h-20 bg-orange-600 hover:bg-orange-700">
            View All Emails
          </Button>
        </div>

        {/* Recent Emails */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Waitlist Signups</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {emails.waitlist.slice(0, 5).map((item) => (
                  <div key={item.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="text-sm">{item.email}</span>
                    <span className="text-xs text-gray-500">{new Date(item.created_at).toLocaleDateString()}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Contact Forms</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {emails.contacts.slice(0, 5).map((item) => (
                  <div key={item.id} className="p-2 bg-gray-50 rounded">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{item.name}</span>
                      <span className="text-xs text-gray-500">{new Date(item.created_at).toLocaleDateString()}</span>
                    </div>
                    <div className="text-xs text-gray-600">{item.email}</div>
                    <div className="text-xs text-gray-500 mt-1 truncate">{item.message}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
