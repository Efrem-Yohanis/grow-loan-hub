import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format, subDays } from "date-fns";

const metricTitles: Record<string, string> = {
  // Daily metrics
  "daily-active-customers": "Daily Active Customers",
  "daily-gross-adds": "Daily Gross Adds",
  "daily-non-gross-adds": "Daily Non-Gross Adds",
  "daily-app-downloads": "Daily App Downloads",
  "daily-active-micro-merchants": "Daily Active Micro Merchants",
  "daily-active-unified-merchants": "Daily Active Unified Merchants",
  "daily-top-up": "Daily Top Up",
  // 30D metrics
  "30d-active-total": "30D Active Total",
  "30d-active-new": "30D Active New",
  "30d-active-existing": "30D Active Existing",
  "30d-active-transacting-total": "30D Active Transacting Total",
  "30d-active-new-txn": "30D Active New (txn)",
  "30d-active-existing-txn": "30D Active Existing (txn)",
  "30d-active-app-users": "30D Active App Users",
  "30d-app-transacting": "30D App Transacting",
  "30d-active-micro-merchants": "30D Active Micro Merchants",
  "30d-active-unified-merchants": "30D Active Unified Merchants",
  "30d-top-up": "30D Top Up",
  // 90D metrics
  "90d-active-total": "90D Active Total",
  "90d-active-new": "90D Active New",
  "90d-active-existing": "90D Active Existing",
  "90d-active-transacting-total": "90D Active Transacting Total",
  "90d-active-new-txn": "90D Active New (txn)",
  "90d-active-existing-txn": "90D Active Existing (txn)",
};

interface ChartDataItem {
  date: string;
  value: number;
}

export default function MetricDetail() {
  const { metricId } = useParams();
  const [chartType, setChartType] = useState<"bar" | "line">("bar");

  const metricTitle = metricTitles[metricId || ""] || "Metric";

  // Generate mock data for last 9 days (D-1 to D-9)
  const chartData: ChartDataItem[] = useMemo(() => {
    const today = new Date();
    return Array.from({ length: 9 }, (_, i) => {
      const date = subDays(today, i + 1); // D-1 to D-9
      return {
        date: format(date, "MMM dd"),
        value: Math.floor(Math.random() * 50000) + 200000,
      };
    }).reverse(); // Oldest first
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">{metricTitle}</h1>
        <p className="text-muted-foreground mt-1">Last 9 days data</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="chart" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="chart">Chart View</TabsTrigger>
              <TabsTrigger value="table">Table View</TabsTrigger>
            </TabsList>

            <TabsContent value="chart" className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <Button 
                    variant={chartType === "bar" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setChartType("bar")}
                  >
                    Bar
                  </Button>
                  <Button 
                    variant={chartType === "line" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setChartType("line")}
                  >
                    Line
                  </Button>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
              <ResponsiveContainer width="100%" height={400}>
                {chartType === "bar" ? (
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => v.toLocaleString()} />
                    <Tooltip formatter={(value: number) => value.toLocaleString()} />
                    <Bar dataKey="value" fill="hsl(var(--chart-1))" radius={[6, 6, 0, 0]} />
                  </BarChart>
                ) : (
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => v.toLocaleString()} />
                    <Tooltip formatter={(value: number) => value.toLocaleString()} />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="hsl(var(--chart-1))" 
                      strokeWidth={2}
                      dot={{ fill: "hsl(var(--chart-1))", strokeWidth: 2 }}
                    />
                  </LineChart>
                )}
              </ResponsiveContainer>
            </TabsContent>

            <TabsContent value="table" className="space-y-4">
              <div className="flex justify-end">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
              <div className="border rounded-lg overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Value</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {chartData.map((row, idx) => (
                      <TableRow key={idx}>
                        <TableCell>{row.date}</TableCell>
                        <TableCell className="text-right font-medium">{row.value.toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
