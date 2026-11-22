"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { authClient } from "@/lib/auth-client"

/** "Jane Doe" -> "JD", falls back to the email's first letter. */
function getInitials(name?: string | null, email?: string | null) {
  const source = name?.trim() || email?.trim() || "?"
  const parts = source.split(/\s+/).filter(Boolean)
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase()
  return `${parts[0]![0]}${parts[parts.length - 1]![0]}`.toUpperCase()
}

/**
 * Navbar account menu: avatar for the signed-in user (shadcn `Avatar` +
 * `DropdownMenu`) with a sign-out action. Renders nothing when signed out or
 * while the session is still loading.
 */
export function UserAvatar() {
  const router = useRouter()
  const { data, isPending } = authClient.useSession()
  const user = data?.user ?? null

  if (isPending) {
    return (
      <span
        aria-hidden
        className="block size-8 animate-pulse rounded-full bg-muted"
      />
    )
  }

  if (!user) return null

  const handleSignOut = async () => {
    await authClient.signOut()
    // Refresh so server components drop the session, then go back home.
    router.refresh()
    router.push("/")
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Open account menu"
        className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-blue-600/50"
      >
        <Avatar>
          {user.image ? (
            <AvatarImage src={user.image} alt={user.name || user.email || "User"} />
          ) : null}
          <AvatarFallback>{getInitials(user.name, user.email)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-60">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="font-normal">
            <span className="block truncate text-sm font-medium text-foreground">
              {user.name}
            </span>
            <span className="block truncate text-xs text-muted-foreground">
              {user.email}
            </span>
            {user.role ? (
              <span className="mt-1 inline-block rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium capitalize text-primary">
                {user.role}
              </span>
            ) : null}
          </DropdownMenuLabel>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem variant="destructive" onClick={handleSignOut}>
          <LogOut aria-hidden />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
