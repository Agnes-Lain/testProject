// Need to use the React-specific entry point to import createApi
import { createApi } from '@reduxjs/toolkit/query/react'
import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import { getValueFor } from "../utils/secreteStore"

const API_URL = 'http://192.168.1.53:3000/users/tokens';

const getAccessToken = async () => {
  const token = await getValueFor('accessToken');
  return token
};

const getRefreshToken = async () => {
  const token = await getValueFor('refreshToken');
  return token
};

export const authApi = createApi ({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: async (headers) => {
      const token = await getAccessToken();
      if (token === null) {
        Alert.alert('You have to sign in or sign up first :)');
      }
      headers.set ('Authorization', `Bearer ${token}`);
    }
  }),
  // do we need tagTypes here?
  tagTypes: ['Tokens'],
  endpoints: (builder) => ({
    // get userAuth info with the stocked token to verify if user session is valide or not:
    getInfo: builder.query({
      query: () => '/info',
      providesTags: ['Tokens']
    }),
    // Signin the user to get the token
    signIn: builder.mutation({
      query: (email, password) => ({
        url: '/sign_in',
        method: 'POST',
        body: [email, password]
      }),
      providesTags: ['Tokens']
    }),
    // SignUp the user to get the token
    signUp: builder.mutation({
      query: (email, password, rePassword,userName) => ({
        url: '/sign_up',
        method: 'POST',
        body: [email, password, userName]
      }),
      providesTags: ['Tokens']
    }),
    // Refresh the access token with refreshToken when the access token is nolonger validate after 1 hour:
    refreshAccessToken: builder.mutation({
      query: async () => {
        const refreshToken = await getRefreshToken();
        console.log({ refreshToken });

        return ({
          url: '/refresh',
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${refreshToken}`
          },
        })
      },
      providesTags: ['Tokens']
    }),
    // Sign out the user when signOut request fired.
    signOut: builder.mutation({
      query: () => ({
        url: '/revoke',
        method: 'POST',
      }),
      invalidatesTags: ['Tokens']
    }),
  })
})

export const {
  useGetInfoQuery,
  useSignInMutation,
  useSignOutMutation,
  useSignUpMutation,
  useRefreshAccessTokenMutation
} = authApi
