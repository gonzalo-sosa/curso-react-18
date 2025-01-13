import { useState } from "react";
import "./App.css";
import Alert from "./components/Alert";
import { Button } from "./components/Button";
import ListGroup from "./components/ListGroup";
import ExpandableText from "./components/ExpandableText";
import Form from "./components/Form-schema";
import ExpenseTracker from "./exercises/ExpenseTracker/ExpenseTracker";

function App() {
  const [alertVisible, setAlertVisibility] = useState(false);

  return (
    <>
      <ListGroup
        heading="My list"
        items={["An item", "A second item", "A third item"]}
        onSelectItem={(item) => console.log(item)}
      />
      {alertVisible && (
        <Alert color="warning" onClose={() => setAlertVisibility(false)}>
          <strong>Alerta!</strong>
        </Alert>
      )}
      <Button color="primary" onClick={() => setAlertVisibility(true)}>
        Botón
      </Button>
      <ExpandableText maxChars={1}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus
        tempora itaque aperiam explicabo ipsa temporibus eos. Itaque iure, fuga
        vel perspiciatis dolore autem in ipsam molestias magnam dolor ullam
        accusantium. Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Necessitatibus tempora itaque aperiam explicabo ipsa temporibus eos.
        Itaque iure, fuga vel perspiciatis dolore autem in ipsam molestias
        magnam dolor ullam accusantium.
      </ExpandableText>

      <Form />

      <ExpenseTracker />
    </>
  );
}

export default App;
