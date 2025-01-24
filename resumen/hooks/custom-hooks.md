# Custom Hooks

Los Custom Hooks son funciones que se utilizan para crear hooks personalizados.

```tsx
function useProducts(deps?: unknown[]) {
  const [products, setProducts] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const { response, abort } = productService.getAll<string[]>();

    response.then((products) => {
      setProducts(products)
      setIsLoading(false);
    });
    .catch((error) => {
      if(error.name === 'AbortError') return;
      setError(error.message)
      setIsLoading(false);
    });

    return () => abort();
  }, deps ? [...deps] : []);

  return { products, error, isLoading, setProducts, setError };
}
```

Esto permite encapsular la lógica de un hook y hacerlo reutilizable en otros componentes.

## Uso

```tsx
function App() {
  const { products, error, isLoading } = useProducts();

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!products.length) {
    return <p>No products available</p>;
  }

  return <ProductList products={products} />;
}
```
