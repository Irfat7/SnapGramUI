import { Link } from "react-router-dom";
import likeSVG from '/icons/like.svg'
import likedSVG from '/icons/like.svg'
import saveSVG from '/icons/save.svg'
import savedSVG from '/icons/save.svg'
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
    const { mutate: likePost } = useLikePost()
    const [ likeCount, setLikeCount ] = useState(likes.length || 0)
    const { user } = useContext(AuthContext)

    console.log(likes)

    const handleAction = async() => {
        const hasLiked = likes?.find((like: Models.Document) => like?.$id === user.id)

        let newLikes = [...likes]

        if (hasLiked) {
            newLikes = newLikes?.filter((like: Models.Document) => like?.$id !== user.id)
        }
        else {
            newLikes = [...newLikes, user.id]
        }
        likePost({ postID: post?.$id, likesArray: newLikes })
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
                        hidden={modCaption.length > 120}
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
                        src={likeSVG}
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