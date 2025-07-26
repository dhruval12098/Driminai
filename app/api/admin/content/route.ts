import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import jwt from "jsonwebtoken"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

function verifyAdmin(request: NextRequest) {
  const token = request.cookies.get("admin-token")?.value
  if (!token) return null

  try {
    return jwt.verify(token, process.env.JWT_SECRET || "your-secret-key")
  } catch {
    return null
  }
}

export async function GET(request: NextRequest) {
  const admin = verifyAdmin(request)
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const page = searchParams.get("page")
  const section = searchParams.get("section")

  try {
    let query = supabase.from("content_sections").select("*")

    if (page) query = query.eq("page_name", page)
    if (section) query = query.eq("section_name", section)

    const { data, error } = await query.order("page_name", { ascending: true })

    if (error) throw error

    return NextResponse.json({ data })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch content" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  const admin = verifyAdmin(request)
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { page_name, section_name, content_json } = await request.json()

    const { data, error } = await supabase
      .from("content_sections")
      .upsert({
        page_name,
        section_name,
        content_json,
        updated_at: new Date().toISOString(),
      })
      .select()

    if (error) throw error

    return NextResponse.json({ data })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update content" }, { status: 500 })
  }
}
