
# Generate app/(dashboard)/dashboard/page.tsx - Main Dashboard

dashboard_page = """"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Truck,
  Users,
  DollarSign,
  Clock,
  TrendingUp,
  AlertCircle,
} from "lucide-react";

interface DashboardStats {
  totalLoads: number;
  activeLoads: number;
  deliveredToday: number;
  totalDrivers: number;
  activeDrivers: number;
  revenue: number;
  overdueLoads: number;
}

interface RecentLoad {
  id: string;
  loadNumber: string;
  origin: string;
  destination: string;
  status: string;
  rate: number | null;
  driver: { name: string } | null;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalLoads: 0,
    activeLoads: 0,
    deliveredToday: 0,
    totalDrivers: 0,
    activeDrivers: 0,
    revenue: 0,
    overdueLoads: 0,
  });
  const [recentLoads, setRecentLoads] = useState<RecentLoad[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  async function fetchDashboardData() {
    try {
      const [loadsRes, driversRes] = await Promise.all([
        fetch("/api/loads"),
        fetch("/api/drivers"),
      ]);

      const loads = await loadsRes.json();
      const drivers = await driversRes.json();

      const today = new Date().toDateString();
      const deliveredToday = loads.filter(
        (l: any) =>
          l.status === "DELIVERED" &&
          new Date(l.updatedAt).toDateString() === today
      ).length;

      const activeLoads = loads.filter((l: any) =>
        ["ASSIGNED", "PICKED_UP", "IN_TRANSIT"].includes(l.status)
      ).length;

      const revenue = loads
        .filter((l: any) => l.status === "DELIVERED")
        .reduce((sum: number, l: any) => sum + (l.rate || 0), 0);

      const overdueLoads = loads.filter((l: any) => {
        if (l.status === "DELIVERED" || l.status === "CANCELLED") return false;
        const deliveryDate = l.deliveryDate ? new Date(l.deliveryDate) : null;
        return deliveryDate && deliveryDate < new Date();
      }).length;

      setStats({
        totalLoads: loads.length,
        activeLoads,
        deliveredToday,
        totalDrivers: drivers.length,
        activeDrivers: drivers.filter((d: any) => d.status === "ACTIVE").length,
        revenue,
        overdueLoads,
      });

      setRecentLoads(loads.slice(0, 5));
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
      setLoading(false);
    }
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      PENDING: "bg-yellow-100 text-yellow-800",
      ASSIGNED: "bg-blue-100 text-blue-800",
      PICKED_UP: "bg-purple-100 text-purple-800",
      IN_TRANSIT: "bg-indigo-100 text-indigo-800",
      DELIVERED: "bg-green-100 text-green-800",
      CANCELLED: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">
          Overview of your dispatch operations
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Active Loads
            </CardTitle>
            <Truck className="w-4 h-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeLoads}</div>
            <p className="text-xs text-gray-500">
              of {stats.totalLoads} total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Active Drivers
            </CardTitle>
            <Users className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeDrivers}</div>
            <p className="text-xs text-gray-500">
              of {stats.totalDrivers} total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Revenue (Delivered)
            </CardTitle>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${stats.revenue.toLocaleString()}
            </div>
            <p className="text-xs text-gray-500">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Delivered Today
            </CardTitle>
            <TrendingUp className="w-4 h-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.deliveredToday}</div>
            <p className="text-xs text-gray-500">Loads completed</p>
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      {stats.overdueLoads > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <div>
            <p className="font-medium text-red-900">
              {stats.overdueLoads} overdue load
              {stats.overdueLoads > 1 ? "s" : ""}
            </p>
            <p className="text-sm text-red-700">
              Past delivery date, needs attention
            </p>
          </div>
        </div>
      )}

      {/* Recent Loads */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Loads</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentLoads.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No loads yet. Create your first load to get started.
              </p>
            ) : (
              recentLoads.map((load) => (
                <div
                  key={load.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{load.loadNumber}</span>
                      <Badge className={getStatusColor(load.status)}>
                        {load.status.replace("_", " ")}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {load.origin} → {load.destination}
                    </p>
                  </div>
                  <div className="text-right">
                    {load.rate && (
                      <p className="font-medium">
                        ${load.rate.toLocaleString()}
                      </p>
                    )}
                    {load.driver && (
                      <p className="text-sm text-gray-500">
                        {load.driver.name}
                      </p>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
"""

print("=" * 60)
print("FILE 27: app/(dashboard)/dashboard/page.tsx")
print("=" * 60)
print(dashboard_page)
