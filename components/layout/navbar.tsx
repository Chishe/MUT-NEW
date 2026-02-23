"use client"

import Image from "next/image"
import Link from "next/link"
import { ModeToggle } from "./mode-toggle"
import { NotificationBell } from "./notification-bell"
import { Separator } from "@/components/ui/separator"

export function Navbar() {
  return (
    <header className="w-full  border-b bg-[#70131e] backdrop-blur sticky top-0 z-50 text-white">
      <div className="flex items-center justify-between px-6 h-16">

        {/* LEFT */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/mut-logo.svg"
              alt="Company Logo"
              width={36}
              height={36}
              className="rounded-md"
            />
            <span className="text-lg font-bold tracking-wide">
              MUT Dashboard
            </span>
          </Link>

          <Separator orientation="vertical" className="h-6" />

          <span className="text-sm text-muted-foreground hidden md:block">
            Machine Monitoring System
          </span>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">
          <NotificationBell />
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}