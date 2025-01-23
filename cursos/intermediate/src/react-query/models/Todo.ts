export interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}

export type NewTodo = Omit<Todo, 'id'>;
export type SavedTodo = Todo;
export interface AddTodoContext {
  previousTodos: SavedTodo[];
}
