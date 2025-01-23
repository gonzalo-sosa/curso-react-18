import { useState } from 'react';
import { ExpenseType } from './types';
import AddExpenseForm from './AddExpenseForm';
import ExpenseFilter from './ExpenseFilter';
import ExpenseList from './ExpenseList';

function ExpenseTracker() {
  const [listOfExpenses, setListOfExpense] = useState<ExpenseType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const visibleExpenses =
    selectedCategory !== 'All'
      ? listOfExpenses.filter(
          (expense) => expense.category === selectedCategory,
        )
      : listOfExpenses;

  return (
    <div className="mt-4 border p-4">
      <h2>Expense Tracker</h2>
      <AddExpenseForm
        onSubmit={(expense) =>
          setListOfExpense([
            ...listOfExpenses,
            { ...expense, id: listOfExpenses.length + 1 },
          ])
        }
      />
      <div className="mt-4">
        <ExpenseFilter
          onSelectCategory={(e) => setSelectedCategory(e.target.value)}
        />
        <ExpenseList
          expenses={visibleExpenses}
          onDelete={(expenseId) =>
            setListOfExpense((prevList) =>
              prevList.filter((expense) => expense.id !== expenseId),
            )
          }
        />
      </div>
    </div>
  );
}

export default ExpenseTracker;
