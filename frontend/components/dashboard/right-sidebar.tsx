"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  MessageSquare,
  Code2,
  FlaskConical,
  PlayCircle,
  ChevronDown,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

interface NavItemProps {
  icon: React.ElementType
  href: string
  label: string
  isActive: boolean
}

interface ExpandableItemProps {
  icon: React.ElementType
  label: string
  isActive: boolean
  isOpen: boolean
  onToggle: () => void
  subItems: { href: string; label: string }[]
  pathname: string
}

function NavItem({ icon: Icon, href, label, isActive }: NavItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200",
        isActive
          ? "bg-primary/20 text-primary"
          : "text-muted-foreground hover:text-foreground hover:bg-secondary"
      )}
    >
      <Icon className="w-4 h-4 shrink-0" />
      <span className="truncate">{label}</span>
    </Link>
  )
}

function ExpandableItem({
  icon: Icon,
  label,
  isActive,
  isOpen,
  onToggle,
  subItems,
  pathname,
}: ExpandableItemProps) {
  return (
    <div>
      <button
        onClick={onToggle}
        className={cn(
          "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200",
          isActive
            ? "bg-primary/20 text-primary"
            : "text-muted-foreground hover:text-foreground hover:bg-secondary"
        )}
      >
        <Icon className="w-4 h-4 shrink-0" />
        <span className="flex-1 text-left truncate">{label}</span>
        {isOpen ? (
          <ChevronDown className="w-3 h-3 shrink-0" />
        ) : (
          <ChevronRight className="w-3 h-3 shrink-0" />
        )}
      </button>
      {isOpen && (
        <div className="mt-1 flex flex-col gap-0.5">
          {subItems.map((item) => {
            const subActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "pl-8 pr-3 py-1.5 rounded-lg text-xs transition-all duration-200",
                  subActive
                    ? "bg-primary/20 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}

const backtestSubItems = [
  { href: "/backtest", label: "Backtest" },
  { href: "/backtest/adaptive", label: "Backtest Adaptive" },
  { href: "/backtest/history", label: "History" },
]

const liveTestSubItems = [
  { href: "/live-test", label: "Live Test" },
  { href: "/live-test/adaptive", label: "Live Test Adaptive" },
  { href: "/live-test/history", label: "History" },
]

export function RightSidebar() {
  const pathname = usePathname()
  const [backtestOpen, setBacktestOpen] = useState(false)
  const [liveTestOpen, setLiveTestOpen] = useState(false)

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard"
    return pathname.startsWith(href)
  }

  const isBacktestActive = pathname.startsWith("/backtest")
  const isLiveTestActive = pathname.startsWith("/live-test")

  return (
    <aside className="w-48 border-l border-border bg-card/50 flex flex-col py-4 relative">
      <nav className="flex flex-col gap-1 px-2">
        <NavItem
          icon={LayoutDashboard}
          href="/dashboard"
          label="Dashboard"
          isActive={isActive("/dashboard")}
        />
        <NavItem
          icon={MessageSquare}
          href="/ai-chat"
          label="AI Chat"
          isActive={isActive("/ai-chat")}
        />
        <NavItem
          icon={Code2}
          href="/code-editor"
          label="Code Editor"
          isActive={isActive("/code-editor")}
        />
        <ExpandableItem
          icon={FlaskConical}
          label="Backtest"
          isActive={isBacktestActive}
          isOpen={backtestOpen}
          onToggle={() => setBacktestOpen((v) => !v)}
          subItems={backtestSubItems}
          pathname={pathname}
        />
        <ExpandableItem
          icon={PlayCircle}
          label="Live Test"
          isActive={isLiveTestActive}
          isOpen={liveTestOpen}
          onToggle={() => setLiveTestOpen((v) => !v)}
          subItems={liveTestSubItems}
          pathname={pathname}
        />
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
