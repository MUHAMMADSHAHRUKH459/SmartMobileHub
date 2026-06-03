import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

const DEFAULT_ADMIN_EMAIL = process.env.ADMIN_EMAIL ??
  (process.env.NODE_ENV !== "production" ? "admin@smartmobilehub.com" : undefined);
const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ??
  (process.env.NODE_ENV !== "production" ? "admin123" : undefined);

function buildSessionResponse() {
  const response = NextResponse.json({ success: true });
  response.cookies.set("admin-token", "authenticated", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
  return response;
}

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    if (
      DEFAULT_ADMIN_EMAIL &&
      DEFAULT_ADMIN_PASSWORD &&
      email === DEFAULT_ADMIN_EMAIL &&
      password === DEFAULT_ADMIN_PASSWORD
    ) {
      return buildSessionResponse();
    }

    try {
      const admin = await prisma.admin.findUnique({ where: { email } });
      if (!admin) {
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
      }

      const isValid = await bcrypt.compare(password, admin.password);
      if (!isValid) {
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
      }

      return buildSessionResponse();
    } catch (dbError) {
      console.error("Admin lookup failed:", dbError);
      return NextResponse.json(
        { error: "Login unavailable: database connection failed" },
        { status: 503 }
      );
    }
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}