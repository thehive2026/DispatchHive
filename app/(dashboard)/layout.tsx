
# Generate app/(dashboard)/layout.tsx - Dashboard Layout with Sidebar

dashboard_layout = """import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Truck,
  Users,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/loads", label: "Loads", icon: Truck },
    { href: "/drivers", label: "Drivers", icon: Users },
    { href: "/reports", label: "Reports", icon: BarChart3 },
    { href: "/settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Truck className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">
              DispatchHive
            </span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 text-gray-600 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors"
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className="px-4 py-2 mb-2">
            <p className="text-sm font-medium text-gray-900">
              {session.user?.name || "User"}
            </p>
            <p className="text-xs text-gray-500">{session.user?.email}</p>
          </div>
          <form action="/api/auth/signout" method="POST">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-gray-600"
              type="submit"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </Button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
"""

print("=" * 60)
print("FILE 26: app/(dashboard)/layout.tsx")
print("=" * 60)
print(dashboard_layout)

