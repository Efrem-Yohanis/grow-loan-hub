import { Calendar, Check, Clock, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loan, formatCurrency, formatDate } from "@/lib/mockData";
import { cn } from "@/lib/utils";
import { addMonths } from "date-fns";

interface LoanRepaymentScheduleProps {
  loan: Loan;
}

export function LoanRepaymentSchedule({ loan }: LoanRepaymentScheduleProps) {
  const startDate = new Date(loan.startDate);
  
  const schedule = Array.from({ length: loan.totalPayments }, (_, index) => {
    const paymentDate = addMonths(startDate, index + 1);
    const isCompleted = index < loan.completedPayments;
    const isCurrent = index === loan.completedPayments;
    const isOverdue = isCurrent && loan.status === 'overdue';

    return {
      month: index + 1,
      date: paymentDate,
      amount: loan.monthlyPayment,
      isCompleted,
      isCurrent,
      isOverdue,
    };
  });

  return (
    <Card variant="elevated" className="animate-fade-up">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          Repayment Schedule
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />

          <div className="space-y-4">
            {schedule.map((payment) => (
              <div
                key={payment.month}
                className={cn(
                  "relative flex items-center gap-4 pl-10",
                  payment.isCurrent && "py-3 -mx-4 px-4 rounded-lg bg-primary/5"
                )}
              >
                {/* Timeline dot */}
                <div
                  className={cn(
                    "absolute left-2 h-5 w-5 rounded-full flex items-center justify-center",
                    payment.isCompleted && "bg-success text-success-foreground",
                    payment.isCurrent && !payment.isOverdue && "bg-primary text-primary-foreground",
                    payment.isOverdue && "bg-destructive text-destructive-foreground",
                    !payment.isCompleted && !payment.isCurrent && "bg-muted border-2 border-border"
                  )}
                >
                  {payment.isCompleted && <Check className="h-3 w-3" />}
                  {payment.isCurrent && !payment.isOverdue && <Clock className="h-3 w-3" />}
                  {payment.isOverdue && <AlertCircle className="h-3 w-3" />}
                </div>

                <div className="flex-1 flex items-center justify-between">
                  <div>
                    <p className={cn(
                      "font-medium",
                      payment.isCompleted && "text-muted-foreground"
                    )}>
                      Payment {payment.month}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(payment.date.toISOString())}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={cn(
                      "font-semibold",
                      payment.isCompleted && "text-muted-foreground",
                      payment.isOverdue && "text-destructive"
                    )}>
                      {formatCurrency(payment.amount)}
                    </p>
                    {payment.isCompleted && (
                      <span className="text-xs text-success">Paid</span>
                    )}
                    {payment.isCurrent && !payment.isOverdue && (
                      <span className="text-xs text-primary">Due</span>
                    )}
                    {payment.isOverdue && (
                      <span className="text-xs text-destructive">Overdue</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
