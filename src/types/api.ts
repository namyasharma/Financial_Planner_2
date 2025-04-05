export interface User {
  id: number;
  username: string;
  email: string;
}

export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface Budget {
  id: number;
  user: number;
  category: string;
  amount: number;
  start_date: string;
  end_date: string;
}

export interface Expense {
  id: number;
  user: number;
  amount: number;
  category: string;
  date: string;
  description: string;
}

export interface Investment {
  id: number;
  user: number;
  investment_type: string;
  amount: number;
  date: string;
  description: string;
  returns: number;
}

export interface ApiResponse<T> {
  data: T | null;
  error?: string;
}