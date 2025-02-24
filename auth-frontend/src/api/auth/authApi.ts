import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface User {
  name: string;
  email: string;
}

interface AuthResponse {
  user: User;
  token: string;
}

interface AuthCredentials {
  email: string;
  password: string;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, AuthCredentials>({
      query: (credentials) => ({
        url: "/auth/signin",
        method: "POST",
        body: credentials,
      }),
    }),
    signup: builder.mutation<AuthResponse, AuthCredentials & { name: string }>({
      query: (userData) => ({
        url: "/auth/signup",
        method: "POST",
        body: userData,
      }),
    }),
    protected: builder.query({
      query: () => "/protected",
    }),
  }),
});

export const { useLoginMutation, useSignupMutation, useProtectedQuery } =
  authApi;
