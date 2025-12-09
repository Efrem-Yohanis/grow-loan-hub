import { Landmark, Calendar, Percent, CreditCard } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Loan, formatCurrency, formatDate } from "@/lib/mockData";
import { cn } from "@/lib/utils";

interface LoanDetailsCardProps {
  loan: Loan;
}

export function LoanDetailsCard({ loan }: LoanDetailsCardProps) {
  const progress = (loan.completedPayments / loan.totalPayments) * 100;
  const paidAmount = loan.amount - loan.remainingBalance;

  return (
    <Card className="hero-gradient text-primary-foreground overflow-hidden animate-fade-up">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Landmark className="h-5 w-5" />
            Active Loan
          </CardTitle>
          <span className={cn(
            "px-3 py-1 rounded-full text-xs font-semibold",
            loan.status === 'active' && "bg-primary-foreground/20",
            loan.status === 'overdue' && "bg-destructive/80"
          )}>
            {loan.status === 'active' ? 'On Track' : 'Overdue'}
          </span>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Main Balance */}
        <div className="text-center pt-4">
          <p className="text-primary-foreground/80 text-sm mb-1">Remaining Balance</p>
          <p className="balance-display">{formatCurrency(loan.remainingBalance)}</p>
          <p className="text-sm text-primary-foreground/70 mt-1">
            of {formatCurrency(loan.amount)} total
          </p>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-primary-foreground/80">Payment Progress</span>
            <span className="font-semibold">
              {loan.completedPayments} of {loan.totalPayments}
            </span>
          </div>
          <Progress value={progress} className="h-3 bg-primary-foreground/20" />
          <div className="flex justify-between text-xs text-primary-foreground/70">
            <span>Paid: {formatCurrency(paidAmount)}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 rounded-xl bg-primary-foreground/10 text-center">
            <Percent className="h-4 w-4 mx-auto mb-1 opacity-80" />
            <p className="text-lg font-bold">{loan.interestRate}%</p>
            <p className="text-xs opacity-70">Interest</p>
          </div>
          <div className="p-3 rounded-xl bg-primary-foreground/10 text-center">
            <CreditCard className="h-4 w-4 mx-auto mb-1 opacity-80" />
            <p className="text-lg font-bold">{formatCurrency(loan.monthlyPayment)}</p>
            <p className="text-xs opacity-70">Monthly</p>
          </div>
          <div className="p-3 rounded-xl bg-primary-foreground/10 text-center">
            <Calendar className="h-4 w-4 mx-auto mb-1 opacity-80" />
            <p className="text-lg font-bold">{loan.totalPayments - loan.completedPayments}</p>
            <p className="text-xs opacity-70">Remaining</p>
          </div>
        </div>

        {/* Next Payment */}
        <div className="p-4 rounded-xl bg-primary-foreground/15">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Next Payment Due</p>
              <p className="text-xs opacity-70">{formatDate(loan.nextPaymentDate)}</p>
            </div>
            <Button 
              variant="secondary" 
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            >
              Pay {formatCurrency(loan.monthlyPayment)}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
