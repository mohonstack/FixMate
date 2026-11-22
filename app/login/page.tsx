import { redirect } from "next/navigation"

// Legacy URL kept for old links/bookmarks — the login page lives at /sign-in.
export default function LoginPage() {
  redirect("/sign-in")
}
