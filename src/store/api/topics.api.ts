import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../utils/constants";

export interface IPost {
  userId: number,
  id: number,
  title: string,
  body: string
};

export const topicsApi = createApi({
  reducerPath: 'post',
  baseQuery: fetchBaseQuery({ baseUrl:BASE_URL }),
  endpoints:(build)=>({
      getAllPosts: build.query<IPost[],{ limit: number, start: number }>({
          query:({ limit = 5, start = 0 })=>({
              url:'/posts',
              params: { _limit: limit, _start: start }
          }),
          serializeQueryArgs: ({ endpointName }) => {
            return endpointName;
          },
          // Always merge incoming data to the cache entry
          // https://redux-toolkit.js.org/rtk-query/api/createApi#merge
          merge: (currentCache, newItems) => {
            currentCache.push(...newItems);
          },
          // Refetch when the page arg changes
          forceRefetch({ currentArg, previousArg }) {
            return currentArg !== previousArg;
          }
      }),
      getPostById: build.query<IPost, number>({
          query:(id: number = 1)=>({
              url:`/posts/${id}`,
          })
      })
  })
});

export const { useGetAllPostsQuery, useGetPostByIdQuery } = topicsApi;

