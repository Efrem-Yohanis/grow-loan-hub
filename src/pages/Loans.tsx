import { AppLayout } from "@/components/layout/AppLayout";
import { LoanDetailsCard } from "@/components/loans/LoanDetailsCard";
import { LoanRepaymentSchedule } from "@/components/loans/LoanRepaymentSchedule";
import { LoanEligibilityCalculator } from "@/components/savings/LoanEligibilityCalculator";
import { TransactionList } from "@/components/dashboard/TransactionList";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockUser, mockLoan } from "@/lib/mockData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Download, Calculator } from "lucide-react";

const Loans = () => {
  const hasActiveLoan = mockUser.activeLoan !== null;
  const loanTransactions = mockUser.transactions.filter(
    t => t.category === 'loan_disbursement' || t.category === 'loan_repayment'
  );

  return (
    <AppLayout>
      <div className="container py-6 space-y-6">
        {/* Header */}
        <div className="animate-fade-up">
          <h1 className="text-2xl md:text-3xl font-bold">Loans</h1>
          <p className="text-muted-foreground">Manage your loans and repayments</p>
        </div>

        {hasActiveLoan ? (
          <>
            {/* Active Loan Details */}
            <LoanDetailsCard loan={mockLoan} />

            {/* Tabs */}
            <Tabs defaultValue="schedule" className="animate-fade-up stagger-1" style={{ opacity: 0 }}>
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="schedule">Schedule</TabsTrigger>
                <TabsTrigger value="history">Payment History</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
              </TabsList>

              <TabsContent value="schedule">
                <LoanRepaymentSchedule loan={mockLoan} />
              </TabsContent>

              <TabsContent value="history">
                <TransactionList transactions={loanTransactions} limit={20} />
              </TabsContent>

              <TabsContent value="documents">
                <Card variant="elevated">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      Loan Documents
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      { name: 'Loan Agreement', date: 'Oct 5, 2023' },
                      { name: 'Repayment Schedule', date: 'Oct 5, 2023' },
                      { name: 'Terms & Conditions', date: 'Oct 5, 2023' },
                    ].map((doc) => (
                      <div
                        key={doc.name}
                        className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-secondary/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">{doc.name}</p>
                            <p className="text-sm text-muted-foreground">{doc.date}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        ) : (
          <>
            {/* No Active Loan */}
            <Card variant="elevated" className="animate-fade-up">
              <CardContent className="py-12 text-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Calculator className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-xl font-semibold mb-2">No Active Loans</h2>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  You don't have any active loans. Use the calculator below to see 
                  how much you're eligible to borrow based on your savings.
                </p>
                <Button variant="default" size="lg">
                  Apply for a Loan
                </Button>
              </CardContent>
            </Card>

            {/* Loan Calculator */}
            <LoanEligibilityCalculator
              currentBalance={mockUser.savingsBalance}
              currentPlan={mockUser.currentPlan}
            />
          </>
        )}
      </div>
    </AppLayout>
  );
};

export default Loans;
