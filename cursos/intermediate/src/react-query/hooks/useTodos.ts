import { useQuery } from '@tanstack/react-query';
import { CACHE_KEY_TODOS } from '../constants';
import { Todo } from '../models/Todo';
import todoService from '../services/todoService';

export default function () {
  const {
    data: todos,
    error,
    isLoading,
  } = useQuery<Todo[], Error>({
    queryKey: [CACHE_KEY_TODOS],
    queryFn: todoService.getAll,
    staleTime: 10 * 1000,
  });

  return { todos: todos?.slice(0, 10), error, isLoading };
}
