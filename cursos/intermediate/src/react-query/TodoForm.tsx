import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';
import { Todo } from './hooks/useTodos';
import axios from 'axios';

type NewTodo = Omit<Todo, 'id'>;
type SavedTodo = Todo;
interface AddTodoContext {
  previousTodos: Todo[];
}

const TodoForm = () => {
  const queryClient = useQueryClient();

  const addTodo = useMutation<SavedTodo, Error, NewTodo, AddTodoContext>({
    mutationFn: (todo: NewTodo) =>
      axios
        .post<SavedTodo>('https://jsonplaceholder.typicode.com/todos', todo)
        .then((res) => res.data),

    onMutate: (newTodo: NewTodo) => {
      const previousTodos =
        queryClient.getQueryData<SavedTodo[]>(['todos']) || [];

      queryClient.setQueryData<NewTodo[]>(['todos'], (todos) => [
        newTodo,
        ...(todos || []),
      ]);

      if (ref.current) ref.current.value = '';

      return { previousTodos };
    },

    onSuccess: (savedTodo, newTodo) => {
      queryClient.setQueryData<Todo[]>(['todos'], (todos) =>
        todos?.map((todo) => (todo === newTodo ? savedTodo : todo)),
      );
    },

    onError: (_error, _newTodo, context) => {
      if (!context) return;

      queryClient.setQueryData<SavedTodo[]>(['todos'], context.previousTodos);
    },
  });
  const ref = useRef<HTMLInputElement>(null);

  return (
    <>
      {addTodo.error && (
        <div className="alert alert-danger">{addTodo.error.message}</div>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!ref.current) return;

          addTodo.mutate({
            title: ref.current.value,
            completed: false,
            userId: 1,
          });
        }}
        className="row mb-3"
      >
        <div className="col">
          <input ref={ref} type="text" className="form-control" />
        </div>
        <div className="col">
          <button disabled={addTodo.isLoading} className="btn btn-primary">
            {addTodo.isLoading ? 'Adding...' : 'Add'}
          </button>
        </div>
      </form>
    </>
  );
};

export default TodoForm;
