import { createContext, Dispatch } from 'react';
import { Task, TasksAction } from './Task.model';

interface TasksContextType {
  tasks: Task[];
  dispatch: Dispatch<TasksAction>;
}

const TasksContext = createContext<TasksContextType>({} as TasksContextType);

export default TasksContext;
