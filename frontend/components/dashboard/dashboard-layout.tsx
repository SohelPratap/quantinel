import { TopNav } from "./top-nav"
import { RightSidebar } from "./right-sidebar"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <TopNav />
      <div className="flex flex-1">
        <main className="flex-1 overflow-auto">{children}</main>
        <RightSidebar />
      </div>
    </div>
  )
}
