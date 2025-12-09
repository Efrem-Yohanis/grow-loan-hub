import { Check, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SavingsPlan, formatCurrency } from "@/lib/mockData";
import { cn } from "@/lib/utils";

interface SavingsPlanCardProps {
  plan: SavingsPlan;
  isSelected?: boolean;
  onSelect?: () => void;
}

export function SavingsPlanCard({ plan, isSelected, onSelect }: SavingsPlanCardProps) {
  return (
    <Card
      variant={plan.isPopular ? "elevated" : "default"}
      className={cn(
        "relative transition-all duration-300 hover:shadow-lg cursor-pointer",
        isSelected && "ring-2 ring-primary shadow-glow",
        plan.isPopular && "border-primary/30"
      )}
      onClick={onSelect}
    >
      {plan.isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
            <Star className="h-3 w-3" />
            Most Popular
          </span>
        </div>
      )}

      <CardHeader className={cn("pb-4", plan.isPopular && "pt-8")}>
        <CardTitle className="text-xl">{plan.name}</CardTitle>
        <p className="text-sm text-muted-foreground">{plan.description}</p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Interest Rate */}
        <div className="text-center pb-4 border-b border-border">
          <div className="stat-value text-primary">{plan.interestRate}%</div>
          <p className="text-sm text-muted-foreground">Annual Interest Rate</p>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="p-3 rounded-lg bg-secondary">
            <p className="text-lg font-bold">{plan.loanMultiplier}x</p>
            <p className="text-xs text-muted-foreground">Loan Multiplier</p>
          </div>
          <div className="p-3 rounded-lg bg-secondary">
            <p className="text-lg font-bold">{plan.minDuration}</p>
            <p className="text-xs text-muted-foreground">Months Min</p>
          </div>
        </div>

        {/* Features */}
        <ul className="space-y-2">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2 text-sm">
              <Check className="h-4 w-4 text-success flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        {/* Min Balance */}
        <div className="pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground text-center">
            Minimum Balance: <span className="font-semibold text-foreground">{formatCurrency(plan.minBalance)}</span>
          </p>
        </div>

        {/* CTA */}
        <Button
          variant={isSelected ? "default" : plan.isPopular ? "default" : "outline"}
          className="w-full"
        >
          {isSelected ? "Selected" : "Select Plan"}
        </Button>
      </CardContent>
    </Card>
  );
}
