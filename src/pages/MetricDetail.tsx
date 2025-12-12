import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Download, Calendar as CalendarIcon, Loader2, RefreshCw } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const metricTitles: Record<string, string> = {
  // Daily metrics
  "daily-active-customers": "Daily Active Customers",
  "daily-gross-adds": "Daily Gross Adds",
  "daily-non-gross-adds": "Daily Non-Gross Adds",
  "daily-app-downloads": "Daily App Downloads",
  "daily-active-micro-merchants": "Daily Active Micro Merchants",
  "daily-active-unified-merchants": "Daily Active Unified Merchants",
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
  // 90D metrics
  "90d-active-total": "90D Active Total",
  "90d-active-new": "90D Active New",
  "90d-active-existing": "90D Active Existing",
  "90d-active-transacting-total": "90D Active Transacting Total",
  "90d-active-new-txn": "90D Active New (txn)",
  "90d-active-existing-txn": "90D Active Existing (txn)",
};

// API endpoint mapping for each metric (add as APIs become available)
const metricApiEndpoints: Record<string, { cardView: string; data: string }> = {
  "30d-active-total": {
    cardView: "/api/active-users/card-view",
    data: "/api/active-users/data",
  },
  "30d-active-new": {
    cardView: "/api/new-customers/card-view",
    data: "/api/new-customers/data",
  },
};

interface ChartDataItem {
  date: string;
  value: number;
}

export default function MetricDetail() {
  const { metricId } = useParams();
  const { toast } = useToast();
  const [chartPeriod, setChartPeriod] = useState("30-day");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [frequency, setFrequency] = useState<string>("daily");

  // Data states
  const [chartData, setChartData] = useState<ChartDataItem[]>([]);
  const [loadingChart, setLoadingChart] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);

  const metricTitle = metricTitles[metricId || ""] || "Metric";
  const apiEndpoints = metricId ? metricApiEndpoints[metricId] : null;
  const hasApiIntegration = !!apiEndpoints;

  // Fetch chart/table data
  const fetchChartData = useCallback(async () => {
    if (!apiEndpoints) return;
    setLoadingChart(true);
    try {
      const params = new URLSearchParams();

      if (chartPeriod === "daily") {
        params.append("period", "daily");
      } else if (chartPeriod === "30-day") {
        params.append("period", "30day");
      } else if (chartPeriod === "90-day") {
        params.append("period", "90day");
      } else if (chartPeriod === "custom" && startDate && endDate) {
        params.append("period", "custom");
        params.append("start_date", format(startDate, "yyyy-MM-dd"));
        params.append("end_date", format(endDate, "yyyy-MM-dd"));
        params.append("frequency", frequency);
      } else {
        setLoadingChart(false);
        return;
      }

      const url = `${API_BASE_URL}${apiEndpoints.data}?${params.toString()}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch chart data");
      
      const data = await response.json();
      
      if (data.results && Array.isArray(data.results)) {
        setChartData(data.results);
      } else if (Array.isArray(data)) {
        setChartData(data);
      } else {
        setChartData([]);
      }
      setLastRefresh(new Date());
    } catch (error) {
      console.error("Error fetching chart data:", error);
      toast({
        title: "Error",
        description: "Failed to fetch chart data from server",
        variant: "destructive",
      });
    } finally {
      setLoadingChart(false);
    }
  }, [apiEndpoints, chartPeriod, startDate, endDate, frequency, toast]);

  // Refresh data
  const handleRefresh = useCallback(() => {
    fetchChartData();
  }, [fetchChartData]);

  // Initial load and on period change
  useEffect(() => {
    if (hasApiIntegration) {
      fetchChartData();
    }
  }, [fetchChartData, hasApiIntegration]);

  // Fallback mock data for metrics without API
  const generateMockData = (period: string) => {
    if (period === "daily") {
      return Array.from({ length: 7 }, (_, i) => ({
        date: format(new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000), "MMM dd"),
        value: Math.floor(Math.random() * 50000) + 200000,
      }));
    } else if (period === "30-day") {
      return Array.from({ length: 30 }, (_, i) => ({
        date: format(new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000), "MMM dd"),
        value: Math.floor(Math.random() * 50000) + 200000,
      }));
    } else {
      return Array.from({ length: 3 }, (_, i) => ({
        date: `Month ${i + 1}`,
        value: Math.floor(Math.random() * 1500000) + 3000000,
      }));
    }
  };

  // Chart data (use API data for integrated metrics, mock for others)
  const displayChartData = hasApiIntegration ? chartData : generateMockData(chartPeriod);
  const mean = chartPeriod === "30-day" && displayChartData.length > 0 
    ? displayChartData.reduce((acc, d) => acc + d.value, 0) / displayChartData.length 
    : null;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{metricTitle}</h1>
          <p className="text-muted-foreground mt-1">Detailed analysis and trends</p>
        </div>
        {hasApiIntegration && (
          <div className="flex items-center gap-3">
            {lastRefresh && (
              <span className="text-sm text-muted-foreground">
                Last Refresh: {format(lastRefresh, "PPpp")}
              </span>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={loadingChart}
            >
              <RefreshCw className={cn("h-4 w-4 mr-2", loadingChart && "animate-spin")} />
              Refresh
            </Button>
          </div>
        )}
      </div>

      {/* Chart & Table Tabs - No Cards */}
      <Card>
        <CardHeader>
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <CardTitle>Analysis</CardTitle>
              <Select value={chartPeriod} onValueChange={setChartPeriod}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily (7 days)</SelectItem>
                  <SelectItem value="30-day">30-Day</SelectItem>
                  <SelectItem value="90-day">90-Day (3 months)</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {chartPeriod === "custom" && (
              <div className="flex flex-wrap gap-4 items-end">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Start Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-[200px] justify-start text-left font-normal",
                          !startDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">End Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-[200px] justify-start text-left font-normal",
                          !endDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Frequency</label>
                  <Select value={frequency} onValueChange={setFrequency}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="chart" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="chart">Chart View</TabsTrigger>
              <TabsTrigger value="table">Table View</TabsTrigger>
            </TabsList>

            <TabsContent value="chart" className="space-y-4">
              <div className="flex justify-end">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
              {loadingChart ? (
                <div className="flex items-center justify-center h-[400px]">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={displayChartData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" height={80} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    {mean && <ReferenceLine y={mean} stroke="hsl(var(--accent))" strokeDasharray="3 3" label="Mean" />}
                    <Bar dataKey="value" fill="hsl(var(--chart-1))" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </TabsContent>

            <TabsContent value="table" className="space-y-4">
              <div className="flex justify-end">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
              {loadingChart ? (
                <div className="flex items-center justify-center h-[200px]">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : (
                <div className="border rounded-lg overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        {displayChartData.map((row, idx) => (
                          <TableHead key={idx} className="text-right">{row.date}</TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Metric Value</TableCell>
                        {displayChartData.map((row, idx) => (
                          <TableCell key={idx} className="text-right font-medium">{row.value.toLocaleString()}</TableCell>
                        ))}
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
