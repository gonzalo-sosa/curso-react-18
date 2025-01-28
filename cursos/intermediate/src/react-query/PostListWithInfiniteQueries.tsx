import { Fragment } from 'react/jsx-runtime';
import { usePostsWithInfiniteQueries } from './hooks/usePosts';

interface PostListWithInfiniteQueriesProps {
  pageSize?: number;
}

const PostListWithInfiniteQueries = ({
  pageSize = 10,
}: PostListWithInfiniteQueriesProps) => {
  const { data, error, isLoading, fetchNextPage, isFetchingNextPage } =
    usePostsWithInfiniteQueries({ pageSize });

  if (isLoading)
    return (
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );

  if (error) return <p>{error.message}</p>;

  return (
    <div id="infinite-query" className="my-4">
      <h3>Post List with Infinite Queries</h3>
      <ul className="list-group">
        {data.pages.map((page, index) => (
          <Fragment key={`page-${index}`}>
            {page.map((post) => (
              <li key={post.id} className="list-group-item">
                {post.title}
              </li>
            ))}
          </Fragment>
        ))}
      </ul>
      <button
        disabled={isFetchingNextPage}
        onClick={() => fetchNextPage()}
        className="btn btn-primary ms-3 my-3"
      >
        {isFetchingNextPage ? 'Loading...' : 'Load More'}
      </button>
    </div>
  );
};

export default PostListWithInfiniteQueries;
