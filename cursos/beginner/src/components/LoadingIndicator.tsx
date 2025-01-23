import postService from '../services/postService';
import usePosts, { Post } from '../hooks/usePosts';

export const LoadingIndicator = () => {
  const { posts, error, isLoading, setPosts, setError } = usePosts();

  // Optimistic Update
  const handlePostDelete = (post: Post) => {
    const originalPosts = [...posts];

    setPosts(posts.filter((p) => p.id !== post.id));

    postService.delete(post.id).catch((error) => {
      setPosts(originalPosts);
      setError(error.message);
    });
  };

  const handlePostAdd = () => {
    const originalPosts = [...posts];
    const dummyPost = {
      id: String(posts.length + 1),
      title: 'New Post',
      body: 'This is a new post',
    };

    setPosts([dummyPost, ...posts]);

    postService
      .create<Post>(dummyPost)
      .then((newPost) => {
        setPosts([newPost, ...posts]);
      })
      .catch((error) => {
        setError(error.message);
        setPosts(originalPosts);
      });
  };

  const handlePostUpdate = (post: Post) => {
    const originalPosts = [...posts];
    const updatedPost = { ...post, title: `Updated: ${post.title}` };

    setPosts(posts.map((p) => (p.id === updatedPost.id ? updatedPost : p)));

    postService.update(post).catch((error) => {
      setError(error.message);
      setPosts(originalPosts);
    });
  };

  return (
    <div>
      {isLoading && <div className="spinner-border"></div>}
      {error && <p className="text-danger">{error}</p>}
      <button onClick={() => handlePostAdd()} className="btn btn-primary">
        Add Post
      </button>
      <PostList
        posts={posts}
        onPostUpdate={handlePostUpdate}
        onPostDelete={handlePostDelete}
      />
    </div>
  );
};

interface PostListProps {
  posts: Post[];
  onPostUpdate: (post: Post) => void;
  onPostDelete: (post: Post) => void;
}

const PostList = ({ posts, onPostUpdate, onPostDelete }: PostListProps) => {
  if (posts.length === 0) {
    return <p>No posts available</p>;
  }

  return (
    <ul className="list-group">
      {posts.map((post) => (
        <li key={post.id} className="list-group-item">
          <article className="d-flex justify-content-between">
            <div className="me-2">
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </div>
            <div className="ms-2 d-flex flex-column">
              <button
                onClick={() => onPostUpdate(post)}
                className="btn btn-outline-primary mb-2"
              >
                Update
              </button>
              <button
                onClick={() => onPostDelete(post)}
                className="btn btn-outline-danger"
              >
                Delete
              </button>
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
};
