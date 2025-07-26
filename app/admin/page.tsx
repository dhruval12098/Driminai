"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Mail, MessageSquare, Users, FileText, Download, TrendingUp, Calendar, ExternalLink } from "lucide-react"

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

      if (!response.ok) {
        if (response.status === 401) {
          router.push("/admin/login")
          return
        }
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const contentType = response.headers.get("content-type")
      if (!contentType || !contentType.includes("application/json")) {
        console.error("API returned non-JSON response")
        setEmails({
          waitlist: [
            { id: "1", email: "user1@example.com", created_at: new Date().toISOString() },
            { id: "2", email: "user2@example.com", created_at: new Date().toISOString() },
          ],
          contacts: [
            {
              id: "1",
              name: "John Doe",
              email: "john@example.com",
              message: "Sample message",
              created_at: new Date().toISOString(),
            },
          ],
        })
        return
      }

      const data = await response.json()
      setEmails(data)
    } catch (error) {
      console.error("Failed to fetch emails:", error)
      // Use fallback data on error
      setEmails({
        waitlist: [
          { id: "1", email: "demo@example.com", created_at: new Date().toISOString() },
          { id: "2", email: "test@example.com", created_at: new Date().toISOString() },
        ],
        contacts: [
          {
            id: "1",
            name: "Demo User",
            email: "demo@example.com",
            message: "This is demo data - API not connected",
            created_at: new Date().toISOString(),
          },
        ],
      })
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

  const handleNavigation = (path: string) => {
    router.push(path)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">DriminAI Admin Dashboard</h1>
              <p className="text-slate-600 mt-1">Manage your platform with ease</p>
            </div>
            <Button onClick={exportEmails} className="bg-blue-600 hover:bg-blue-700 text-white">
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
          </div>
        </div>
      </div>

      {/* API Status Notice */}
      {(emails.waitlist.some((item) => item.email.includes("example.com")) ||
        emails.contacts.some((item) => item.email.includes("example.com"))) && (
        <div className="max-w-7xl mx-auto px-6 pt-6">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-amber-800 text-sm font-medium">
              ⚠️ Demo Mode: API endpoint not available. Showing sample data.
            </p>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-800">Waitlist Emails</CardTitle>
              <Mail className="h-5 w-5 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900">{emails.waitlist.length}</div>
              <p className="text-xs text-blue-600 mt-1">Active signups</p>
            </CardContent>
          </Card>

          <Card className="bg-emerald-50 border-emerald-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-emerald-800">Contact Forms</CardTitle>
              <MessageSquare className="h-5 w-5 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-900">{emails.contacts.length}</div>
              <p className="text-xs text-emerald-600 mt-1">Inquiries received</p>
            </CardContent>
          </Card>

          <Card className="bg-purple-50 border-purple-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-800">Total Leads</CardTitle>
              <Users className="h-5 w-5 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-900">
                {emails.waitlist.length + emails.contacts.length}
              </div>
              <p className="text-xs text-purple-600 mt-1">Combined reach</p>
            </CardContent>
          </Card>

          <Card className="bg-orange-50 border-orange-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-800">Content Sections</CardTitle>
              <FileText className="h-5 w-5 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-900">12</div>
              <p className="text-xs text-orange-600 mt-1">Manageable areas</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-900 flex items-center">
              <ExternalLink className="w-5 h-5 mr-2 text-blue-600" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button
                onClick={() => handleNavigation("/admin/content/home")}
                className="h-20 bg-purple-600 hover:bg-purple-700 text-white flex flex-col items-center justify-center space-y-2"
              >
                <FileText className="w-5 h-5" />
                <span className="text-sm font-medium">Edit Home Page</span>
              </Button>
              <Button
                onClick={() => handleNavigation("/admin/content/features")}
                className="h-20 bg-emerald-600 hover:bg-emerald-700 text-white flex flex-col items-center justify-center space-y-2"
              >
                <TrendingUp className="w-5 h-5" />
                <span className="text-sm font-medium">Edit Features</span>
              </Button>
              <Button
                onClick={() => handleNavigation("/admin/content/pricing")}
                className="h-20 bg-blue-600 hover:bg-blue-700 text-white flex flex-col items-center justify-center space-y-2"
              >
                <FileText className="w-5 h-5" />
                <span className="text-sm font-medium">Edit Pricing</span>
              </Button>
              <Button
                onClick={() => handleNavigation("/admin/emails")}
                className="h-20 bg-orange-600 hover:bg-orange-700 text-white flex flex-col items-center justify-center space-y-2"
              >
                <Mail className="w-5 h-5" />
                <span className="text-sm font-medium">View All Emails</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="bg-blue-50">
              <CardTitle className="text-lg font-semibold text-slate-900 flex items-center">
                <Mail className="w-5 h-5 mr-2 text-blue-600" />
                Recent Waitlist Signups
                <Badge className="ml-auto bg-blue-100 text-blue-800">{emails.waitlist.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                {emails.waitlist.slice(0, 5).map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm font-medium text-slate-700">{item.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      <span className="text-xs text-slate-500">{new Date(item.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
                {emails.waitlist.length === 0 && (
                  <div className="text-center py-8 text-slate-500">
                    <Mail className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                    <p>No waitlist signups yet</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="bg-emerald-50">
              <CardTitle className="text-lg font-semibold text-slate-900 flex items-center">
                <MessageSquare className="w-5 h-5 mr-2 text-emerald-600" />
                Recent Contact Forms
                <Badge className="ml-auto bg-emerald-100 text-emerald-800">{emails.contacts.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                {emails.contacts.slice(0, 5).map((item) => (
                  <div key={item.id} className="p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        <span className="text-sm font-semibold text-slate-700">{item.name}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        <span className="text-xs text-slate-500">{new Date(item.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="text-xs text-emerald-700 font-medium mb-1">{item.email}</div>
                    <div className="text-xs text-slate-600 bg-white p-2 rounded truncate">{item.message}</div>
                  </div>
                ))}
                {emails.contacts.length === 0 && (
                  <div className="text-center py-8 text-slate-500">
                    <MessageSquare className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                    <p>No contact forms yet</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
