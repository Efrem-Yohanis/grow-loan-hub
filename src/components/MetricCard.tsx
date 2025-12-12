import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: number;
  type: "daily" | "30d" | "90d";
  sparklineData?: number[];
  onNavigate?: () => void;
}

const typeColors = {
  daily: "from-blue-500/20 to-blue-600/5 border-blue-500/30",
  "30d": "from-emerald-500/20 to-emerald-600/5 border-emerald-500/30",
  "90d": "from-violet-500/20 to-violet-600/5 border-violet-500/30",
};

const typeAccents = {
  daily: "text-blue-600 dark:text-blue-400",
  "30d": "text-emerald-600 dark:text-emerald-400",
  "90d": "text-violet-600 dark:text-violet-400",
};

const typeBadgeColors = {
  daily: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  "30d": "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  "90d": "bg-violet-500/10 text-violet-600 dark:text-violet-400",
};

// Simple sparkline component
function Sparkline({ data, color }: { data: number[]; color: string }) {
  if (!data || data.length < 2) return null;
  
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const width = 80;
  const height = 24;
  
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width;
    const y = height - ((value - min) / range) * height;
    return `${x},${y}`;
  }).join(" ");
  
  return (
    <svg width={width} height={height} className="overflow-visible">
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        points={points}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function getTrendIndicator(data?: number[]) {
  if (!data || data.length < 2) return { icon: Minus, trend: "neutral" };
  const lastValue = data[data.length - 1];
  const prevValue = data[data.length - 2];
  if (lastValue > prevValue) return { icon: TrendingUp, trend: "up" };
  if (lastValue < prevValue) return { icon: TrendingDown, trend: "down" };
  return { icon: Minus, trend: "neutral" };
}

export function MetricCard({ title, value, type, sparklineData, onNavigate }: MetricCardProps) {
  const { icon: TrendIcon, trend } = getTrendIndicator(sparklineData);
  const sparklineColor = type === "daily" ? "hsl(210, 100%, 50%)" : type === "30d" ? "hsl(160, 84%, 39%)" : "hsl(262, 83%, 58%)";
  
  return (
    <Card 
      className={cn(
        "group relative overflow-hidden cursor-pointer transition-all duration-300",
        "hover:shadow-lg hover:scale-[1.02] hover:-translate-y-0.5",
        "bg-gradient-to-br border",
        typeColors[type]
      )}
      onClick={onNavigate}
    >
      <CardHeader className="pb-2 pt-3 px-4">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-xs font-medium text-muted-foreground leading-tight line-clamp-2 min-h-[2rem]">
            {title}
          </CardTitle>
          <span className={cn("text-[10px] font-semibold px-1.5 py-0.5 rounded uppercase", typeBadgeColors[type])}>
            {type === "daily" ? "D" : type === "30d" ? "30D" : "90D"}
          </span>
        </div>
      </CardHeader>
      <CardContent className="pb-3 px-4">
        <div className="flex items-end justify-between gap-2">
          <div className="flex items-center gap-2">
            <p className={cn("text-xl font-bold", typeAccents[type])}>
              {value.toLocaleString()}
            </p>
            <TrendIcon 
              className={cn(
                "h-4 w-4",
                trend === "up" && "text-emerald-500",
                trend === "down" && "text-red-500",
                trend === "neutral" && "text-muted-foreground"
              )}
            />
          </div>
          {sparklineData && sparklineData.length > 1 && (
            <Sparkline data={sparklineData} color={sparklineColor} />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
