
# Generate app/(dashboard)/reports/page.tsx - Reports Page

reports_page = """"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, Download, Calendar } from "lucide-react";

interface ReportStats {
  totalLoads: number;
  deliveredLoads: number;
  totalRevenue: number;
  averageRate: number;
  topOrigin: string;
  topDestination: string;
}

export default function ReportsPage() {
  const [stats, setStats] = useState<ReportStats>({
    totalLoads: 0,
    deliveredLoads: 0,
    totalRevenue: 0,
    averageRate: 0,
    topOrigin: "—",
    topDestination: "—",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReportData();
  }, []);

  async function fetchReportData() {
    try {
      const res = await fetch("/api/loads");
      const loads = await res.json();

      const delivered = loads.filter((l: any) => l.status === "DELIVERED");
      const revenue = delivered.reduce((sum: number, l: any) => sum + (l.rate || 0), 0);
      
      // Calculate top origin
      const originCounts: Record<string, number> = {};
      const destCounts: Record<string, number> = {};
      
      loads.forEach((l: any) => {
        originCounts[l.origin] = (originCounts[l.origin] || 0) + 1;
        destCounts[l.destination] = (destCounts[l.destination] || 0) + 1;
      });

      const topOrigin = Object.entries(originCounts)
        .sort((a, b) => (b[1] as number) - (a[1] as number))[0]?.[0] || "—";
      
      const topDest = Object.entries(destCounts)
        .sort((a, b) => (b[1] as number) - (a[1] as number))[0]?.[0] || "—";

      setStats({
        totalLoads: loads.length,
        deliveredLoads: delivered.length,
        totalRevenue: revenue,
        averageRate: delivered.length > 0 ? revenue / delivered.length : 0,
        topOrigin,
        topDestination: topDest,
      });
      
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch report data:", error);
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
          <p className="text-gray-500 mt-1">
            Analytics and insights for your operation
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="w-4 h-4" />
          Export CSV
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Loads
            </CardTitle>
            <BarChart3 className="w-4 h-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalLoads}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Delivered Loads
            </CardTitle>
            <BarChart3 className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.deliveredLoads}</div>
            <p className="text-xs text-gray-500">
              {stats.totalLoads > 0
                ? Math.round((stats.deliveredLoads / stats.totalLoads) * 100)
                : 0}
              % completion rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Revenue
            </CardTitle>
            <BarChart3 className="w-4 h-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${stats.totalRevenue.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Average Rate
            </CardTitle>
            <BarChart3 className="w-4 h-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${Math.round(stats.averageRate).toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Top Origin
            </CardTitle>
            <Calendar className="w-4 h-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.topOrigin}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Top Destination
            </CardTitle>
            <Calendar className="w-4 h-4 text-pink-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.topDestination}</div>
          </CardContent>
        </Card>
      </div>

      {/* Coming Soon */}
      <Card className="bg-gray-50 border-dashed">
        <CardContent className="py-12 text-center">
          <BarChart3 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">
            Advanced Reports Coming Soon
          </h3>
          <p className="text-gray-500 mt-2 max-w-md mx-auto">
            We're building detailed analytics including revenue trends, driver
            performance, lane analysis, and custom date range filtering.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
"""

print("=" * 60)
print("FILE 36: app/(dashboard)/reports/page.tsx")
print("=" * 60)
print(reports_page)
