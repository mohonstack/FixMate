"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

/** Auth pages render their own full-height shell — no footer there. */
const HIDDEN_ON = ["/sign-in", "/sign-up", "/login", "/register"]

const exploreLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "How It Works", href: "/how-it-works" },
]

const accountLinks = [
  { name: "Sign In", href: "/sign-in" },
  { name: "Create Account", href: "/sign-up" },
]

const serviceCategories = [
  { name: "Plumbing", hint: "Expert plumbers" },
  { name: "Electrical", hint: "Safe electrical work" },
  { name: "AC Repair", hint: "Cooling solutions" },
  { name: "Home Repair", hint: "Complete solutions" },
]

export default function Footer() {
  const pathname = usePathname()

  if (HIDDEN_ON.includes(pathname)) return null

  return (
    <footer className="w-full border-t border-gray-100 bg-white">
      <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <span
                aria-hidden
                className="flex size-10 items-center justify-center rounded-xl bg-blue-600 text-2xl font-bold text-white"
              >
                F
              </span>
              <span className="text-2xl font-bold text-slate-900">FixMate</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-6 text-gray-500">
              Your Home, Our Responsibility. Find trusted professionals for all
              your home repair needs — simple, reliable, and stress-free.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Explore</h3>
            <ul className="mt-4 space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 transition hover:text-blue-600"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Account</h3>
            <ul className="mt-4 space-y-3">
              {accountLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 transition hover:text-blue-600"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Services</h3>
            <ul className="mt-4 space-y-3">
              {serviceCategories.map((service) => (
                <li key={service.name}>
                  <span className="block text-sm text-gray-500">
                    {service.name}
                  </span>
                  <span className="block text-xs text-gray-400">
                    {service.hint}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-gray-100 pt-6 sm:flex-row">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} FixMate. All rights reserved.
          </p>
          <p className="text-xs text-gray-400">
            Verified experts · Quick service · Complete solutions
          </p>
        </div>
      </div>
    </footer>
  )
}
