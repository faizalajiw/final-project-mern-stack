import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().user.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Post", "User"],

  endpoints: (builder) => ({
    // user signup
    signupUser: builder.mutation({
      query: (user) => ({
        url: "/users",
        method: "POST",
        body: user,
      }),
    }),

    // user login
    loginUser: builder.mutation({
      query: (user) => ({
        url: "/users/login",
        method: "POST",
        body: user,
      }),
    }),

    // user logout
    logoutUser: builder.mutation({
      query: () => ({
        url: "/users/logout",
        method: "DELETE",
      }),
    }),

    // post routes
    createPost: builder.mutation({
      query: (article) => ({
        url: "/posts",
        method: "POST",
        body: article,
      }),
      invalidatesTags: ["Post"],
    }),

    // get all posts
    getAllPosts: builder.query({
      query: () => ({
        url: "/posts",
      }),
      providesTags: ["Post"],
    }),

    // get one post by id
    getOnePost: builder.query({
      query: (id) => ({
        url: `/posts/${id}`,
      }),
    }),

    // get user posts myself
    getUserPosts: builder.query({
      query: () => ({
        url: "/posts/me",
      }),
      providesTags: ["Post"],
    }),

    // delete post
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Post"],
    }),

    // update post
    updatePost: builder.mutation({
      query: ({ id, ...post }) => ({
        url: `/posts/${id}`,
        method: "PATCH",
        body: post,
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});

export const {
  useSignupUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useCreatePostMutation,
  useGetAllPostsQuery,
  useGetOnePostQuery,
  useGetUserPostsQuery,
  useDeletePostMutation,
  useUpdatePostMutation,
} = apiSlice;
export default apiSlice;
