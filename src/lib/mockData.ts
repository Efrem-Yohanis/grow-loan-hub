export interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  category: 'deposit' | 'withdrawal' | 'interest' | 'loan_disbursement' | 'loan_repayment';
  amount: number;
  description: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

export interface SavingsPlan {
  id: string;
  name: string;
  description: string;
  interestRate: number;
  minDuration: number; // months
  loanMultiplier: number;
  minBalance: number;
  features: string[];
  isPopular?: boolean;
}

export interface Loan {
  id: string;
  amount: number;
  remainingBalance: number;
  interestRate: number;
  monthlyPayment: number;
  nextPaymentDate: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'paid' | 'overdue';
  totalPayments: number;
  completedPayments: number;
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  phone: string;
  savingsBalance: number;
  totalSaved: number;
  currentPlan: SavingsPlan | null;
  planStartDate: string | null;
  activeLoan: Loan | null;
  transactions: Transaction[];
}

export const savingsPlans: SavingsPlan[] = [
  {
    id: 'basic',
    name: 'Basic Saver',
    description: 'Start your savings journey with our entry-level plan',
    interestRate: 3.5,
    minDuration: 3,
    loanMultiplier: 1.5,
    minBalance: 1000,
    features: [
      'No monthly fees',
      'Free withdrawals',
      '1.5x loan eligibility',
      'Mobile access'
    ]
  },
  {
    id: 'growth',
    name: 'Growth Plus',
    description: 'Accelerate your savings with higher returns',
    interestRate: 5.5,
    minDuration: 6,
    loanMultiplier: 2.5,
    minBalance: 5000,
    features: [
      'Higher interest rate',
      '2.5x loan eligibility',
      'Priority support',
      'Quarterly bonuses',
      'Financial insights'
    ],
    isPopular: true
  },
  {
    id: 'premium',
    name: 'Premium Saver',
    description: 'Maximum benefits for serious savers',
    interestRate: 7.5,
    minDuration: 12,
    loanMultiplier: 4,
    minBalance: 10000,
    features: [
      'Highest interest rate',
      '4x loan eligibility',
      'Dedicated advisor',
      'Exclusive offers',
      'Insurance coverage',
      'Emergency fund access'
    ]
  }
];

export const mockTransactions: Transaction[] = [
  {
    id: 't1',
    type: 'credit',
    category: 'deposit',
    amount: 5000,
    description: 'Monthly savings deposit',
    date: '2024-01-15T10:30:00Z',
    status: 'completed'
  },
  {
    id: 't2',
    type: 'credit',
    category: 'interest',
    amount: 125,
    description: 'Monthly interest earned',
    date: '2024-01-31T00:00:00Z',
    status: 'completed'
  },
  {
    id: 't3',
    type: 'debit',
    category: 'withdrawal',
    amount: 2000,
    description: 'Emergency withdrawal',
    date: '2024-01-20T14:15:00Z',
    status: 'completed'
  },
  {
    id: 't4',
    type: 'credit',
    category: 'deposit',
    amount: 3500,
    description: 'Bonus deposit',
    date: '2024-01-10T09:00:00Z',
    status: 'completed'
  },
  {
    id: 't5',
    type: 'debit',
    category: 'loan_repayment',
    amount: 1500,
    description: 'Loan repayment - January',
    date: '2024-01-05T11:00:00Z',
    status: 'completed'
  }
];

export const mockLoan: Loan = {
  id: 'loan1',
  amount: 25000,
  remainingBalance: 18500,
  interestRate: 12,
  monthlyPayment: 2300,
  nextPaymentDate: '2024-02-05',
  startDate: '2023-10-05',
  endDate: '2024-10-05',
  status: 'active',
  totalPayments: 12,
  completedPayments: 4
};

export const mockUser: UserAccount = {
  id: 'user1',
  name: 'Sarah Johnson',
  email: 'sarah.johnson@email.com',
  phone: '+1 234 567 8900',
  savingsBalance: 45250,
  totalSaved: 78500,
  currentPlan: savingsPlans[1],
  planStartDate: '2023-07-01',
  activeLoan: mockLoan,
  transactions: mockTransactions
};

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date(dateString));
}

export function calculateLoanEligibility(savingsBalance: number, plan: SavingsPlan): number {
  return savingsBalance * plan.loanMultiplier;
}
