"use client"

import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  User,
  TrendingUp,
  Activity,
  FlaskConical,
  PlayCircle,
  Clock,
  CheckCircle2,
} from "lucide-react"
import { cn } from "@/lib/utils"

const stats = [
  {
    label: "Backtests Done",
    value: "47",
    icon: FlaskConical,
    color: "text-primary",
    bg: "bg-primary/20",
  },
  {
    label: "Live Sessions",
    value: "12",
    icon: PlayCircle,
    color: "text-[#10B981]",
    bg: "bg-[#10B981]/20",
  },
  {
    label: "Best Win Rate",
    value: "78.3%",
    icon: TrendingUp,
    color: "text-[#8B5CF6]",
    bg: "bg-[#8B5CF6]/20",
  },
  {
    label: "Best Strategy",
    value: "RSI+MACD",
    icon: Activity,
    color: "text-[#F59E0B]",
    bg: "bg-[#F59E0B]/20",
  },
]

const recentActivity = [
  {
    action: "Ran backtest on BTC/USDT",
    detail: "RSI+MACD Crossover · 1h",
    date: "2024-03-15 14:32",
    status: "success",
  },
  {
    action: "Created new strategy",
    detail: "Bollinger Band Breakout",
    date: "2024-03-14 10:18",
    status: "success",
  },
  {
    action: "Started live session",
    detail: "ETH/USDT · 4h",
    date: "2024-03-13 09:05",
    status: "live",
  },
  {
    action: "Ran adaptive backtest",
    detail: "EMA Trend Following on SOL/USDT",
    date: "2024-03-12 16:44",
    status: "success",
  },
  {
    action: "Updated code editor",
    detail: "Volume Spike Strategy",
    date: "2024-03-11 11:20",
    status: "success",
  },
]

export default function DashboardProfilePage() {
  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
            <User className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-foreground">Dashboard</h1>
            <p className="text-sm text-muted-foreground">Your profile and trading overview</p>
          </div>
        </div>

        {/* Profile Card */}
        <div className="glass-panel rounded-xl p-6 flex items-center gap-6">
          <Avatar className="h-20 w-20">
            <AvatarImage src="/avatar.png" alt="John Doe" />
            <AvatarFallback className="bg-primary/20 text-primary text-2xl font-semibold">
              JD
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-semibold text-foreground">John Doe</h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#8B5CF6]/20 text-[#8B5CF6] border border-[#8B5CF6]/30">
                Pro Plan
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">john@example.com</p>
            <p className="text-xs text-muted-foreground mt-1">Member since January 2024</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="glass-panel rounded-xl p-4 text-center">
              <div className={cn("w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center", stat.bg)}>
                <stat.icon className={cn("w-5 h-5", stat.color)} />
              </div>
              <p className="text-xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="glass-panel rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-border">
            <h2 className="text-sm font-medium text-foreground flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              Recent Activity
            </h2>
          </div>
          <div className="divide-y divide-border">
            {recentActivity.map((item, i) => (
              <div key={i} className="px-5 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className={cn(
                    "w-4 h-4 shrink-0",
                    item.status === "live" ? "text-[#10B981]" : "text-primary"
                  )} />
                  <div>
                    <p className="text-sm text-foreground">{item.action}</p>
                    <p className="text-xs text-muted-foreground">{item.detail}</p>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">{item.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
