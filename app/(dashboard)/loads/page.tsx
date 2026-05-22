
# Generate app/(dashboard)/loads/page.tsx - Load Board

loads_page = """"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Filter, Truck } from "lucide-react";

interface Load {
  id: string;
  loadNumber: string;
  origin: string;
  destination: string;
  pickupDate: string;
  deliveryDate: string | null;
  status: string;
  rate: number | null;
  driver: { name: string } | null;
}

export default function LoadsPage() {
  const [loads, setLoads] = useState<Load[]>([]);
  const [filter, setFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLoads();
  }, []);

  async function fetchLoads() {
    try {
      const res = await fetch("/api/loads");
      const data = await res.json();
      setLoads(data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch loads:", error);
      setLoading(false);
    }
  }

  const filteredLoads =
    filter === "ALL"
      ? loads
      : loads.filter((load) => load.status === filter);

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

  const statusFilters = [
    "ALL",
    "PENDING",
    "ASSIGNED",
    "PICKED_UP",
    "IN_TRANSIT",
    "DELIVERED",
  ];

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
          <h1 className="text-3xl font-bold text-gray-900">Load Board</h1>
          <p className="text-gray-500 mt-1">
            Manage and track all your loads
          </p>
        </div>
        <Link href="/loads/new">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            New Load
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 flex-wrap">
        <Filter className="w-4 h-4 text-gray-500" />
        {statusFilters.map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              filter === status
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {status === "ALL" ? "All" : status.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* Loads Table */}
      <Card>
        <CardContent className="p-0">
          {filteredLoads.length === 0 ? (
            <div className="text-center py-16">
              <Truck className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg font-medium">
                No loads found
              </p>
              <p className="text-gray-400 text-sm mt-1">
                {filter === "ALL"
                  ? "Create your first load to get started"
                  : `No ${filter.replace("_", " ").toLowerCase()} loads`}
              </p>
              <Link href="/loads/new" className="mt-4 inline-block">
                <Button variant="outline" className="gap-2">
                  <Plus className="w-4 h-4" />
                  Create Load
                </Button>
              </Link>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Load #</TableHead>
                  <TableHead>Route</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Driver</TableHead>
                  <TableHead>Rate</TableHead>
                  <TableHead>Pickup</TableHead>
                  <TableHead>Delivery</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLoads.map((load) => (
                  <TableRow key={load.id} className="cursor-pointer hover:bg-gray-50">
                    <TableCell className="font-medium">
                      {load.loadNumber}
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{load.origin}</div>
                        <div className="text-gray-400">→ {load.destination}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(load.status)}>
                        {load.status.replace("_", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {load.driver ? (
                        <span className="text-sm">{load.driver.name}</span>
                      ) : (
                        <span className="text-sm text-gray-400">Unassigned</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {load.rate ? (
                        <span className="font-medium">
                          ${load.rate.toLocaleString()}
                        </span>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">
                      {new Date(load.pickupDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">
                      {load.deliveryDate
                        ? new Date(load.deliveryDate).toLocaleDateString()
                        : "—"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
"""

print("=" * 60)
print("FILE 28: app/(dashboard)/loads/page.tsx")
print("=" * 60)
print(loads_page)

