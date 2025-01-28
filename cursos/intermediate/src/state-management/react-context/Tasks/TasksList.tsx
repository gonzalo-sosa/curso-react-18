import { useContext } from 'react';
import TasksContext from './tasksContext';
import { TasksActionsType } from './Task.model';

const useTasks = () => useContext(TasksContext);

const TaskList = () => {
  const { tasks, dispatch } = useTasks();

  return (
    <div className="my-4">
      <h3>Task List</h3>
      <button
        onClick={() =>
          dispatch({
            type: TasksActionsType.ADD,
            payload: { id: String(Date.now()), title: 'Task ' + Date.now() },
          })
        }
        className="btn btn-primary my-3"
      >
        Add Task
      </button>
      <ul className="list-group">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span className="flex-grow-1">{task.title}</span>
            <button
              className="btn btn-outline-danger"
              onClick={() =>
                dispatch({ type: TasksActionsType.REMOVE, payload: task.id })
              }
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
