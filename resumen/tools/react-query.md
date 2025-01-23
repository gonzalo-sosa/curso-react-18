# React Query

Una librería para controlar la petición de datos y cachear respuestas en aplicaciones de React.
Es preferible utilizar React Query antes que Redux para el "caching"

## Uso

1. Se envuelve el componente `App` con el componente `QueryClientProvider`
2. Se agrega un cliente al provider, este debe ser una instancia de la clase `QueryClient`

```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,
);
```

3. Utilizar `hooks` en la aplicación

```tsx
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}

async function fetchTodos(): Promise<Todo[]> {
  return axios
    .get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
    .then((res) => res.data);
}

const TodoList = () => {
  const { data: todos } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  });

  return (
    <ul className="list-group">
      {todos?.map((todo) => (
        <li key={todo.id} className="list-group-item">
          {todo.title}
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
```

## Características

1. Auto Retries: si la petición falla, se vuelve a enviar una nueva.
2. Auto Refetch: volver a realizar una nueva petición luego de cierto tiempo para obtener los datos actualizados.
3. Caching: los datos recibidos en la primera petición son almacenados para reutilizarlos. Se refresca luego de cierto tiempo.

## Handling Errors
