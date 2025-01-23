export type CategoriesType = ['Groceries', 'Utilities', 'Entertainment'];

export type ExpenseType = {
  id: number;
  description: string;
  category: CategoriesType[number];
  amount: number;
};
