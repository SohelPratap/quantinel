"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  History,
  Settings,
  FlaskConical,
  Wand2,
  Brain,
  PlayCircle,
  Zap,
} from "lucide-react"
import { cn } from "@/lib/utils"

const coreNavItems = [
  { icon: LayoutDashboard, href: "/", label: "Dashboard" },
  { icon: History, href: "/history", label: "History" },
  { icon: Settings, href: "/settings", label: "Settings" },
]

const tradingModeItems = [
  { icon: FlaskConical, href: "/backtesting", label: "Backtesting Suite" },
  { icon: Wand2, href: "/strategy-gen/normal", label: "Normal Strategy Generation" },
  { icon: Brain, href: "/strategy-gen/adaptive", label: "Adaptive Strategy Generation" },
  { icon: PlayCircle, href: "/paper/standard", label: "Paper Trading" },
  { icon: Zap, href: "/paper/adaptive", label: "Adaptive Paper Trading" },
]

function NavItem({ icon: Icon, href, label, isActive }: {
  icon: React.ElementType
  href: string
  label: string
  isActive: boolean
}) {
  return (
    <Link
      href={href}
      className={cn(
        "w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 hover-glow",
        isActive
          ? "bg-primary/20 text-primary"
          : "text-muted-foreground hover:text-foreground hover:bg-secondary"
      )}
      title={label}
    >
      <Icon className="w-5 h-5" />
    </Link>
  )
}

export function RightSidebar() {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <aside className="w-16 border-l border-border bg-card/50 flex flex-col items-center py-4 relative">
      <nav className="flex flex-col gap-2">
        {coreNavItems.map((item) => (
          <NavItem
            key={item.href}
            {...item}
            isActive={isActive(item.href)}
          />
        ))}
      </nav>

      {/* Separator */}
      <div className="w-8 my-3 border-t border-border/60" />

      <nav className="flex flex-col gap-2">
        {tradingModeItems.map((item) => (
          <NavItem
            key={item.href}
            {...item}
            isActive={isActive(item.href)}
          />
        ))}
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
