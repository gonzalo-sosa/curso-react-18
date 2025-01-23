import TodoList from '@/react-query/TodoList';
import TodoForm from '@/react-query/TodoForm';
// import PostList from './react-query/PostList';
// import PostListWithPagination from './react-query/PostListWithPagination';
// import PostListWithInfiniteQueries from './react-query/PostListWithInfiniteQueries';

function App() {
  return (
    <>
      <TodoForm />
      <TodoList />
    </>
  );
  // return <PostList />;
  // return <PostListWithPagination />;
  // return <PostListWithInfiniteQueries />;
}

export default App;
