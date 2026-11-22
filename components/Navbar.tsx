
"use client";

import { useState } from "react";
import Link from "next/link";

import { authClient } from "@/lib/auth-client";
import { UserAvatar } from "@/components/user-avatar";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = authClient.useSession();
  const isSignedIn = Boolean(session?.user);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "How It Works", href: "/how-it-works" },
  ];

  return (
    <nav className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <span className="text-white text-2xl font-bold">F</span>
            </div>
            <span className="text-2xl font-bold text-slate-900">
              FixMate
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-9">
            {navLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition ${
                  index === 0
                    ? "text-blue-600"
                    : "text-slate-600 hover:text-blue-600"
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Auth Buttons / account avatar */}
          <div className="hidden md:flex items-center gap-4">
            {isSignedIn ? (
              <UserAvatar />
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="text-sm font-semibold text-slate-800 hover:text-blue-600"
                >
                  Sign In
                </Link>

                <Link
                  href="/sign-up"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl text-sm font-semibold transition"
                >
                  Create Account
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-slate-800 text-2xl"
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
          >
            {isOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-5 border-t border-gray-100">
            <div className="flex flex-col gap-4 pt-5">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-medium text-slate-700 hover:text-blue-600"
                >
                  {link.name}
                </a>
              ))}

              <hr className="border-gray-100" />

              {isSignedIn ? (
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold text-slate-800">
                    Your account
                  </span>
                  <UserAvatar />
                </div>
              ) : (
                <>
                  <Link
                    href="/sign-in"
                    onClick={() => setIsOpen(false)}
                    className="text-sm font-semibold text-slate-800"
                  >
                    Sign In
                  </Link>

                  <Link
                    href="/sign-up"
                    onClick={() => setIsOpen(false)}
                    className="bg-blue-600 text-white text-center px-5 py-3 rounded-xl text-sm font-semibold"
                  >
                    Create Account
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
