# React Router

## Instalación

```bash
npm i react-router-dom@6.10.0
```

## Uso

### Crear router

Hay dos formas, la primera es la más sencilla utilizando el componente `BrowserRouter` y crear rutas a través de componentes. La segunda forma (y la más utilizada para aplicaciones grandes) es creando el componente con la función `createBrowserRouter` que permite manejar errores y carga de datos de manera más eficiente.

1. BrowserRouter

```tsx
// routes.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />} />
      <Route path="/users" element={<UserList />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
```

2. createBrowserRouter

```tsx
// routes.tsx
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
  },
  {
    path: '/users',
    element: <UserList />,
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

export default router;
```

### Rutas parametrizadas

Rutas que traen datos como el `id` se un usuario o datos importantes para renderizar un componente.

```tsx
// routes.tsx
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/users/:id', // <-- users/1
    element: <User />,
  },
  {
    path: '/products/:id/:brand?', // <-- products/1/apple
    element: <Product />,
  },
  {
    path: '/cars/:id/?color=:color', // <-- cars/1?color=red
    element: <Car />,
  },
]);
```

Para acceder a estos parámetros se debe de utilizar el hook [useParams](#custom-hooks).

### Rutas anidadas

Rutas que se encuentren dentro de otras rutas. Para crear rutas anidadas se debe de crear un componente que se encargue de renderizar la ruta anidada y los componentes que sean hijos de ella. Es importante recalcar que los `paths` no deben de llevar "/" al comienzo ya que el componente entiende que son hijas de otra ruta por lo que agrega la barra de forma automática. Si queremos que un componente sea el que se renderice cuando la ruta sea la misma que el la del padre se debe de indicar con `index: true` que es equivalente a `path: '/'`.

```tsx
// routes.tsx
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true, // <-- /
        element: <HomePage />,
      },
      {
        path: 'users', // <-- /users
        element: <UserList />,
      },
      {
        path: 'login', // <-- /login
        element: <Login />,
      },
    ],
  },
]);
export default router;
```

### Outlet

Componente que renderiza las rutas hijas que coinciden con el path de la ruta actual.

```tsx
// Layout.tsx
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <NavBar />
      <div id="main">
        <Outlet />{' '}
        {/* <-- Outlet que renderiza las rutas hijas que coinciden con el path de la ruta actual */}
      </div>
    </>
  );
};
```

### Rutas protegidas

```tsx
// routes.tsx
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
    ],
  },
  {
    path: '/users',
    element: <PrivateRoutes />,
    children: [
      {
        path: ':id', // <-- /users/1
        element: <User />,
      },
    ],
  },
]);
```

Para proteger una ruta se debe de crear un componente que se encargue de renderizar la ruta protegida y los componentes que sean hijos de ella. Para esto, debemos de controlar los permisos del usuario y si no tiene permisos se debe de redirigir a la ruta de login. Se utiliza el componente `Navigate` que redirige de manera automática una vex que se renderiza, de esta forma el componente permanece "puro" (que no se ejecuten funciones inesperadas).

```tsx
// PrivateRoutes.tsx
import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRoutes() {
  const user = useAuth(); // custom hook que retorna el usuario actual
  if (!user) return <Navigate to={'/login'} />; // si no hay usuario, redirigir a la ruta de login

  return <Outlet />;
}
```

### Errores

Los errores se manejan creando un componente que se encargue de renderizar el error y mostrando un mensaje al usuario de acuerdo al error presentado.

```tsx
// routes.tsx
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />, // <-- ErrorPage, componente que renderiza el error
    children: [
      /* ... */
    ],
  },
]);
```

```tsx
// ErrorPage.tsx
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return <h1>Página no encontrada</h1>;
    }
    return (
      <h1>
        Error {error.status}: {error.statusText}
      </h1>
    );
  }

  return <h1>Ocurrió un error inesperado</h1>;
}
```

### Custom Hooks

1. useParams: para obtener los parámetros de la URL. Los parámetros tienen el nombre de la ruta dinámica definida en el router

```tsx
// routes.tsx
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/users/:id', // <--
    element: <User />,
  },
]);
```

```tsx
export default function User() {
  const params = useParams();

  return <p>User {params.id}</p>; // <-- User 1
}
```

2. useLocation: para obtener la ruta actual

```tsx
export default function User() {
  const location = useLocation();

  return <p>User in path: {location.pathname}</p>; // <-- User in path: /users/1
}
```

3. useNavigate: para navegar a otras rutas

```tsx
export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    // ...
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* ... */}
      <button>Login</button>
    </form>
  );
}
```

4. useSearchParams: para obtener los parámetros de búsqueda de la URL como objeto URLSearchParams

```tsx
export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q');
  const sort = searchParams.get('sort');

  return (
    <div>
      <input
        type="text"
        value={query || ''}
        onChange={(e) => setSearchParams({ q: e.target.value })}
      />
      <p>Sort: {sort}</p>
    </div>
  );
}
```

5. useRoutes: permite crear rutas utilizando objetos en lugar de componentes

```tsx
// routes.tsx
import { useRoutes } from 'react-router-dom';

const routes = [
  { path: '/', element: <Home /> },
  { path: '/about', element: <About /> },
  { path: '/users/:userId', element: <UserProfile /> },
];

export default function App() {
  const element = useRoutes(routes);
  return element;
}
```

6. useOutlet: retorna el elemento de la ruta hija que sea igual a la ruta actual

```tsx
import { useOutlet } from 'react-router-dom';

export default function Dashboard() {
  const outlet = useOutlet();

  return (
    <div>
      <h1>Dashboard</h1>
      {outlet || <p>No nested route matched.</p>}
    </div>
  );
}
```

7. useResolvedPath: transforma una ruta relativa a una ruta absoluta basada en la ubicación actual

```tsx
import { useResolvedPath } from 'react-router-dom';

function ResolvedPath() {
  const path = useResolvedPath('about');

  return <p>Resolved Path: {path.pathname}</p>; // <-- Resolved Path: /about
}
```

8. useMatch: valida si la URL actual coincide con la ruta proporcionada

```tsx
import { useMatch } from 'react-router-dom';

export default function AboutLink() {
  const match = useMatch('/about');

  return (
    <p>
      {match ? 'You are on the About page' : 'You are not on the About page'}
    </p>
  );
}
```

9. useNavigationType: retorna el tipo de navegación utilizada (por ejemplo, "pop", "push", "replace")

```tsx
import { useNavigationType } from 'react-router-dom';

function NavigationType() {
  const type = useNavigationType();

  return <p>Navigation Type: {type}</p>;
}
```

10. useHref: crea una URL basada en la ruta "to" de la ubicación actual

```tsx
// path: users
import { useHref } from 'react-router-dom';

function LinkToAbout() {
  const href = useHref('/about'); // <-- users/about

  return <a href={href}>Go to About</a>;
}
```

11. useRouterContext: valida si un componente está en el contexto de react router

```tsx
import { useInRouterContext } from 'react-router-dom';

function RouterContextCheck() {
  const isInRouterContext = useInRouterContext();

  return <p>Is in Router Context: {isInRouterContext ? 'Yes' : 'No'}</p>;
}
```

12. useOutletContext: permite compartir el contexto entre una ruta padre a las rutas anidadas

```tsx
import { useOutletContext } from 'react-router-dom';

function NestedComponent() {
  const context = useOutletContext();

  return <p>Context: {context}</p>;
}

function ParentComponent() {
  return (
    <div>
      <h1>Parent Component</h1>
      <Outlet context="Hello from Parent" />
    </div>
  );
}
```

13. useBlocker: permite bloquear la navegación entre rutas

```tsx
import { useBlocker } from 'react-router-dom';

export default function Form() {
  const [isDirty, setIsDirty] = useState(false);

  useBlocker(() => {
    return !window.confirm(
      'You have unsaved changes. Are you sure you want to leave?',
    );
  }, isDirty); // <-- Se bloquea la navegación si isDirty es true

  return (
    <form>
      <input type="text" onChange={() => setIsDirty(true)} />
    </form>
  );
}
```
