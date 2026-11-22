"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"

import { AuthForm, AuthFormData } from "@/components/auth-form"
import { authClient } from "@/lib/auth-client"

export default function SignInContent() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const redirectTo = searchParams.get("redirectTo") ?? "/"

    const [error, setError] = React.useState<string | null>(null)
    const [pending, setPending] = React.useState(false)

    const handleSignIn = async (data: AuthFormData) => {
        setError(null)
        setPending(true)

        try {
            const { error: signInError } = await authClient.signIn.email({
                email: data.email,
                password: data.password,
                rememberMe: true,
                callbackURL: redirectTo,
            })

            if (signInError) {
                // e.g. 401 "Invalid email or password"
                setError(signInError.message || "Invalid email or password.")
                return
            }

            // Refresh so server components pick up the new session cookie,
            // then navigate to the requested page.
            router.refresh()
            router.push(redirectTo)
        } catch {
            setError("Something went wrong. Please try again.")
        } finally {
            setPending(false)
        }
    }

    return <AuthForm mode="signin" onSubmit={handleSignIn} error={error} pending={pending} />
}
