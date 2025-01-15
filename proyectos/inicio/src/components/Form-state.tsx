import { FormEvent, useState } from 'react';
import { Button } from './Button';

// Se vuelve a renderizar el componente cada vez que cambia el estado
export const Form = () => {
  const [person, setPerson] = useState({
    name: '',
    age: '',
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(person);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          onChange={(e) => setPerson({ ...person, name: e.target.value })}
          value={person.name}
          id="name"
          type="text"
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="" className="form-label">
          Age
        </label>
        <input
          onChange={(e) => setPerson({ ...person, age: e.target.value })}
          value={person.age}
          id="age"
          type="number"
          className="form-control"
        />
      </div>
      <Button type="submit" color="primary">
        Submit
      </Button>
    </form>
  );
};
