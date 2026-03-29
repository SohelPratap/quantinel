"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, History, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { icon: LayoutDashboard, href: "/", label: "Dashboard" },
  { icon: History, href: "/history", label: "History" },
  { icon: Settings, href: "/settings", label: "Settings" },
]

export function RightSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-16 border-l border-border bg-card/50 flex flex-col items-center py-4 relative">
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || 
            (item.href === "/history" && pathname.startsWith("/history")) ||
            (item.href === "/settings" && pathname.startsWith("/settings"))

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 hover-glow",
                isActive
                  ? "bg-primary/20 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
              title={item.label}
            >
              <Icon className="w-5 h-5" />
            </Link>
          )
        })}
      </nav>

      {/* Vertical rotated label */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <span
          className="text-[10px] font-medium tracking-widest text-muted-foreground/50 whitespace-nowrap"
          style={{
            writingMode: "vertical-rl",
            textOrientation: "mixed",
            transform: "rotate(180deg)",
          }}
        >
          JUST DO IT BOARD
        </span>
      </div>
    </aside>
  )
}
