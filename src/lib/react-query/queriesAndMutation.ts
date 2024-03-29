import {
    useQuery,
    useMutation,
    useQueryClient,
} from '@tanstack/react-query'
import { createPost, createUserAccount, deletePost, deleteSavePost, followUser, getFollowingList, getFollowingPost, getNotFollowingUser, getRecentPosts, getSavePost, getSpecificUser, getSpecificUserPost, likePost, savePost, searchUser, signInAccount, signOutAccount, unFollowUser, updatePost, uploadProfilePicture } from '../appwrite/api'
import { INewUser } from '@/types'
import { QUERY_KEYS } from './keys'
import { Models } from 'appwrite'

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
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: signOutAccount,
        onSuccess: () => {
            queryClient.clear()
        }
    })
}

export const useCreateNewPost = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (post: {
            userID: string,
            caption: string,
            tags: string,
            file: File[] | string
        }) => createPost(post),
        onSuccess: () => queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
        })
    })
}

export const useDeletePost = (userID: string) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (postID: string) => deletePost(postID),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_RECENT_POSTS, userID]
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_FOLLOWING_POSTS, userID]
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_SPECIFIC_USER, userID]
            })
        }
    })
}

export const useUpdatePost = (userID: string) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (post: {
            postID: string,
            imageID: string,
            caption: string,
            tags: string,
            file: File[] | string
        }) => updatePost(post),
        onSuccess: (data, { postID }) => {
            const queryData = queryClient.getQueryData([QUERY_KEYS.GET_FOLLOWING_POSTS, userID]) as { documents?: Models.Document[] }

            if (queryData && queryData.documents && Array.isArray(queryData.documents)) {
                const updatedDocuments = queryData.documents.map((item: Models.Document) => {
                    if (item.$id === postID) {
                        return data;
                    }
                    return item;
                });

                const updatedQueryData = { ...queryData, documents: updatedDocuments };
                queryClient.setQueryData([QUERY_KEYS.GET_FOLLOWING_POSTS, userID], updatedQueryData);
            }
        }
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
            const queryData = queryClient.getQueryData([QUERY_KEYS.GET_RECENT_POSTS]) as { documents?: Models.Document[] }

            if (queryData && queryData.documents && Array.isArray(queryData.documents)) {
                const updatedDocuments = queryData.documents.map((item: Models.Document) => {
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

export const useGetSavePost = (userID: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_SAVE_POST],
        queryFn: async () => getSavePost(userID),
    })
}

export const useSavePost = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ userID, postID }: { userID: string, postID: string }) => savePost(userID, postID),
        onSuccess: () => queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.GET_SAVE_POST]
        })
    })
}

export const useDeleteSavePost = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (saveID: string) => deleteSavePost(saveID),
        onSuccess: () => queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.GET_SAVE_POST]
        })
    })
}

export const useGetFollowingList = (userID: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_FOLLOWING_LIST, userID],
        queryFn: async () => getFollowingList(userID)
    })
}

export const useGetNotFollowingUser = (userID: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_NOT_FOLLOWING_USER, userID],
        queryFn: async () => getNotFollowingUser(userID)
    })
}

export const useFollowUser = (userID: string) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ followerID, followingID }: { followerID: string, followingID: string }) => followUser(followerID, followingID),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_FOLLOWING_LIST, userID]
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_NOT_FOLLOWING_USER, userID]
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_FOLLOWING_POSTS, userID]
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_SPECIFIC_USER]
            })
        }
    })
}

export const useUnfollowUser = (userID: string) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ followerID, followingID }: { followerID: string, followingID: string }) => unFollowUser(followerID, followingID),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_FOLLOWING_LIST, userID]
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_NOT_FOLLOWING_USER, userID]
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_FOLLOWING_POSTS, userID]
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_SPECIFIC_USER]
            })
        }
    })
}

export const useGetFollowingPost = (userID: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_FOLLOWING_POSTS, userID],
        queryFn: async () => getFollowingPost(userID)
    })
}

export const useSearchUser = (userName: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_SEARCH_RESULT, userName],
        queryFn: async () => searchUser(userName)
    })
}

export const useGetSpecificUserPost = (userID: string | undefined) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_SPECIFIC_USER_POST, userID],
        queryFn: async () => getSpecificUserPost(userID)
    })
}

export const useGetSpecificUser = (userID: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_SPECIFIC_USER, userID],
        queryFn: async () => getSpecificUser(userID)
    })
}

export const useUploadProfilePicture = (userID: string) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (profilePic: FileList) => uploadProfilePicture(profilePic, userID),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_SPECIFIC_USER]
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_FOLLOWING_POSTS, userID]
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_SPECIFIC_USER_POST, userID]
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_RECENT_POSTS, userID]
            })
        }
    })
}