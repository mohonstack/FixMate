import { createAuthClient } from "better-auth/react"
import { inferAdditionalFields } from "better-auth/client/plugins"

import type { auth } from "@/lib/auth"

export const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
    // Teaches the client about `user.additionalFields` declared in
    // `lib/auth.ts` (e.g. `role`), so `signUp.email({ role })` type-checks
    // and the session user is typed with those fields.
    plugins: [inferAdditionalFields<(typeof auth)["options"]>()],
})
