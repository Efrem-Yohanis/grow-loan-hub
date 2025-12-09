import { useState } from "react";
import { Calculator, TrendingUp, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { SavingsPlan, savingsPlans, formatCurrency, calculateLoanEligibility } from "@/lib/mockData";
import { cn } from "@/lib/utils";

interface LoanEligibilityCalculatorProps {
  currentBalance: number;
  currentPlan?: SavingsPlan | null;
}

export function LoanEligibilityCalculator({ currentBalance, currentPlan }: LoanEligibilityCalculatorProps) {
  const [selectedPlanId, setSelectedPlanId] = useState(currentPlan?.id || 'growth');
  const [savingsAmount, setSavingsAmount] = useState(currentBalance);

  const selectedPlan = savingsPlans.find(p => p.id === selectedPlanId) || savingsPlans[1];
  const eligibleAmount = calculateLoanEligibility(savingsAmount, selectedPlan);

  return (
    <Card variant="elevated" className="animate-fade-up">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Calculator className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-xl">Loan Eligibility Calculator</CardTitle>
            <CardDescription>See how much you can borrow based on your savings</CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Savings Amount Slider */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium">Your Savings Amount</label>
            <span className="stat-value text-primary">{formatCurrency(savingsAmount)}</span>
          </div>
          <Slider
            value={[savingsAmount]}
            onValueChange={([value]) => setSavingsAmount(value)}
            min={1000}
            max={100000}
            step={500}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{formatCurrency(1000)}</span>
            <span>{formatCurrency(100000)}</span>
          </div>
        </div>

        {/* Plan Selection */}
        <div className="space-y-3">
          <label className="text-sm font-medium">Select Savings Plan</label>
          <div className="grid grid-cols-3 gap-2">
            {savingsPlans.map((plan) => (
              <button
                key={plan.id}
                onClick={() => setSelectedPlanId(plan.id)}
                className={cn(
                  "p-3 rounded-xl border-2 transition-all duration-200 text-center",
                  selectedPlanId === plan.id
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                )}
              >
                <p className="font-semibold text-sm">{plan.name.split(' ')[0]}</p>
                <p className="text-xs text-muted-foreground">{plan.loanMultiplier}x</p>
              </button>
            ))}
          </div>
        </div>

        {/* Result */}
        <div className="p-6 rounded-2xl hero-gradient text-primary-foreground text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <TrendingUp className="h-5 w-5" />
            <p className="text-sm font-medium opacity-90">You're Eligible For</p>
          </div>
          <p className="balance-display mb-2">{formatCurrency(eligibleAmount)}</p>
          <p className="text-sm opacity-80">
            Based on {formatCurrency(savingsAmount)} savings with {selectedPlan.loanMultiplier}x multiplier
          </p>
        </div>

        {/* Info Box */}
        <div className="flex items-start gap-3 p-4 rounded-lg bg-info/10 border border-info/20">
          <Info className="h-5 w-5 text-info mt-0.5 flex-shrink-0" />
          <div className="text-sm">
            <p className="font-medium text-info">How it works</p>
            <p className="text-muted-foreground">
              Your loan eligibility is calculated by multiplying your savings balance by the plan's 
              loan multiplier. Higher tier plans offer better multipliers for larger loan amounts.
            </p>
          </div>
        </div>

        <Button variant="default" size="lg" className="w-full">
          Apply for Loan
        </Button>
      </CardContent>
    </Card>
  );
}
