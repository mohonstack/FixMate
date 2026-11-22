"use client"

import * as React from "react"

import { AuthForm, AuthFormData } from "@/components/auth-form"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

export default function SignUpPage() {
    const router = useRouter()
    const [error, setError] = React.useState<string | null>(null)
    const [pending, setPending] = React.useState(false)

    const handleSignUp = async (data: AuthFormData) => {
        setError(null)
        setPending(true)

        try {
            const { error: signUpError } = await authClient.signUp.email({
                name: data.name as string,
                email: data.email,
                password: data.password,
                callbackURL: "/",
                // "seeker" | "recruiter" | "admin" — admin is granted internally.
                role: data.role ?? "seeker",
                image: data.image,
            })

            if (signUpError) {
                // e.g. 422 "User already exists. Use another email."
                setError(signUpError.message || "Something went wrong. Please try again.")
                return
            }

            // Refresh so server components pick up the new session cookie, then navigate.
            router.refresh()
            router.push("/")
        } catch {
            setError("Something went wrong. Please try again.")
        } finally {
            setPending(false)
        }
    }

    return <AuthForm mode="signup" onSubmit={handleSignUp} error={error} pending={pending} />
}
