import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import axios, { AxiosRequestConfig } from 'axios';

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

async function fetchPosts(config?: AxiosRequestConfig) {
  return axios
    .get<Post[]>('https://jsonplaceholder.typicode.com/posts', config)
    .then((res) => res.data);
}

/* Para PostList sin Pagination */
export const usePosts = (userId?: number) => {
  return useQuery<Post[], Error>({
    queryKey: userId ? ['users', userId, 'posts'] : ['posts'], // <-- users/1/posts
    queryFn: () =>
      fetchPosts({
        params: { userId },
      }),
    staleTime: 1 * 60 * 1000, // 1m
  });
};

/* Para PostListWithPagination */
type PostQueryP = {
  page: number;
  pageSize: number;
};

export const usePostsWithPagination = (query: PostQueryP) => {
  return useQuery<Post[], Error>({
    queryKey: ['posts', query],
    queryFn: () =>
      fetchPosts({
        params: {
          _start: (query.page - 1) * query.pageSize,
          _limit: query.pageSize,
        },
      }),
    staleTime: 1 * 60 * 1000, // 1m
    keepPreviousData: true,
  });
};

type PostQuery = {
  pageSize: number;
};

export const usePostsWithInfiniteQueries = (query: PostQuery) => {
  return useInfiniteQuery<Post[], Error>({
    queryKey: ['posts', query],
    queryFn: ({ pageParam = 1 }) =>
      fetchPosts({
        params: {
          _start: (pageParam - 1) * query.pageSize,
          _limit: query.pageSize,
        },
      }),
    staleTime: 1 * 60 * 1000, // 1m
    keepPreviousData: true,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length > 0 ? allPages.length + 1 : undefined; // only for json placeholder
    },
  });
};
