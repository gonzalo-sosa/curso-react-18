# React Query

Una librería para controlar la petición de datos y cachear respuestas en aplicaciones de React.
React Query es ideal cuando tu principal necesidad es manejar y cachear datos de API de manera eficiente. A diferencia de Redux, que es un manejador de estado más general, React Query se especializa en la obtención, almacenamiento en caché y sincronización de datos, lo que te permite evitar la sobrecarga de manejo de estado de forma manual.
React Query optimiza las solicitudes a los servidores al usar la caché de manera eficiente. Por ejemplo, si un componente ya ha solicitado datos y esos datos están en caché, React Query evitará hacer una nueva solicitud al servidor, lo que mejora el rendimiento de la aplicación y reduce la carga del backend.

Casos de uso:

- Aplicaciones con grandes cantidades de datos que deben ser sincronizadas con el servidor.
- Aplicaciones con múltiples componentes que dependen de los mismos datos, evitando la redundancia de solicitudes HTTP.

## Instalación

```bash
npm i @tanstack/react-query
```

## Características

1. Auto Retries: si la petición falla, se vuelve a enviar una nueva.
2. Auto Refetch: volver a realizar una nueva petición luego de cierto tiempo para obtener los datos actualizados.
3. Caching: los datos recibidos en la primera petición son almacenados para reutilizarlos. Se refresca luego de cierto tiempo.

## Uso

### Query Provider

1. Se envuelve el componente `App` con el componente `QueryClientProvider`
2. Se agrega un cliente al provider, este debe ser una instancia de la clase `QueryClient`

```tsx
// main.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,
);
```

### Hooks

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

### Handling Errors

Los errores son devueltos por la query y si están correctamente tipados se puede acceder al mensaje del mismo.
Por defecto, si un query lanza un error la petición se volverá a intentar por 3 veces, es decir, un total de 4 peticiones pero esto es configurable tanto en el `query client` como en el hook `useQuery`

```tsx
const TodoList = () => {
  const { data: todos, error } = useQuery<Todo[], Error>({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  });

  if (error) return <p>{error.message}</p>;

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

### Showing a Loading Indicator

```tsx
const TodoList = () => {
  const {
    data: todos,
    error,
    isLoading,
  } = useQuery<Todo[], Error>({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  });

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>{error.message}</p>;

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

### Create a Custom Hook

```ts
// useTodos.ts
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}

async function fetchTodos() {
  return axios
    .get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
    .then((res) => res.data);
}

export default function () {
  const {
    data: todos,
    error,
    isLoading,
  } = useQuery<Todo[], Error>({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  });

  return { todos, error, isLoading };
}
```

```tsx
import useTodos from './hooks/useTodos';

const TodoList = () => {
  const { todos, error, isLoading } = useTodos();

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>{error.message}</p>;

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

### Adding React Query DevTools

```tsx
// main.tsx
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </StrictMode>,
);
```

1. Permite observar las `query` realizadas

- Cantidad de observadores para cada `query` (componentes que la utilizan)
- Ultima vez que se utilizó la `query`

* Cuando una `query` tiene 0 observadores, es decir, no hay componentes que la utilicen, la `query` se vuelve <b>inactiva</b> lo que la convierte en la próxima víctima del `garbage collector` que la retirará de la caché luego de que pasen 5 minutos(valor por defecto: 300000 ms).

### Personalizar las opciones de React Query

1. Retry: modificar las cantidad de veces que se vuelve a realizar la petición si la primera vez falla.

- El valor por defecto de `retry` es 3, es decir, que la petición se vuelve a realizar como máximo 3 veces si es que falla la primera vez

```tsx
// main.tsx
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
    },
  },
});
```

2. cacheTime: tiempo máximo que los datos de una `query` permanece en la caché antes de ser borrados. Si la `query` es inactiva los datos se quitaran de la cache una vez pasado el tiempo especificado.

- El valor por defecto es `300000` ms (5 minutos)

```tsx
// main.tsx
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 300_000,
    },
  },
});
```

3. staleTime: por cuanto tiempo la petición es considerada "fresca" o actualizada.

- El valor por defecto es `0` ms por lo que una vez que se realice la petición y se reciban los datos, esta misma será tratada como desactualizada.

```tsx
// main.tsx
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});
```

- Auto Refresh: se aplica en tres situaciones

* Cuando la conexión a internet es restablecida
* Cuando un componente es montado
* Cuando una ventana vuelve a obtener el foco

4. refetchOnWindowFocus:

- El valor por defecto es `true` por lo al perder el foco de la ventana y volver a obtenerlo se realizará una nueva petición

```tsx
// main.tsx
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
    },
  },
});
```

5. refetchOnReconnect:

- El valor por defecto es `true` por lo al perder la conexión a internet y luego que esta se restablezca provocará que se realice una nueva petición

```tsx
// main.tsx
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnReconnect: true,
    },
  },
});
```

6. refetchOnMount:

- El valor por defecto es `true` por lo al montarse un componente se enviará una petición

```tsx
// main.tsx
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: true,
    },
  },
});
```

#### Customizing query options in hook

```ts
export default function () {
  const {
    data: todos,
    error,
    isLoading,
  } = useQuery<Todo[], Error>({
    queryKey: ['todos'],
    queryFn: fetchTodos,
    staleTime: 10 * 1000, // <--
  });

  return { todos, error, isLoading };
}
```

7. keepPreviousData

- El valor por defecto es `true` por lo al mantener una petición en la caché se mantienen los datos anteriores

```tsx
// main.tsx
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      keepPreviousData: true,
    },
  },
});
```

```tsx
import { useQuery } from '@tanstack/react-query';

