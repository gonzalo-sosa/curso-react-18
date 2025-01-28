export default function SideBar() {
  return (
    <aside className="sticky-top d-flex flex-column flex-shrink-0">
      <h2>React Query</h2>
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <a href="#todo-list" className="nav-link">
            Todo List
          </a>
        </li>
        <li className="nav-item">
          <a href="#post-list" className="nav-link">
            Post List
          </a>
        </li>
        <li className="nav-item">
          <a href="#pagination" className="nav-link">
            Pagination
          </a>
        </li>
        <li className="nav-item">
          <a href="#infinite-query" className="nav-link">
            Infinite Query
          </a>
        </li>
      </ul>
    </aside>
  );
}
