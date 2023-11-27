import { Link } from "react-router-dom";
import likeSVG from '/icons/like.svg'
import likedSVG from '/icons/liked.svg'
import saveSVG from '/icons/save.svg'
import savedSVG from '/icons/saved.svg'
import { useContext, useState } from "react";
import { Models } from "appwrite";
import { formatDateAgo } from "@/utils";
import { AuthContext } from "@/Context/AuthProvider";
import { useLikePost } from "@/lib/react-query/queriesAndMutation";

type PostProps = {
    post: Models.Document
}

const PostCard = ({ post }: PostProps) => {
    const { creator, caption, imageURL, tags, likes } = post
    const [modCaption, setModCaption] = useState(caption.length > 120 ? caption?.slice(0, 100) : caption)
    const { mutateAsync: likePost } = useLikePost()
    const { user } = useContext(AuthContext)
    const [likeCount, setLikeCount] = useState(likes.length)
    const [allLikes] = useState(likes?.map((like: Models.Document) => like.$id))
    const [hasLiked, setHasLiked] = useState(allLikes?.includes(user.id))

    const handleAction = async () => {
        let newLikes = [...allLikes]

        setHasLiked(!hasLiked)
        if (hasLiked) {
            newLikes = newLikes.filter((like: string) => like !== user.id)
            setLikeCount(likeCount - 1)
        }
        else {
            newLikes = [...newLikes, user.id]
            setLikeCount(likeCount + 1)
        }
        const updateLikedList = await likePost({ postID: post?.$id, likesArray: newLikes })
        setLikeCount(updateLikedList.length)
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
                        src={saveSVG}
                        alt="save-svg"
                        className="cursor-pointer"
                        onClick={() => { }}
                    />
                </div>
            </div>
        </div>
    );
};

export default PostCard;