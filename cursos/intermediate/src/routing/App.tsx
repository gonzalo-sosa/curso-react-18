import { RouterProvider } from 'react-router-dom';
import router from './routes';

export default function ReactRouter() {
  return (
    <div className="container-fluid">
      <h2>React Router</h2>
      <RouterProvider router={router}></RouterProvider>;
    </div>
  );
}
