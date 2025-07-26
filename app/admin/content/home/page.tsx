"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Save } from "lucide-react"

export default function EditHomePage() {
  const [content, setContent] = useState<any>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const router = useRouter()

  useEffect(() => {
    fetchContent()
  }, [])

  const fetchContent = async () => {
    try {
      const response = await fetch("/api/admin/content?page=home")
      if (response.status === 401) {
        router.push("/admin/login")
        return
      }
      const { data } = await response.json()

      const contentMap: any = {}
      data.forEach((item: any) => {
        contentMap[item.section_name] = item.content_json
      })
      setContent(contentMap)
    } catch (error) {
      console.error("Failed to fetch content:", error)
    } finally {
      setLoading(false)
    }
  }

  const saveSection = async (sectionName: string, sectionContent: any) => {
    setSaving(true)
    try {
      await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          page_name: "home",
          section_name: sectionName,
          content_json: sectionContent,
        }),
      })
      alert("Section saved successfully!")
    } catch (error) {
      alert("Failed to save section")
    } finally {
      setSaving(false)
    }
  }

  const updateContent = (section: string, field: string, value: any) => {
    setContent((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }))
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={() => router.push("/admin")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold">Edit Home Page</h1>
        </div>

        <div className="space-y-8">
          {/* Hero Section */}
          <Card>
            <CardHeader>
              <CardTitle>Hero Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Main Title"
                value={content.hero?.title || ""}
                onChange={(e) => updateContent("hero", "title", e.target.value)}
              />
              <Input
                placeholder="Subtitle"
                value={content.hero?.subtitle || ""}
                onChange={(e) => updateContent("hero", "subtitle", e.target.value)}
              />
              <Input
                placeholder="CTA Button Text"
                value={content.hero?.cta_text || ""}
                onChange={(e) => updateContent("hero", "cta_text", e.target.value)}
              />
              <Input
                placeholder="Badge Text"
                value={content.hero?.badge_text || ""}
                onChange={(e) => updateContent("hero", "badge_text", e.target.value)}
              />
              <Button onClick={() => saveSection("hero", content.hero)} disabled={saving} className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Save Hero Section
              </Button>
            </CardContent>
          </Card>

          {/* Features Section */}
          <Card>
            <CardHeader>
              <CardTitle>Features Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Section Title"
                value={content.features?.title || ""}
                onChange={(e) => updateContent("features", "title", e.target.value)}
              />
              <Input
                placeholder="Section Subtitle"
                value={content.features?.subtitle || ""}
                onChange={(e) => updateContent("features", "subtitle", e.target.value)}
              />

              <div className="space-y-4">
                <h4 className="font-medium">Features (6 items):</h4>
                {content.features?.features?.map((feature: any, index: number) => (
                  <div key={index} className="border p-4 rounded space-y-2">
                    <Input
                      placeholder="Feature Title"
                      value={feature.title || ""}
                      onChange={(e) => {
                        const newFeatures = [...(content.features?.features || [])]
                        newFeatures[index] = { ...feature, title: e.target.value }
                        updateContent("features", "features", newFeatures)
                      }}
                    />
                    <Textarea
                      placeholder="Feature Description"
                      value={feature.description || ""}
                      onChange={(e) => {
                        const newFeatures = [...(content.features?.features || [])]
                        newFeatures[index] = { ...feature, description: e.target.value }
                        updateContent("features", "features", newFeatures)
                      }}
                    />
                  </div>
                ))}
              </div>

              <Button onClick={() => saveSection("features", content.features)} disabled={saving} className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Save Features Section
              </Button>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <Card>
            <CardHeader>
              <CardTitle>FAQ Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="FAQ Title"
                value={content.faq?.title || ""}
                onChange={(e) => updateContent("faq", "title", e.target.value)}
              />
              <Input
                placeholder="FAQ Subtitle"
                value={content.faq?.subtitle || ""}
                onChange={(e) => updateContent("faq", "subtitle", e.target.value)}
              />

              <div className="space-y-4">
                <h4 className="font-medium">FAQ Items:</h4>
                {content.faq?.faqs?.map((faq: any, index: number) => (
                  <div key={index} className="border p-4 rounded space-y-2">
                    <Input
                      placeholder="Question"
                      value={faq.question || ""}
                      onChange={(e) => {
                        const newFaqs = [...(content.faq?.faqs || [])]
                        newFaqs[index] = { ...faq, question: e.target.value }
                        updateContent("faq", "faqs", newFaqs)
                      }}
                    />
                    <Textarea
                      placeholder="Answer"
                      value={faq.answer || ""}
                      onChange={(e) => {
                        const newFaqs = [...(content.faq?.faqs || [])]
                        newFaqs[index] = { ...faq, answer: e.target.value }
                        updateContent("faq", "faqs", newFaqs)
                      }}
                    />
                  </div>
                ))}
              </div>

              <Button onClick={() => saveSection("faq", content.faq)} disabled={saving} className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Save FAQ Section
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
