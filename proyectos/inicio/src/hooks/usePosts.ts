import { useEffect, useState } from "react";
import postService from "../services/postService";
export type Post = { id: string; title: string; body: string };

const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const { response, cancel } = postService.getAll<Post[]>();

    response
      .then((data) => {
        setPosts(data);
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.name === "AbortError") return;
        setError(error.message);
        setIsLoading(false);
      });

    return () => cancel();
  }, []);

  return { posts, error, isLoading, setPosts, setError };
};

export default usePosts;
