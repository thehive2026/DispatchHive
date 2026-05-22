
# Generate app/(dashboard)/settings/page.tsx - Settings Page

settings_page = """"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Settings, Building, CreditCard, Bell } from "lucide-react";

export default function SettingsPage() {
  const [companyName, setCompanyName] = useState("ABC Trucking LLC");
  const [email, setEmail] = useState("admin@abctrucking.com");
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-1">
          Manage your account and preferences
        </p>
      </div>

      {/* Company Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="w-5 h-5" />
            Company Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Admin Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <Button>Save Changes</Button>
        </CardContent>
      </Card>

      {/* Plan & Billing */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Plan & Billing
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">Current Plan</p>
              <Badge className="mt-1 bg-blue-100 text-blue-800">Starter</Badge>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">$99/mo</p>
              <p className="text-sm text-gray-500">Next billing: June 21, 2026</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Upgrade Plan</Button>
            <Button variant="ghost" className="text-red-600 hover:text-red-700">
              Cancel Subscription
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">Email Notifications</p>
              <p className="text-sm text-gray-500">
                Receive updates about load status changes
              </p>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                notifications ? "bg-blue-600" : "bg-gray-200"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  notifications ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
"""

print("=" * 60)
print("FILE 37: app/(dashboard)/settings/page.tsx")
print("=" * 60)
print(settings_page)
