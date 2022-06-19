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
  endpoints: builder => ({
    // user signup
    signupUser: builder.mutation({
      query: user => ({
        url: "/users",
        method: "POST",
        body: user,
      }),
    }),

    // user login
    loginUser: builder.mutation({
      query: user => ({
        url: "/users/login",
        method: "POST",
        body: user,
      }),
    }),

    // user logout
    // logoutUser: builder.mutation({
    //   query: () => ({
    //     url: "/users/logout",
    //     method: "DELETE",
    //   }),
    // }),

    // post routes
    createPost: builder.mutation({
      query: article => ({
        url: "/posts",
        method: "POST",
        body: article,
      }),
    }),

    getAllPosts: builder.query({
      query: () => ({
        url: "/posts",
      })
    })
  }),
});

export const {
  useSignupUserMutation,
  useLoginUserMutation,
  useCreatePostMutation,
  useGetAllPostsQuery,
} = apiSlice;
export default apiSlice;
