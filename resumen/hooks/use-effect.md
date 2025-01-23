# useEffect Hook

El `useEffect` Hook se utiliza para realizar acciones después de que se haya renderizado el componente.

## Side Effects

- Almacenar datos en el local storage
- Realizar peticiones HTTP
- Actualizar el DOM

## Uso

```tsx
function App() {
  const ref = useRef<HTMLInputElement>(null);

  // afterRender
  useEffect(() => {
    // Side effect
    if (ref.current) {
      ref.current.focus();
    }
  }, []);

  return <input ref={ref} />;
}
```

Es importante notar que el `useEffect` Hook se ejecuta después de que se haya renderizado el componente y que el segundo argumento es una lista de dependencias, la cual debe de estar vacía si sólo se quiere ejecutar el efecto una vez.

## Effect Dependencies

El segundo argumento del `useEffect` Hook es una lista de dependencias. Si las dependencias cambian, el efecto se ejecutará nuevamente. Puede ser un objeto, un array o una función.

```tsx
function App() {
  const [products, setProducts] = useState<string[]>([]);
  const [category, setCategory] = useState<null | string>(null);

  useEffect(() => {
    getProductsByCategory(category).then((products) => setProducts(products));
  }, [category]);

  return (
    <>
      <select onChange={(e) => setCategory(e.target.value)}>
        <option value="" disabled>
          -- Select a Category
        </option>
        <option value="electronics">Electronics</option>
        <option value="food">Food</option>
      </select>
      <ProductList products={products} />
    </>
  );
}
```

## Effect Clean Up

El efecto se ejecuta cuando el componente se desmonta. Puede ser necesario en casos como cuando se desmonta el componente de un formulario o cuando se desmonta un componente de un hook de react.

```tsx
const connect = () => console.log("Connecting...");
const disconnect = () => console.log("Disconnecting...");

function App() {
  useEffect(() => {
    connect();

    return () => disconnect();
  });

  return null;
}
```

## Fetching Data

Para realizar peticiones HTTP se puede utilizar el `useEffect` Hook pero sin que sean asíncrono ya que los efectos son sincrónicos. Para hacer peticiones asíncronas se debe de utilizar el `useEffect` Hook con una función que utilice promesas y no el "async await" ya que las promesas se terminan resolviendo y actualizando el estado.

```tsx
function App() {
  const [products, setProducts] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts()
    .then((products) => setProducts(products));
    .catch((error) => setError(error.message));
  }, []);

  if(error) {
    return <p>{error}</p>;
  }

  return <ProductList products={products} />;
}
```

## Async Await

```tsx
function App() {
  const [products, setProducts] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController(); // AbortController es un objeto que se utiliza para cancelar peticiones HTTP.
    const fetchProducts = async () => {
      try {
        const products = await fetchProducts({ signal: controller.signal });
        setProducts(products);
      } catch (error) {
        if (error.name === "AbortError") {
          return;
        }
        setError(error.message);
      }
    };

    fetchProducts();

    return () => controller.abort();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return <ProductList products={products} />;
}
```

## Showing Loading Indicator

```tsx
function App() {
  const [products, setProducts] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const fetchProducts = async () => {
      try {
        const products = await fetchProducts({ signal: controller.signal });
        setProducts(products);
        setIsLoading(false);
      } catch (error) {
        if (error.name === "AbortError") {
          return;
        }
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchProducts();
    return () => controller.abort();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return <ProductList products={products} />;
}
```
