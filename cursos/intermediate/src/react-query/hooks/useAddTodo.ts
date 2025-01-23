import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Todo, NewTodo, SavedTodo, AddTodoContext } from '../models/Todo';
import { CACHE_KEY_TODOS } from '../constants';

export default function ({ onAdd }: { onAdd: () => void }) {
  const queryClient = useQueryClient();

  return useMutation<SavedTodo, Error, NewTodo, AddTodoContext>({
    mutationFn: (todo: NewTodo) =>
      axios
        .post<SavedTodo>('https://jsonplaceholder.typicode.com/todos', todo)
        .then((res) => res.data),

    onMutate: (newTodo: NewTodo) => {
      const previousTodos =
        queryClient.getQueryData<SavedTodo[]>([CACHE_KEY_TODOS]) || [];

      queryClient.setQueryData<NewTodo[]>([CACHE_KEY_TODOS], (todos = []) => [
        newTodo,
        ...todos,
      ]);

      onAdd();

      return { previousTodos };
    },

    onSuccess: (savedTodo, newTodo) => {
      queryClient.setQueryData<Todo[]>([CACHE_KEY_TODOS], (todos) =>
        todos?.map((todo) => (todo === newTodo ? savedTodo : todo)),
      );
    },

    onError: (_error, _newTodo, context) => {
      if (!context) return;

      queryClient.setQueryData<SavedTodo[]>(
        [CACHE_KEY_TODOS],
        context.previousTodos,
      );
    },
  });
}
