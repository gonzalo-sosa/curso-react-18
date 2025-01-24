# CSS Modules

Utilizar estilos de css de forma vanilla en proyectos de react puede traer conflictos debido a que las clases se pueden repetir en diferentes componentes. Para evitar esto se pueden utilizar [CSS modules](https://create-react-app.dev/docs/adding-a-css-modules-stylesheet/).

## Ejemplo

- Primero se debe de crear un archivo que utilice la siguiente convención de nombre: "[nombre-componente].module.css"
- Luego en el componente de React se debe de importar el archivo de estilos con la siguiente sintaxis: `import styles from "./[nombre-componente].module.css";`

```tsx
import styles from './[nombre-componente].module.css';
```

- Luego se debe de utilizar la clase de css con la siguiente sintaxis: `className={styles.["nombre-clase"]}`

```tsx
<div className={styles.container}></div>
```

- En el archivo de estilos se debe de utilizar la siguiente sintaxis: `[nombre-clase] { ... }`

```css
.container {
  background-color: red;
}
```

- Las clases no tendrán colisión ya que los "bundlers" como "webpack o vite" se encargan de generar un nombre único para cada clase de css.

## Notas

- Para utilizar más de una clase se realiza lo siguiente:

```tsx
<div className={`${styles.container} ${styles.container2}`}></div>
```

o

```tsx
<div className={[styles.container, styles.container2].join(' ')}></div>
```

- La estructura recomendada para los archivos es la siguiente:

```bash
src
  components
    [nombre-componente]
      [nombre-componente].module.css
      [nombre-componente].tsx
      index.ts
```

En el archivo ".ts" se importa el componente y se lo export como objeto por defecto.

```tsx
// index.ts
import { nombre-componente } from "./[nombre-componente].tsx";
export default [nombre-componente];
```

De esta forma se puede importar de la siguiente manera: `import [nombre-componente] from "./components/[nombre-componente]";`
