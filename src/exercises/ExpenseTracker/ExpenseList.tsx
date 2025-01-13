import { ExpenseType } from "./types";

type expenseId = ExpenseType["id"];

interface Props {
  expenses: ExpenseType[];
  onDelete: (id: expenseId) => void;
}

const ExpenseList = ({ expenses, onDelete }: Props) => {
  if (expenses.length === 0) return null;

  const headers = Object.keys(expenses[0]).filter((key) => key !== "id");

  return (
    <table className="mt-2 table table-bordered">
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header}>
              {header.charAt(0).toUpperCase() + header.slice(1)}
            </th>
          ))}
          <th></th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((data) => (
          <tr key={data.id}>
            <td>{data.description}</td>
            <td>{data.category}</td>
            <td>{data.amount}</td>
            <td>
              <button
                className="btn btn-outline-danger"
                onClick={() => onDelete(data.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td>Total</td>
          <td>
            $
            {expenses
              .reduce((total, expense) => total + expense.amount, 0)
              .toFixed(2)}
          </td>
          <td></td>
          <td></td>
        </tr>
      </tfoot>
    </table>
  );
};

export default ExpenseList;
