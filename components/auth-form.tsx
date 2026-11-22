"use client"

import * as React from "react"
import Link from "next/link"
import { Eye, EyeOff, Lock, Mail, Trash2, Upload, User, Users } from "lucide-react"

import { cn } from "@/lib/utils"
import { PillGroup } from "@/components/shared/pill-group"

// Roles mirror the `user.additionalFields.role` enum in `lib/auth.ts`.
export type UserRole = "seeker" | "recruiter" | "admin"

export type AuthMode = "signin" | "signup"

export type AuthFormData = {
  email: string
  password: string
  name?: string
  role?: UserRole
  /** Chosen profile image. Upload (imgbb → URL) is wired up separately. */
  image?: string
}

const COPY = {
  signin: {
    title: "Welcome back",
    subtitle: "Sign in to continue your job hunt.",
    submitLabel: "Sign In",
    showName: false,
    footer: "New to FixMate?",
    footerLinkHref: "/sign-up",
    footerLinkLabel: "Create an account",
  },
  signup: {
    title: "Create your account",
    subtitle: "Three minutes to set up. Matches start arriving today.",
    submitLabel: "Sign Up",
    showName: true,
    footer: "Already have an account?",
    footerLinkHref: "/sign-in",
    footerLinkLabel: "Sign in",
  },
} as const

const inputClass =
  "h-12 w-full rounded-lg border surface-field pl-10 pr-3 text-base tracking-[-0.0125rem] text-[#EDEDEF] shadow-[inset_0_3px_10px_rgba(255,255,255,0.04)] outline-none transition-colors placeholder:text-white/60 focus:ring-2 focus:ring-[#5C53FE]/30"
const labelClass = "mb-2 block text-left text-sm text-[#EDEDEF]/80"

// Sign-up role picker — values match better-auth's `role` field in lib/auth.ts.
// Admin is intentionally not offered at sign-up; it's granted internally.
const ROLES: {
  value: UserRole
  label: string
  icon: React.ComponentType<{ className?: string }>
}[] = [
  { value: "seeker", label: "Job Seeker", icon: Users },
  { value: "recruiter", label: "Recruiter", icon: User },
]

