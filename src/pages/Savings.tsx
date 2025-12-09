import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { SavingsPlanCard } from "@/components/savings/SavingsPlanCard";
import { LoanEligibilityCalculator } from "@/components/savings/LoanEligibilityCalculator";
import { TransactionList } from "@/components/dashboard/TransactionList";
import { BalanceCard } from "@/components/dashboard/BalanceCard";
import { savingsPlans, mockUser } from "@/lib/mockData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Savings = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(
    mockUser.currentPlan?.id || null
  );

  return (
    <AppLayout>
      <div className="container py-6 space-y-6">
        {/* Header */}
        <div className="animate-fade-up">
          <h1 className="text-2xl md:text-3xl font-bold">Savings</h1>
          <p className="text-muted-foreground">Manage your savings and explore plans</p>
        </div>

        {/* Balance Overview */}
        <BalanceCard
          balance={mockUser.savingsBalance}
          totalSaved={mockUser.totalSaved}
          monthlyGrowth={8.5}
        />

        {/* Tabs */}
        <Tabs defaultValue="plans" className="animate-fade-up stagger-1" style={{ opacity: 0 }}>
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="plans">Savings Plans</TabsTrigger>
            <TabsTrigger value="calculator">Loan Calculator</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="plans" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              {savingsPlans.map((plan) => (
                <SavingsPlanCard
                  key={plan.id}
                  plan={plan}
                  isSelected={selectedPlan === plan.id}
                  onSelect={() => setSelectedPlan(plan.id)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="calculator">
            <LoanEligibilityCalculator
              currentBalance={mockUser.savingsBalance}
              currentPlan={mockUser.currentPlan}
            />
          </TabsContent>

          <TabsContent value="history">
            <TransactionList 
              transactions={mockUser.transactions.filter(
                t => t.category === 'deposit' || t.category === 'withdrawal' || t.category === 'interest'
              )} 
              limit={20} 
            />
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Savings;