const TodoList = () => {
  const { data: todos, error } = useQuery<Todo[], Error>({
    queryKey: ['todos'],
    queryFn: fetchTodos,
    keepPreviousData: true,
  });
};
```

### Custom Hooks

#### useQuery

Para peticiones del tipo `get`

```tsx
import { useQuery } from '@tanstack/react-query';
import axios, { AxiosRequestConfig } from 'axios';

async function fetchPosts(config?: AxiosRequestConfig) {
  return axios
    .get<Post[]>('https://jsonplaceholder.typicode.com/posts', config)
    .then((res) => res.data);
}

const usePosts = () => {
  return useQuery<Post[], Error>({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });
};
```

#### useMutation

Para peticiones del tipo `post`, `put`, `delete`, `patch`, es decir, peticiones que "mutan" los datos.

```tsx
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const createTodo = async (todo: { title: string }) => {
  return axios.post('https://jsonplaceholder.typicode.com/todos', todo);
};

const TodoForm = () => {
  const { mutate, isLoading, error, isSuccess } = useMutation(createTodo);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTodo = { title: 'New Todo' };
    mutate(newTodo);
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Saving...' : 'Create Todo'}
      </button>
      {isSuccess && <p>Todo created successfully!</p>}
      {error && <p>Error creating todo: {error.message}</p>}
    </form>
  );
};
```

#### useInfiniteQuery

Para peticiones de paginación o scroll infinito(o hasta que terminen los datos)

```tsx
import { useInfiniteQuery } from '@tanstack/react-query';
import axios, { AxiosRequestConfig } from 'axios';

async function fetchPosts(config?: AxiosRequestConfig) {
  return axios
    .get<Post[]>('https://jsonplaceholder.typicode.com/posts', config)
    .then((res) => res.data);
}

const usePosts = () => {
  return useInfiniteQuery<Post[], Error>({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    getNextPageParam: (lastPage, allPages) => {
      // lógica para obtener la próxima página, difiere según la api utilizada
      return lastPage.length > 0 ? allPages.length + 1 : undefined;
    },
  });
};
```

```tsx
export default function Todos(){
  const { data, error, isLoading, fetchNextPage, hasNextPage } = usePosts();

  return <List>
    {data?.pages.map((page, index) => (
      <Fragment key={`page-${index}`}>
        {page.map((todo) => (
          <Todo key={todo.id} todo={todo} />
      ))}
    ))}

    {hasNextPage && <button onClick={fetchNextPage}>Load More</button>}
  </List>
}
```
