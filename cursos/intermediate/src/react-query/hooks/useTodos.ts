import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { CACHE_KEY_TODOS } from '../constants';
import { Todo } from '../models/Todo';

async function fetchTodos() {
  return axios
    .get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
    .then((res) => res.data);
}

export default function () {
  const {
    data: todos,
    error,
    isLoading,
  } = useQuery<Todo[], Error>({
    queryKey: [CACHE_KEY_TODOS],
    queryFn: fetchTodos,
    staleTime: 10 * 1000,
  });

  return { todos, error, isLoading };
}
