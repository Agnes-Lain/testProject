// Need to use the React-specific entry point to import createApi
import { createApi } from '@reduxjs/toolkit/query/react'
import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import { getValueFor, checkingAccess } from "../modules/Authentify";

const API_URL = 'http://192.168.1.53:3000/api/v1';

// Helper function to fetch the access token
const getAccessToken = async () => {
  try {
    const token = await getValueFor('accessToken');
    return token;
  } catch (error) {
    console.error('Error fetching access token:', error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

// Helper function to check access and fetch configuration with authorization headers
const getTokenWithAuthorization = async () => {
  try {
    const hasAccess = await checkingAccess();
    if (!hasAccess) {
      throw new Error('Access denied');
    }
    const token = await getAccessToken();
    return token
  } catch (error) {
    console.error('Error getting configuration with authorization:', error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

// Define a service using a base URL and expected endpoints
export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: async (headers) => {
      try {
        const token = await getTokenWithAuthorization();
        headers.set ('Authorization', `Bearer ${token}`);
        return headers
      } catch (error) {
        console.error('Error preparing headers:', error);
        return {}; // Return empty headers as fallback
      }
    }
  }),
  tagTypes: ['Post'],
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => '/posts',
      providesTags: ['Post']
    }),
    addPost: builder.mutation({
      query: (post) => ({
        url:'/posts',
        method: 'POST',
        body: post
      }),
      invalidatesTags: ['Post'],

    }),
    updatePost: builder.mutation({
      query: (post) => ({
        url:`/posts/${post.id}`,
        method: 'PATCH',
        body: post
      }),
      invalidatesTags: ['Post'],
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url:`/posts/${id}`,
        method: 'DELETE',
        body: id
      }),
      invalidatesTags: ['Post'],
    })
  }),
});

// Export hooks for usage in functional components
export const {
  useGetPostsQuery, useAddPostMutation, useUpdatePostMutation, useDeletePostMutation
} = postsApi;
