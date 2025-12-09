import { Calendar, TrendingUp, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Loan, formatCurrency, formatDate } from "@/lib/mockData";
import { cn } from "@/lib/utils";

interface LoanSummaryProps {
  loan: Loan | null;
}

export function LoanSummary({ loan }: LoanSummaryProps) {
  if (!loan) {
    return (
      <Card variant="elevated" className="animate-fade-up stagger-3" style={{ opacity: 0 }}>
        <CardHeader>
          <CardTitle className="text-lg">Loan Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <div className="h-12 w-12 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="h-6 w-6 text-success" />
            </div>
            <p className="text-muted-foreground mb-4">No active loans</p>
            <Button variant="default">Apply for a Loan</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const progress = (loan.completedPayments / loan.totalPayments) * 100;
  const isOverdue = loan.status === 'overdue';

  return (
    <Card variant="elevated" className="animate-fade-up stagger-3" style={{ opacity: 0 }}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Active Loan</CardTitle>
        <span
          className={cn(
            "px-2.5 py-1 rounded-full text-xs font-medium",
            isOverdue
              ? "bg-destructive/10 text-destructive"
              : "bg-success/10 text-success"
          )}
        >
          {isOverdue ? "Overdue" : "On Track"}
        </span>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-baseline justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Remaining Balance</p>
            <p className="stat-value">{formatCurrency(loan.remainingBalance)}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">of {formatCurrency(loan.amount)}</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Repayment Progress</span>
            <span className="font-medium">{loan.completedPayments}/{loan.totalPayments} payments</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className={cn(
          "flex items-center gap-3 p-3 rounded-lg",
          isOverdue ? "bg-destructive/10" : "bg-primary/5"
        )}>
          {isOverdue ? (
            <AlertCircle className="h-5 w-5 text-destructive" />
          ) : (
            <Calendar className="h-5 w-5 text-primary" />
          )}
          <div className="flex-1">
            <p className="text-sm font-medium">
              Next Payment: {formatCurrency(loan.monthlyPayment)}
            </p>
            <p className="text-xs text-muted-foreground">
              Due {formatDate(loan.nextPaymentDate)}
            </p>
          </div>
          <Button size="sm" variant={isOverdue ? "destructive" : "default"}>
            Pay Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
