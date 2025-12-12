import { useState, useEffect } from "react";
import { MetricCard } from "@/components/MetricCard";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

// Full metrics list with types and slugs
const metrics = [
  // Daily Metrics
  { title: "Daily Active Customers", slug: "daily-active-customers", type: "daily" as const },
  { title: "Daily Gross Adds", slug: "daily-gross-adds", type: "daily" as const },
  { title: "Daily Non-Gross Adds", slug: "daily-non-gross-adds", type: "daily" as const },
  { title: "Daily App Downloads", slug: "daily-app-downloads", type: "daily" as const },
  { title: "Daily Active Micro Merchants", slug: "daily-active-micro-merchants", type: "daily" as const },
  { title: "Daily Active Unified Merchants", slug: "daily-active-unified-merchants", type: "daily" as const },
  { title: "Daily Top Up", slug: "daily-top-up", type: "daily" as const },
  
  // 30D Metrics
  { title: "30D Active Total", slug: "30d-active-total", type: "30d" as const },
  { title: "30D Active New", slug: "30d-active-new", type: "30d" as const },
  { title: "30D Active Existing", slug: "30d-active-existing", type: "30d" as const },
  { title: "30D Active Transacting Total", slug: "30d-active-transacting-total", type: "30d" as const },
  { title: "30D Active New (txn)", slug: "30d-active-new-txn", type: "30d" as const },
  { title: "30D Active Existing (txn)", slug: "30d-active-existing-txn", type: "30d" as const },
  { title: "30D Active App Users", slug: "30d-active-app-users", type: "30d" as const },
  { title: "30D App Transacting", slug: "30d-app-transacting", type: "30d" as const },
  { title: "30D Active Micro Merchants", slug: "30d-active-micro-merchants", type: "30d" as const },
  { title: "30D Active Unified Merchants", slug: "30d-active-unified-merchants", type: "30d" as const },
  { title: "30D Top Up", slug: "30d-top-up", type: "30d" as const },
  
  // 90D Metrics
  { title: "90D Active Total", slug: "90d-active-total", type: "90d" as const },
  { title: "90D Active New", slug: "90d-active-new", type: "90d" as const },
  { title: "90D Active Existing", slug: "90d-active-existing", type: "90d" as const },
  { title: "90D Active Transacting Total", slug: "90d-active-transacting-total", type: "90d" as const },
  { title: "90D Active New (txn)", slug: "90d-active-new-txn", type: "90d" as const },
  { title: "90D Active Existing (txn)", slug: "90d-active-existing-txn", type: "90d" as const },
];

// Generate mock data for a metric
const generateMockValue = (type: "daily" | "30d" | "90d") => {
  if (type === "daily") return Math.floor(Math.random() * 50000) + 200000;
  if (type === "30d") return Math.floor(Math.random() * 500000) + 1000000;
  return Math.floor(Math.random() * 1500000) + 3000000;
};

const generatePreviousValue = (currentValue: number) => {
  const changePercent = (Math.random() - 0.5) * 0.4; // -20% to +20%
  return Math.floor(currentValue / (1 + changePercent));
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [metricsData, setMetricsData] = useState<Record<string, { value: number; previousValue: number }>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data - in production, this would call the API
    const fetchData = async () => {
      setLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const data: Record<string, { value: number; previousValue: number }> = {};
      metrics.forEach(metric => {
        const currentValue = generateMockValue(metric.type);
        data[metric.slug] = {
          value: currentValue,
          previousValue: generatePreviousValue(currentValue),
        };
      });
      setMetricsData(data);
      setLoading(false);
    };
    
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-primary opacity-5 blur-3xl -z-10" />
        <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">MPESA CVM Dashboard</h1>
        <p className="text-muted-foreground mt-1 text-sm">Real-time overview of all key metrics</p>
      </div>

      {/* 4-column responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, idx) => {
          const data = metricsData[metric.slug];
          return (
            <div 
              key={metric.slug} 
              className="animate-fade-in" 
              style={{ animationDelay: `${idx * 30}ms` }}
            >
              <MetricCard
                title={metric.title}
                value={data?.value || 0}
                previousValue={data?.previousValue || 0}
                type={metric.type}
                onNavigate={() => navigate(`/metric/${metric.slug}`)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
