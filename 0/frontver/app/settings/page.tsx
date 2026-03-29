"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import {
  Settings,
  User,
  Key,
  Bell,
  Shield,
  CreditCard,
  Save,
  Eye,
  EyeOff,
  Copy,
  RefreshCw,
  Trash2,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [isSaving, setIsSaving] = useState(false)
  const [showApiKey, setShowApiKey] = useState(false)

  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
    timezone: "UTC-5",
  })

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    backtestComplete: true,
    weeklyReport: false,
    marketingEmails: false,
  })

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
  }

  return (
    <DashboardLayout>
      <div className="p-6 max-w-4xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
            <Settings className="w-5 h-5 text-muted-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-foreground">Settings</h1>
            <p className="text-sm text-muted-foreground">
              Manage your account and preferences
            </p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-secondary/50 border border-border p-1">
            <TabsTrigger
              value="profile"
              className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
            >
              <User className="w-4 h-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger
              value="api"
              className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
            >
              <Key className="w-4 h-4 mr-2" />
              API Keys
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
            >
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
            >
              <Shield className="w-4 h-4 mr-2" />
              Security
            </TabsTrigger>
            <TabsTrigger
              value="billing"
              className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
            >
              <CreditCard className="w-4 h-4 mr-2" />
              Billing
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <div className="glass-panel rounded-xl p-6 space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/avatar.png" />
                  <AvatarFallback className="bg-primary/20 text-primary text-xl">
                    JD
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" size="sm" className="bg-secondary/50 border-border">
                    Change Avatar
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">
                    JPG, PNG or GIF. Max size 2MB.
                  </p>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label className="text-sm">Full Name</Label>
                  <Input
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="bg-secondary/50 border-border"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm">Email Address</Label>
                  <Input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="bg-secondary/50 border-border"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm">Timezone</Label>
                  <Input
                    value={profile.timezone}
                    onChange={(e) => setProfile({ ...profile, timezone: e.target.value })}
                    className="bg-secondary/50 border-border"
                  />
                </div>
              </div>

              <Button onClick={handleSave} disabled={isSaving} className="bg-primary hover:bg-primary/90">
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </TabsContent>

          {/* API Keys Tab */}
          <TabsContent value="api">
            <div className="glass-panel rounded-xl p-6 space-y-6">
              <div>
                <h3 className="text-lg font-medium text-foreground mb-1">API Keys</h3>
                <p className="text-sm text-muted-foreground">
                  Manage your API keys for external integrations
                </p>
              </div>

              <div className="space-y-4">
                <div className="bg-secondary/30 rounded-lg p-4 border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">Quantinel API Key</span>
                    <span className="text-xs bg-[#10B981]/20 text-[#10B981] px-2 py-0.5 rounded">
                      Active
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      type={showApiKey ? "text" : "password"}
                      value="qnt_sk_1234567890abcdef1234567890abcdef"
                      readOnly
                      className="bg-secondary/50 border-border font-mono text-xs"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      className="bg-secondary/50 border-border shrink-0"
                      onClick={() => setShowApiKey(!showApiKey)}
                    >
                      {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="bg-secondary/50 border-border shrink-0"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="bg-secondary/30 rounded-lg p-4 border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">Exchange API (Binance)</span>
                    <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded">
                      Not configured
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">
                    Connect your Binance account for live data
                  </p>
                  <Button variant="outline" size="sm" className="bg-secondary/50 border-border">
                    Configure
                  </Button>
                </div>
              </div>

              <Button variant="outline" className="bg-secondary/50 border-border">
                <RefreshCw className="w-4 h-4 mr-2" />
                Regenerate API Key
              </Button>
            </div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <div className="glass-panel rounded-xl p-6 space-y-6">
              <div>
                <h3 className="text-lg font-medium text-foreground mb-1">Notifications</h3>
                <p className="text-sm text-muted-foreground">
                  Configure how you want to receive notifications
                </p>
              </div>

              <div className="space-y-4">
                {[
                  { key: "emailAlerts", label: "Email Alerts", desc: "Receive important account alerts via email" },
                  { key: "backtestComplete", label: "Backtest Complete", desc: "Get notified when a backtest finishes" },
                  { key: "weeklyReport", label: "Weekly Reports", desc: "Receive weekly performance summaries" },
                  { key: "marketingEmails", label: "Marketing Emails", desc: "Updates about new features and promotions" },
                ].map((item) => (
                  <div
                    key={item.key}
                    className="flex items-center justify-between py-3 border-b border-border last:border-0"
                  >
                    <div>
                      <span className="text-sm font-medium text-foreground">{item.label}</span>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                    <Switch
                      checked={notifications[item.key as keyof typeof notifications]}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, [item.key]: checked })
                      }
                    />
                  </div>
                ))}
              </div>

              <Button onClick={handleSave} disabled={isSaving} className="bg-primary hover:bg-primary/90">
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Preferences
                  </>
                )}
              </Button>
            </div>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <div className="glass-panel rounded-xl p-6 space-y-6">
              <div>
                <h3 className="text-lg font-medium text-foreground mb-1">Security</h3>
                <p className="text-sm text-muted-foreground">
                  Manage your account security settings
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm">Current Password</Label>
                  <Input type="password" className="bg-secondary/50 border-border" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">New Password</Label>
                  <Input type="password" className="bg-secondary/50 border-border" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Confirm New Password</Label>
                  <Input type="password" className="bg-secondary/50 border-border" />
                </div>
              </div>

              <Button className="bg-primary hover:bg-primary/90">
                Update Password
              </Button>

              <div className="pt-6 border-t border-border">
                <h4 className="text-sm font-medium text-foreground mb-2">Two-Factor Authentication</h4>
                <p className="text-xs text-muted-foreground mb-3">
                  Add an extra layer of security to your account
                </p>
                <Button variant="outline" className="bg-secondary/50 border-border">
                  <Shield className="w-4 h-4 mr-2" />
                  Enable 2FA
                </Button>
              </div>

              <div className="pt-6 border-t border-border">
                <h4 className="text-sm font-medium text-destructive mb-2">Danger Zone</h4>
                <p className="text-xs text-muted-foreground mb-3">
                  Permanently delete your account and all data
                </p>
                <Button variant="outline" className="border-destructive text-destructive hover:bg-destructive/10">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Account
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing">
            <div className="glass-panel rounded-xl p-6 space-y-6">
              <div>
                <h3 className="text-lg font-medium text-foreground mb-1">Billing</h3>
                <p className="text-sm text-muted-foreground">
                  Manage your subscription and payment methods
                </p>
              </div>

              <div className="bg-primary/10 rounded-lg p-4 border border-primary/30">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium text-foreground">Free Plan</span>
                    <p className="text-xs text-muted-foreground">5 backtests remaining this month</p>
                  </div>
                  <Button asChild className="bg-primary hover:bg-primary/90">
                    <a href="/pricing">Upgrade to Pro</a>
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-medium text-foreground">Payment Method</h4>
                <div className="bg-secondary/30 rounded-lg p-4 border border-border flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-8 bg-secondary rounded flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <span className="text-sm text-muted-foreground">No payment method added</span>
                  </div>
                  <Button variant="outline" size="sm" className="bg-secondary/50 border-border">
                    Add Card
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-medium text-foreground">Billing History</h4>
                <div className="bg-secondary/30 rounded-lg p-4 border border-border text-center">
                  <p className="text-sm text-muted-foreground">No billing history</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
