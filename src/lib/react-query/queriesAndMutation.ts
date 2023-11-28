import {
    useQuery,
    useMutation,
    useQueryClient,
    useInfiniteQuery,
} from '@tanstack/react-query'
import { createPost, createUserAccount, getRecentPosts, getSavePost, likePost, savePost, signInAccount, signOutAccount } from '../appwrite/api'
import { INewUser } from '@/types'
import { QUERY_KEYS } from './keys'

export const useCreateUserAccount = () => {
    return useMutation({
        mutationFn: (user: INewUser) => createUserAccount(user)
    })
}

export const useSignInAccount = () => {
    return useMutation({
        mutationFn: (user: { email: string, password: string }) => signInAccount(user)
    })
}

export const useSignOutAccount = () => {
    return useMutation({
        mutationFn: signOutAccount
    })
}

export const useCreateNewPost = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (post: {
            userID: string,
            caption: string,
            tags: string,
            file: File[]
        }) => createPost(post),
        onSuccess: () => queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
        })
    })
}

export const useGetRecentPosts = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
        queryFn: getRecentPosts
    })
}

export const useLikePost = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ postID, likesArray }: { postID: string, likesArray: string[] }) => likePost(postID, likesArray),
        onSuccess: (data, { postID }) => {
            const queryData = queryClient.getQueryData([QUERY_KEYS.GET_RECENT_POSTS])

            if (queryData && queryData.documents && Array.isArray(queryData.documents)) {
                const updatedDocuments = queryData.documents.map((item) => {
                    if (item.$id === postID) {
                        return { ...item, likes: data };
                    }
                    return item;
                });

                const updatedQueryData = { ...queryData, documents: updatedDocuments };
                queryClient.setQueryData([QUERY_KEYS.GET_RECENT_POSTS], updatedQueryData);
            }
        }

    })
}


export const useSavePost = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ userID, postID }: { userID: string, postID: string }) => savePost(userID, postID),
    })
}

export const useGetSavePost = (userID: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_SAVE_POST, userID],
        queryFn: async () => getSavePost(userID)
    })
}