import { create } from 'zustand';

type Task = {
  id: string;
  title: string;
};

interface TasksStoreType {
  tasks: Task[];
  addTask: (task: Task) => void;
  removeTask: (id: Task['id']) => void;
}

const useTasksStore = create<TasksStoreType>((set) => ({
  tasks: [],
  addTask: (task) => set((store) => ({ tasks: [task, ...store.tasks] })),
  removeTask: (id) =>
    set((store) => ({ tasks: store.tasks.filter((t) => t.id !== id) })),
}));

export default useTasksStore;
