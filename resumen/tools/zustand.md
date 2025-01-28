# Zustand

## Instalación

```bash
npm i zustand
```

## Uso

### Crear Store

```ts
import { create } from 'zustand';

const useStore = create<{ count: number }>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));

export default useStore;
```

### Usar Store

```tsx
import { useStore } from './store';

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

### Selectores

```tsx
import { useStore } from './store';

export default function Counter() {
  const count = useStore((state) => state.count); // <-- Obtener sólo el count

  return <p>Count: {count}</p>;
}
```

## React context vs zustand

React context es un opción para estados globales que <b>no</b> se actualizan de forma recurrente, mientras que zustand es una gran opción para estados globales que se actualizan de forma reactiva y recurrente.
