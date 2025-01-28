import { AuthProvider, LoginStatus } from './Auth';
import { TasksProvider, TasksList } from './Tasks';

export default function ReactContext() {
  return (
    <div className="mt-4 container-fluid">
      <h2>React Context</h2>
      <AuthProvider>
        <LoginStatus />
        <TasksProvider>
          <TasksList />
        </TasksProvider>
      </AuthProvider>
    </div>
  );
}