export function AuthForm({
  mode,
  onSubmit,
  error,
  pending = false,
}: {
  mode: AuthMode
  /** Called with the collected form values when the form is submitted. */
  onSubmit?: (data: AuthFormData) => void | Promise<void>
  /** Shown under the submit button, e.g. an auth API error message. */
  error?: string | null
  /** Disables the submit button while the request is in flight. */
  pending?: boolean
}) {
  const copy = COPY[mode]
  const isSignup = mode === "signup"

  const [values, setValues] = React.useState<AuthFormData>({
    email: "",
    password: "",
    name: "",
    role: "seeker",
    image: undefined,
  })
  const [showPassword, setShowPassword] = React.useState(false)
  /** Object URL preview of the chosen image (revoked on replace/remove). */
  const [imagePreview, setImagePreview] = React.useState<string | null>(null)
  /** Upload failure message for the chosen profile photo. */
  const [imageError, setImageError] = React.useState<string | null>(null)

  // onChange handler for the profile image input: uploads the file to imgbb
  // and stores the returned URL on the form values.
  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (imagePreview) URL.revokeObjectURL(imagePreview)
    setImagePreview(file ? URL.createObjectURL(file) : null)
    setImageError(null)

    if (!file) return

    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY
    if (!apiKey) {
      setImageError("Image upload is not configured (missing IMGBB API key).")
      return
    }

    const formData = new FormData()
    formData.append("image", file)

    try {
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: formData,
      })

      const result = await res.json().catch(() => null)
      const imageURL = result?.data?.url as string | undefined

      if (!res.ok || !imageURL) {
        setImageError(result?.error?.message || "Image upload failed. Please try again.")
        return
      }

      setValues((prev) => ({ ...prev, image: imageURL }))
    } catch {
      setImageError("Image upload failed. Check your connection and try again.")
    }
  }

  const clearImage = () => {
    if (imagePreview) URL.revokeObjectURL(imagePreview)
    setImagePreview(null)
    setImageError(null)
    setValues((prev) => ({ ...prev, image: undefined }))
  }

  const setField =
    (field: keyof AuthFormData) =>
    (event: React.ChangeEvent<HTMLInputElement>) =>
      setValues((prev) => ({ ...prev, [field]: event.target.value }))

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data: AuthFormData = {
      email: values.email,
      password: values.password,
      ...(isSignup
        ? { name: values.name, role: values.role, image: values.image }
        : {}),
    }
    onSubmit?.(data)
  }

  return (
    <div className="surface-card w-full p-8">
      <div className="mb-8 flex flex-col gap-2 text-center">
        <h1 className="page-title">
          {copy.title}
        </h1>
        <p className="text-base leading-[1.6] text-white/70">{copy.subtitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {copy.showName ? (
          <fieldset>
            <legend className={labelClass}>Joining FixMate as</legend>
            <PillGroup
              name="role"
              value={values.role ?? "seeker"}
              onChange={(role) => setValues((prev) => ({ ...prev, role }))}
              options={ROLES}
              className="grid grid-cols-2 gap-2"
              pillClassName="flex-col h-full w-full justify-center gap-1.5 px-2 py-3 tracking-[-0.0125rem]"
            />
          </fieldset>
        ) : null}

        {copy.showName ? (
          <fieldset>
            <legend className={labelClass}>Profile photo (optional)</legend>
            <div className="flex items-center gap-3">
              {/* Preview once an image is picked, default icon otherwise. */}
              {imagePreview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={imagePreview}
                  alt="Selected profile photo preview"
                  className="size-12 shrink-0 rounded-full border border-white/10 object-cover"
                />
              ) : (
                <span
                  aria-hidden
                  className="flex size-12 shrink-0 items-center justify-center rounded-full border border-white/10 bg-[#1A1A1F]"
                >
                  <User className="size-5 text-white/50" />
                </span>
              )}

              {/* Uploads to imgbb on select; the returned URL is passed to
                  better-auth when the form is submitted. */}
              <label className="flex h-11 cursor-pointer items-center gap-2 rounded-lg border border-white/10 bg-[#1A1A1F] px-4 text-sm text-[#EDEDEF]/80 transition-colors hover:border-white/25 hover:text-white">
                <Upload aria-hidden className="size-4" />
                {values.image ? "Change image" : "Upload image"}
                <input
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={handleImageChange}
                />
              </label>

              {values.image ? (
                <>
                  <span className="min-w-0 flex-1 truncate text-sm text-white/60">
                    {values.image}
                  </span>
                  <button
                    type="button"
                    onClick={clearImage}
                    aria-label="Remove selected image"
                    className="rounded-md p-2 text-white/50 transition-colors hover:text-white"
                  >
                    <Trash2 aria-hidden className="size-4" />
                  </button>
                </>
              ) : null}
            </div>

            {imageError ? (
              <p role="alert" className="mt-2 text-sm text-[#FF8A8A]">
                {imageError}
              </p>
            ) : null}
          </fieldset>
        ) : null}

        {copy.showName ? (
          <div>
            <label htmlFor="name" className={labelClass}>
              Full name
            </label>
            <div className="relative">
              <User
                aria-hidden
                className="pointer-events-none absolute top-1/2 left-3 size-5 -translate-y-1/2 text-white/50"
              />
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                minLength={2}
                maxLength={80}
                value={values.name ?? ""}
                onChange={setField("name")}
                placeholder="Jane Doe"
                className={inputClass}
              />
            </div>
          </div>
        ) : null}

        <div>
          <label htmlFor="email" className={labelClass}>
            Email address
          </label>
          <div className="relative">
            <Mail
              aria-hidden
              className="pointer-events-none absolute top-1/2 left-3 size-5 -translate-y-1/2 text-white/50"
            />
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={values.email}
              onChange={setField("email")}
              placeholder="you@example.com"
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <div className="flex items-baseline justify-between">
            <label htmlFor="password" className={labelClass}>
              Password
            </label>
            {isSignup ? null : (
              <Link
                href="/forgot-password"
                className="mb-2 text-sm text-[#8B85FF] transition-colors hover:text-white"
              >
                Forgot password?
              </Link>
            )}
          </div>
          <div className="relative">
            <Lock
              aria-hidden
              className="pointer-events-none absolute top-1/2 left-3 size-5 -translate-y-1/2 text-white/50"
            />
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete={isSignup ? "new-password" : "current-password"}
              required
              minLength={8}
              maxLength={72}
              value={values.password}
              onChange={setField("password")}
              placeholder={isSignup ? "At least 8 characters" : "Your password"}
              className={cn(inputClass, "pr-11")}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute top-1/2 right-2 -translate-y-1/2 rounded-md p-1.5 text-white/50 transition-colors hover:text-white"
            >
              {showPassword ? (
                <EyeOff aria-hidden className="size-4" />
              ) : (
                <Eye aria-hidden className="size-4" />
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={pending}
          className="btn-brand mt-1 h-[52px] w-full rounded-[8px] text-lg font-medium text-[#EDEDEF] shadow-[inset_0_3px_10px_rgba(255,255,255,0.2)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Please wait…" : copy.submitLabel}
        </button>

        {error ? (
          <p
            role="alert"
            className="rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive"
          >
            {error}
          </p>
        ) : null}
      </form>

      <p className="mt-8 text-center text-base text-white/70">
        {copy.footer}{" "}
        <Link
          href={copy.footerLinkHref}
          className="font-semibold text-[#8B85FF] transition-colors hover:text-white"
        >
          {copy.footerLinkLabel}
        </Link>
      </p>
    </div>
  )
}
