import { ReactNode, useReducer } from 'react';
import { Task, TasksAction, TasksActionsType } from './Task.model';
import TasksContext from './tasksContext';

function tasksReducer(tasks: Task[], action: TasksAction) {
  switch (action.type) {
    case TasksActionsType.ADD:
      return [action.payload, ...tasks];
    case TasksActionsType.REMOVE:
      return tasks.filter((t) => t.id !== action.payload);
    default:
      return tasks;
  }
}

export default function TasksProvider({ children }: { children: ReactNode }) {
  const [tasks, dispatch] = useReducer(tasksReducer, []);

  return (
    <TasksContext.Provider value={{ tasks, dispatch }}>
      {children}
    </TasksContext.Provider>
  );
}
