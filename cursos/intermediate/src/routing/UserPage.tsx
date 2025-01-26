import { Outlet } from 'react-router-dom';
import UserList from './UserList';

export default function UserPage() {
  return (
    <div className="row">
      <div className="col">
        <UserList />
      </div>
      <div className="col">
        <Outlet />
      </div>
    </div>
  );
}
