# Zustand

## Instalación

```bash
npm i zustand@4.3.7
```

## Uso

### Crear Store

Create es una función que devuelve un custom hook que contiene el estado y las funciones de actualización del mismo.
El estado se define dentro de la función `set`

```ts
import { create } from 'zustand';

const useStore = create<{ count: number }>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));

export default useStore;
```

### Usar Store

Para utilizar la store sólo hay que importar el custom hook y ejecutarlo dentro del componente.

```tsx
import { useStore } from './store';

export default function Counter() {
  const { count, increment } = useStore();

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => increment()}>Increment</button>
    </div>
  );
}
```

### Selectores

Permiten que un componente sólo observe partes del estado que le interesan evitando que cuando el estado cambie en sus partes que no son relevantes para el componente, este no se vuelva a renderizar.

```tsx
import { useStore } from './store';

export default function Counter() {
  const count = useStore((state) => state.count); // <-- Obtener sólo el count

  return <p>Count: {count}</p>;
}
```

## React context vs zustand

React context es un opción para estados globales que <b>no</b> se actualizan de forma recurrente, mientras que zustand es una gran opción para estados globales que se actualizan de forma reactiva y recurrente.

```tsx
// React Context
import { createContext, useContext, useState } from 'react';

const CountContext = createContext();

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <CountContext.Provider value={{ count, setCount }}>
      <Counter />
    </CountContext.Provider>
  );
}

export default function Counter() {
  const { count, setCount } = useContext(CountContext);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

```tsx
// Zustand
import { create } from 'zustand';

const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));

export default function Counter() {
  const { count, increment } = useStore();

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}
```
