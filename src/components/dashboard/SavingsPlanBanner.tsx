import { TrendingUp, ChevronRight, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { SavingsPlan, formatDate } from "@/lib/mockData";
import { differenceInDays, addMonths } from "date-fns";

interface SavingsPlanBannerProps {
  plan: SavingsPlan | null;
  startDate: string | null;
}

export function SavingsPlanBanner({ plan, startDate }: SavingsPlanBannerProps) {
  if (!plan || !startDate) {
    return (
      <Card className="bg-gradient-to-r from-accent/10 to-warning/10 border-accent/20 animate-fade-up stagger-1" style={{ opacity: 0 }}>
        <CardContent className="p-4 md:p-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-accent/20 flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-accent" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">Unlock Better Returns</h3>
              <p className="text-sm text-muted-foreground">
                Choose a savings plan to increase your loan eligibility
              </p>
            </div>
            <Button variant="accent" size="sm">
              View Plans
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const endDate = addMonths(new Date(startDate), plan.minDuration);
  const totalDays = differenceInDays(endDate, new Date(startDate));
  const daysElapsed = differenceInDays(new Date(), new Date(startDate));
  const progress = Math.min((daysElapsed / totalDays) * 100, 100);
  const daysRemaining = Math.max(differenceInDays(endDate, new Date()), 0);

  return (
    <Card variant="elevated" className="animate-fade-up stagger-1" style={{ opacity: 0 }}>
      <CardContent className="p-4 md:p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">{plan.name}</h3>
              <p className="text-sm text-muted-foreground">
                {plan.interestRate}% APY • {plan.loanMultiplier}x loan eligibility
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm">
            Details
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Plan Progress</span>
            <span className="font-medium">
              {daysRemaining > 0 ? `${daysRemaining} days remaining` : "Completed!"}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-muted-foreground">
            Started {formatDate(startDate)} • Matures {formatDate(endDate.toISOString())}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
