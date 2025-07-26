import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import jwt from "jsonwebtoken"

// Load environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const jwtSecret = process.env.JWT_SECRET || "your-secret-key"

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error("Supabase environment variables are not set")
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey)

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()
    console.log("📥 Login attempt:", email)

    // Step 1: Find admin by email
    const { data: admin, error } = await supabase
      .from("admin_users")
      .select("*")
      .eq("email", email)
      .single()

    console.log("🧠 Supabase response:", admin, error)

    if (error || !admin) {
      console.log("❌ Admin not found")
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Step 2: Sign JWT
    const token = jwt.sign(
      { adminId: admin.id, email: admin.email },
      jwtSecret,
      { expiresIn: "24h" }
    )

    // Step 3: Set cookie and respond
    const response = NextResponse.json({ success: true })
    response.cookies.set("admin-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 24h
      path: "/",
    })

    console.log("✅ Login successful (no password check)")
    return response
  } catch (error) {
    console.error("🔥 Login error:", error)
    return NextResponse.json({ error: "Login failed" }, { status: 500 })
  }
}
