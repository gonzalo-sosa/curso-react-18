# CSS Vanilla

CSS Vanilla es el CSS sin frameworks o bibliotecas.

```bash
app
│
├── src/
│   ├── components/
│   │   └── [Component]/
│   │       └── [Component].css
│   │       └── [Component].tsx
```

El CSS se encuentra en el archivo `*.css` de la carpeta `components`.

## Uso

```tsx
import "./[Component].css";

export function [Component]() {
  return (
    <div className={"container"}>
      Container
    </div>
  );
}
```
