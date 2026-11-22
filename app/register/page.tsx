import { redirect } from "next/navigation"

// Legacy URL kept for old links/bookmarks — the register page lives at /sign-up.
export default function RegisterPage() {
  redirect("/sign-up")
}
