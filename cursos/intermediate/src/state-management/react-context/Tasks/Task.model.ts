export type Task = {
  id: string;
  title: string;
};

export const enum TasksActionsType {
  ADD = 'add',
  REMOVE = 'remove',
}

interface TaskActionAdd {
  type: TasksActionsType.ADD;
  payload: Task;
}

interface TaskActionRemove {
  type: TasksActionsType.REMOVE;
  payload: Task['id'];
}

export type TasksAction = TaskActionAdd | TaskActionRemove;
