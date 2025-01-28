import TodoList from './TodoList';
import TodoForm from './TodoForm';
import PostList from './PostList';
import PostListWithPagination from './PostListWithPagination';
import PostListWithInfiniteQueries from './PostListWithInfiniteQueries';
import SideBar from './SideBar';

export default function ReactQuery() {
  return (
    <div className="container-fluid row">
      <div className="col-2">
        <SideBar />
      </div>
      <div className="col">
        <div id="todo-list" className="mb-4">
          <h3>Todo List</h3>
          <TodoForm />
          <TodoList />
        </div>
        <PostList />
        <PostListWithPagination />
        <PostListWithInfiniteQueries />
      </div>
    </div>
  );
}
