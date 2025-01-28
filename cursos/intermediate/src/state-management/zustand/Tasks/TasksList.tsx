import useTasksStore from './store';

const TaskList = () => {
  const { tasks, addTask, removeTask } = useTasksStore();

  return (
    <div className="my-4">
      <h3>Task List</h3>
      <button
        onClick={() =>
          addTask({ id: String(Date.now()), title: 'Task ' + Date.now() })
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
              onClick={() => removeTask(task.id)}
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
