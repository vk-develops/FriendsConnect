import { USERS_AUTH_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const usersAuthApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_AUTH_URL}/register`,
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: data,
            }),
        }),

        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_AUTH_URL}/login`,
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: data,
            }),
        }),

        logout: builder.mutation({
            query: () => ({
                url: `${USERS_AUTH_URL}/logout`,
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            }),
        }),

        showAllFriends: builder.query({
            query: () => ({
                url: `${USERS_AUTH_URL}/friends/show-friends`,
                method: "GET",
                credentials: "include",
            }),
        }),

        sendFriendRequest: builder.mutation({
            query: ({ id }) => ({
                url: `${USERS_AUTH_URL}/friends/send-request/${id}`,
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            }),
        }),

        acceptFriendRequest: builder.mutation({
            query: ({ id }) => ({
                url: `${USERS_AUTH_URL}/friends/accept-request/${id}`,
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            }),
        }),
    }),
});

export const {
    useRegisterMutation,
    useLoginMutation,
    useLogoutMutation,
    useShowAllFriendsQuery,
    useSendFriendRequestMutation,
    useAcceptFriendRequestMutation,
} = usersAuthApiSlice;
