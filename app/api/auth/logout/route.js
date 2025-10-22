import { cookies } from "next/headers";

export async function POST(req) {
  try {
    const cookieStore = await cookies();
    cookieStore.set({
      name: "token",
      value: "",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0,
      path: "/",
    });

    return Response.json({ success: "Logout berhasil" });
  } catch (error) {
    return Response.json({ error: "Gagal logout" }, { status: 500 });
  }
}
