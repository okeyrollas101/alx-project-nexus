import { serialize } from "cookie";

export function setTokenCookie(res: any, token: string) {
  const isProduction = process.env.NODE_ENV === "production";

  res.setHeader(
    "Set-Cookie",
    serialize("token", token, {
      httpOnly: true,
      secure: isProduction, // ✅ secure only in production
      sameSite: isProduction ? "none" : "lax", // stricter in prod
      domain: isProduction ? "alx-project-nexus-henna-delta.vercel.app" : "localhost",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    })
  );
}