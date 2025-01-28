import TaskList from './Tasks/TasksList';
import LoginStatus from './User/LoginStatus';

export default function Zustand() {
  return (
    <div className="container-fluid">
      <h2>Zustand</h2>
      <LoginStatus />
      <TaskList />
    </div>
  );
}
