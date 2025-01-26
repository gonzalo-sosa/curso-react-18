// import TodoList from '@/react-query/TodoList';
// import TodoForm from '@/react-query/TodoForm';
// import PostList from './react-query/PostList';
// import PostListWithPagination from './react-query/PostListWithPagination';
// import PostListWithInfiniteQueries from './react-query/PostListWithInfiniteQueries';
// import {
//   AuthProvider,
//   LoginStatus,
// } from './state-management/react-context/Auth';
// import {
//   TasksProvider,
//   TasksList,
// } from './state-management/react-context/Tasks';

import TaskList from './state-management/zustand/Tasks/TasksList';
import LoginStatus from './state-management/zustand/User/LoginStatus';

function App() {
  return (
    // <AuthProvider>
    //   <TasksProvider>
    //     <LoginStatus />
    //     <TasksList />
    //   </TasksProvider>
    // </AuthProvider>
    <>
      <LoginStatus />
      <TaskList />
    </>
  );
  /* 
  <>
    <TodoForm /> 
    <TodoList /> 
  </>
  */
  // return <PostList />;
  // return <PostListWithPagination />;
  // return <PostListWithInfiniteQueries />;
}

export default App;
