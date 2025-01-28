import ReactQuery from './react-query/App';
import ReactContext from './state-management/react-context/App';
import Zustand from './state-management/zustand/App';
import ReactRouter from './routing/App';

function App() {
  return (
    <>
      <ReactQuery />
      <ReactContext />
      <Zustand />
      <ReactRouter />
    </>
  );
}

export default App;
