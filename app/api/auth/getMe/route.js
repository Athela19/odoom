import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

const SECRET = process.env.JWT_SECRET;

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return Response.json({ error: "Tidak ada token" }, { status: 401 });
    }

    // Verifikasi token JWT
    const decoded = jwt.verify(token, SECRET);

    // Ambil user dari database berdasarkan ID di token
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, name: true, email: true }, // pilih field yang aman
    });

    if (!user) {
      return Response.json({ error: "User tidak ditemukan" }, { status: 404 });
    }

    return Response.json({ user }, { status: 200 });
  } catch (error) {
    console.error("Error getMe:", error);
    return Response.json({ error: "Token tidak valid atau expired" }, { status: 401 });
  }
}
