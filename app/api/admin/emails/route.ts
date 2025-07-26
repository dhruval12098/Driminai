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

  try {
    const { data: emails, error: emailError } = await supabase
      .from("waitlist_emails")
      .select("*")
      .order("created_at", { ascending: false })

    const { data: contacts, error: contactError } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false })

    if (emailError || contactError) {
      throw emailError || contactError
    }

    return NextResponse.json({
      waitlist: emails || [],
      contacts: contacts || [],
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch emails" }, { status: 500 })
  }
}
