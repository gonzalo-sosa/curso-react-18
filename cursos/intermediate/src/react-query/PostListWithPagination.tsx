import { useState } from 'react';
import { usePostsWithPagination } from './hooks/usePosts';

interface PostListWithPaginationProps {
  pageSize?: number;
}

const PostListWithPagination = ({
  pageSize = 10,
}: PostListWithPaginationProps) => {
  const [page, setPage] = useState(1);
  const {
    data: posts,
    error,
    isLoading,
  } = usePostsWithPagination({ page, pageSize });

  if (isLoading)
    return (
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );

  if (error) return <p>{error.message}</p>;

  return (
    <>
      <ul className="list-group">
        {posts?.map((post) => (
          <li key={post.id} className="list-group-item">
            {post.title}
          </li>
        ))}
      </ul>
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className="btn btn-primary my-3"
      >
        Previous
      </button>
      <button
        onClick={() => setPage(page + 1)}
        className="btn btn-primary ms-3 my-3"
      >
        Next
      </button>
    </>
  );
};

export default PostListWithPagination;
