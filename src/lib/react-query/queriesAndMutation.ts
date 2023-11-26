import {
    useQuery,
    useMutation,
    useQueryClient,
    useInfiniteQuery,
} from '@tanstack/react-query'
import { createPost, createUserAccount, getRecentPosts, likePost, signInAccount, signOutAccount } from '../appwrite/api'
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

//fix here
export const useLikePost = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ postID, likesArray }: { postID: string, likesArray: string[] }) => likePost(postID, likesArray),
        onSuccess: (data) => queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
        })
    })
}

export const useSavePost = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ postID, likesArray }: { postID: string, likesArray: string[] }) => likePost(postID, likesArray),
        onSuccess: () => queryClient.invalidateQueries()
    })
}