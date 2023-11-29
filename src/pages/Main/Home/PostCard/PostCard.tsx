import { Link } from "react-router-dom";
import likeSVG from '/icons/like.svg'
import likedSVG from '/icons/liked.svg'
import saveSVG from '/icons/save.svg'
import savedSVG from '/icons/saved.svg'
import { useContext, useState, useEffect } from "react";
import { Models } from "appwrite";
import { formatDateAgo } from "@/utils";
import { AuthContext } from "@/Context/AuthProvider";
import { useDeleteSavePost, useGetSavePost, useLikePost, useSavePost } from "@/lib/react-query/queriesAndMutation";
import useHasLiked from "@/hooks/useHasLiked";

type PostProps = {
    post: Models.Document
    savedPost: Models.Document
}

const PostCard = ({ post, savedPost }: PostProps) => {
    const { creator, caption, imageURL, tags, likes } = post
    const [modCaption, setModCaption] = useState(caption.length > 120 ? caption?.slice(0, 100) : caption)
    const { mutateAsync: likePost, isPending: isLikingPost } = useLikePost()
    const { user } = useContext(AuthContext)
    const [likeCount, setLikeCount] = useState(likes.length)
    const [userLiked, allLikeUserID] = useHasLiked(likes)
    const [hasLiked, setHasLiked] = useState(userLiked)

    const { mutateAsync: deleteSavePost, isPending: isDeletingPost } = useDeleteSavePost()
    const { mutateAsync: savePost, isPending: isSavingPost } = useSavePost()
    const [isSavedObj, setIsSavedObj] = useState(savedPost?.documents?.find((save: Models.Document) => post.$id === save?.post.$id))
    const [hasSaved, setHasSaved] = useState(!!isSavedObj)

    //like or unlike post
    const handleAction = async () => {
        let newLikes = [...allLikeUserID]

        if(isLikingPost){
            return
        }

        if (hasLiked) {
            newLikes = newLikes.filter((like: string) => like !== user.id)
            setLikeCount(likeCount - 1)
        }
        else {
            newLikes = [...newLikes, user.id]
            setLikeCount(likeCount + 1)
        }
        setHasLiked(!hasLiked)

        const updateLikedList = await likePost({ postID: post?.$id, likesArray: newLikes })
        setLikeCount(updateLikedList.length)
    }

    const handleSavePost = async () => {
        if(isSavingPost || isDeletingPost){
            return
        }
        
        if (hasSaved) {
            setHasSaved(false)
            const res = await deleteSavePost(isSavedObj.$id)
            if (res?.status === 'ok') {
                setIsSavedObj(undefined)
                return
            }
            setHasSaved(true)
        }
        else {
            setHasSaved(true)
            const res = await savePost({ userID: user.id, postID: post.$id })
            if (res) {
                setIsSavedObj(res)
                return
            }
            setHasSaved(false)
        }
    }

    return (
        <div className="space-y-1 my-4 bg-dark-3 px-2 py-3 rounded-lg">
            <Link to={`/profile/${creator?.$id}`} className='flex items-center gap-2'>
                <img
                    src={creator?.imageURL}
                    className='w-10 h-10 rounded-full'
                    alt="user profile image"
                />
                <div className='h-12'>
                    <p className='base-medium lg:body-bold text-light-1'>{creator?.name}</p>
                    <p className='subtle-semibold lg:small-regular small-regular flex-center gap-2 text-light-3'>{formatDateAgo(post?.$createdAt)}</p>
                </div>
            </Link>
            <p>{
                <span>
                    {modCaption} <span
                        hidden={caption.length < 120 || modCaption.length > 100}
                        onClick={() => setModCaption(caption)}
                        className="underline text-blue-400 cursor-pointer">
                        see more
                    </span>
                </span>
            }</p>
            <p>
                {
                    tags?.map((tag: string, index: number) => <span key={index} className="text-light-3">#{tag} </span>)
                }
            </p>
            <img
                src={imageURL}
                className="rounded-xl w-full object-contain"
                alt='image content'
            />
            <div className="flex justify-between">
                <div className="flex gap-2">
                    <img
                        src={hasLiked ? likedSVG : likeSVG}
                        alt="like-svg"
                        className="cursor-pointer"
                        onClick={handleAction}
                    />
                    <p>{likeCount}</p>
                </div>
                <div>
                    <img
                        src={hasSaved ? savedSVG : saveSVG}
                        alt="save-svg"
                        className="cursor-pointer"
                        onClick={handleSavePost}
                    />
                </div>
            </div>
        </div>
    );
};

export default PostCard;