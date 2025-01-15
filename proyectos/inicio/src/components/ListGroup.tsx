import { useState } from 'react';

type Props = {
  heading: string;
  items: string[];
  activeItem?: number;
  onSelectItem?: (item: string) => void;
};

// const handleMouseOver = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
//   e.currentTarget.classList.add("active");
// };

// const handleMouseOut = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
//   e.currentTarget.classList.remove("active");
// };

const getMessage = (items: string[]) =>
  items.length === 0 && <p>Please add an item</p>;

const getItemClassName = (index: number, activeIndex = 0) =>
  index === activeIndex ? 'list-group-item active' : 'list-group-item';

const ListGroup = ({ heading, items, onSelectItem, activeItem = 0 }: Props) => {
  const [selectedIndex, setSelectedIndex] = useState(activeItem);

  const handleSelectItem = (item: string) => {
    setSelectedIndex(items.indexOf(item));
    onSelectItem?.(item);
  };

  return (
    <>
      <h2>{heading}</h2>
      {getMessage(items)}
      <ul className="list-group">
        {items.map((item, index) => (
          <li
            onClick={() => handleSelectItem(item)}
            className={getItemClassName(index, selectedIndex)}
            key={`${index}-${item}`}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
};

export default ListGroup;
