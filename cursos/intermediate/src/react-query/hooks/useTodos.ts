import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}

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
    queryKey: ['todos'],
    queryFn: fetchTodos,
    staleTime: 10 * 1000,
  });

  return { todos, error, isLoading };
}
