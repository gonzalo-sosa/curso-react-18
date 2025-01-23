import { NewTodo, SavedTodo } from '../models/Todo';
import APIClient from './apiClient';

export default new APIClient<NewTodo, SavedTodo>('/todos');
