import { ChangeEvent } from 'react';
import { CATEGORIES } from './consts';

interface Props {
  onSelectCategory: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const ExpenseFilter = ({ onSelectCategory }: Props) => {
  return (
    <select onChange={onSelectCategory} className="form-select">
      <option key={'all'} value="All">
        All Categories
      </option>
      {CATEGORIES.map((category) => (
        <option key={category}>{category}</option>
      ))}
    </select>
  );
};

export default ExpenseFilter;
