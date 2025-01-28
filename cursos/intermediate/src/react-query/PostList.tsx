import { useState } from 'react';
import { usePosts } from './hooks/usePosts';

const PostList = () => {
  const [userId, setUserId] = useState<number>();
  const { data: posts, error, isLoading } = usePosts(userId);

  if (isLoading)
    return (
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );

  if (error) return <p>{error.message}</p>;

  return (
    <div id="post-list" className="my-4">
      <h3>Posts List</h3>
      <select
        onChange={(e) => setUserId(parseInt(e.target.value))}
        value={userId}
        className="form-select mb-3"
      >
        <option value="" selected disabled></option>
        <option value="1">User 1</option>
        <option value="2">User 2</option>
        <option value="3">User 3</option>
      </select>
      <ul className="list-group">
        {posts?.slice(0, 10).map((post) => (
          <li key={post.id} className="list-group-item">
            {post.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
