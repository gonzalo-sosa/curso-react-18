# Styled Components | CSS in JS

Permite crear componentes con estilos de css definidos en el mismo archivo del componente, esto para evitar crear un archivo separado para los estilos.

## Instalación

```bash
npm install styled-components
```

Tipos para typescript

```bash
npm install --save-dev @types/styled-components
```

### Uso

```tsx
import styled from "styled-components";

const Container = styled.div`
  background-color: red;
  color: white;
  font-size: 20px;
  padding: 10px;
`;

const App = () => {
  return (
    <Container>
      <h1>Styled Components</h1>
    </Container>
  );
};
```

Además, estos componentes pueden recibir props como cualquier otro componente de react

```tsx
import styled from "styled-components";

interface ContainerProps {
  active: boolean;
}

const Container = styled.div<ContainerProps>`
  background-color: ${(props) => (props.active ? "green" : "red")};
  color: white;
  font-size: 20px;
  padding: 10px;
`;
```
