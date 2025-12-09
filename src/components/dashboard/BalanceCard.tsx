import { ArrowUpRight, ArrowDownRight, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/mockData";
import { cn } from "@/lib/utils";

interface BalanceCardProps {
  balance: number;
  totalSaved: number;
  monthlyGrowth: number;
}

export function BalanceCard({ balance, totalSaved, monthlyGrowth }: BalanceCardProps) {
  const [showBalance, setShowBalance] = useState(true);
  const isPositiveGrowth = monthlyGrowth >= 0;

  return (
    <Card className="hero-gradient text-primary-foreground overflow-hidden relative animate-fade-up">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-primary-foreground/20 -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-primary-foreground/10 translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="relative p-6 md:p-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-primary-foreground/80 text-sm font-medium mb-1">
              Total Savings Balance
            </p>
            <div className="flex items-center gap-3">
              <h2 className="balance-display">
                {showBalance ? formatCurrency(balance) : "••••••"}
              </h2>
              <Button
                variant="ghost"
                size="icon"
                className="text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
                onClick={() => setShowBalance(!showBalance)}
              >
                {showBalance ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-6">
          <div>
            <p className="text-primary-foreground/70 text-xs font-medium mb-1">
              Total Deposited
            </p>
            <p className="text-lg font-semibold">
              {showBalance ? formatCurrency(totalSaved) : "••••••"}
            </p>
          </div>
          <div>
            <p className="text-primary-foreground/70 text-xs font-medium mb-1">
              This Month
            </p>
            <div className="flex items-center gap-1">
              <span
                className={cn(
                  "flex items-center gap-0.5 text-lg font-semibold",
                  isPositiveGrowth ? "text-success-foreground" : "text-destructive-foreground"
                )}
              >
                {isPositiveGrowth ? (
                  <ArrowUpRight className="h-4 w-4" />
                ) : (
                  <ArrowDownRight className="h-4 w-4" />
                )}
                {Math.abs(monthlyGrowth)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
