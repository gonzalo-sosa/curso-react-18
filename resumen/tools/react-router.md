# React Router

## Instalación

```bash
npm i react-router-dom
```

## Uso

### Crear router

Hay dos formas, la primera es la más sencilla utilizando el componente `BrowserRouter` y enviarle las props. La segunda forma es creando el componente pero con las rutas ya creadas utilizando la función `createBrowserRouter`.

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

### Rutas anidadas

Rutas que se encuentren dentro de otras rutas. Para crear rutas anidadas se debe de crear un componente que se encargue de renderizar la ruta anidada y los componentes que sean hijos de ella. Es importante recalcar que los `paths` no deben de llevar "/" al comienzo ya que el componente entiende que son hijas de otra ruta por lo que agrega la barra de forma automática. Si queremos que un componente sea el que se renderice cuando la ruta sea la misma que el la del padre se debe de indicar con `index: true`.

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

Componente que renderiza las rutas hijas que matcheen con el path de la ruta actual.

```tsx
// Layout.tsx
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <NavBar />
      <div id="main">
        <Outlet />{' '}
        {/* <-- Outlet que renderiza las rutas hijas que matcheen con el path de la ruta actual */}
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

Para proteger una ruta se debe de crear un componente que se encargue de renderizar la ruta protegida y los componentes que sean hijos de ella. Para esto, debemos de controlar los permisos del usuario y si no tiene permisos se debe de redirigir a la ruta de login. Se utiliza el componente `Navigate` para que la función permanezca "pura" (que no se ejecuten funciones inesperadas).

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
    return <h1>Página no válida</h1>;
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

  return (
    <search>
      <input
        type="text"
        value={searchParams.get('q') || ''}
        onChange={(e) => setSearchParams({ q: e.target.value })}
      />
    </search>
  );
}
```
