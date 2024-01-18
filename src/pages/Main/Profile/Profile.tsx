import ProfileSkeleton from '@/components/skeletons/ProfileSkeleton';
import { toast } from '@/components/ui/use-toast';
import { useGetSavePost, useGetSpecificUser, useGetSpecificUserPost } from '@/lib/react-query/queriesAndMutation';
import { useParams } from 'react-router-dom';
import NothingFound from '../Shared/NothingFound';
import PostCard from '../Home/PostCard/PostCard';
import { useContext } from 'react';
import { AuthContext } from '@/Context/AuthProvider';

const User = () => {
    const { user: loggedInUser } = useContext(AuthContext)
    const { id: userID } = useParams()
    const { data: userInfo, isLoading: isUserInfoLoading, isError: isUserInfoError } = useGetSpecificUser(userID)
    const { data: posts, isLoading: isPostLoading, isError: isPostError } = useGetSpecificUserPost(userID)
    const { data: savedPost } = useGetSavePost(loggedInUser.id)

    if (isPostLoading || isUserInfoLoading) {
        return <ProfileSkeleton />
    }

    else if (isUserInfoError || isPostError) {
        return toast({
            title: "Something wrong happened",
            className: 'bg-rose-600'
        })
    }

    else if (userInfo?.total === 0) {
        return <NothingFound />
    }

    console.log(userInfo?.documents)

    return (
        <div>
            {
                userInfo?.documents.map(user => (
                    <div className='flex flex-col items-center gap-3 mb-4 md:mb-9' key={user.$id}>
                        <img src={user.imageURL} className='w-28 md:w-40 h-28 md:h-40 rounded-full'></img>
                        <p className='text-xl md:text-3xl font-bold text-center w-40 md:w-60 h-5 md:h-6'>{user.name}</p>
                        <p className='text-slate-400 text-sm md:text-base text-center w-40 md:w-60 h-5 md:h-6'>@{user.userName}</p>
                        <div className='flex'>
                            <p className='font-bold text-center w-28 h-5'>Follower {user.follower.length}</p>
                            <p className='font-bold text-center w-28 h-5'>Following {user.following.length}</p>
                        </div>
                    </div>
                ))
            }
            {
                posts?.documents.map(post => <PostCard post={post} savedPost={savedPost} />)
            }
        </div>
    );
};

export default User;