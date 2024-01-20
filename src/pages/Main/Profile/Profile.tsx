import ProfileSkeleton from '@/components/skeletons/ProfileSkeleton';
import { toast } from '@/components/ui/use-toast';
import { useFollowUser, useGetFollowingList, useGetSavePost, useGetSpecificUser, useGetSpecificUserPost, useUnfollowUser } from '@/lib/react-query/queriesAndMutation';
import { useParams } from 'react-router-dom';
import NothingFound from '../Shared/NothingFound';
import PostCard from '../Home/PostCard/PostCard';
import { useContext } from 'react';
import { AuthContext } from '@/Context/AuthProvider';
import { Loader2 } from 'lucide-react';

const Profile = () => {
    const { user: loggedInUser } = useContext(AuthContext)
    const { id: userID } = useParams()

    if (!userID) { return <NothingFound /> }

    const { data: userInfo, isLoading: isUserInfoLoading, isError: isUserInfoError } = useGetSpecificUser(userID)
    const { data: posts, isLoading: isPostLoading, isError: isPostError } = useGetSpecificUserPost(userID)
    const { data: savedPost } = useGetSavePost(loggedInUser.id)
    const { data: followingList, isLoading: isFollowingListLoading } = useGetFollowingList(loggedInUser.id)
    const follows = !!followingList?.documents.find(eachFollowing => eachFollowing.following.$id == userID);
    const { mutateAsync: followUser, isSuccess: followingSuccess, isPending: isFollowingLoading, isError: failedFollowingUser } = useFollowUser(loggedInUser.id)
    const { mutateAsync: unfollowUser, isSuccess: unfollowingSuccess, isPending: isUnFollowingLoading, isError: failedUnfollowingUser } = useUnfollowUser(loggedInUser.id)

    if (isPostLoading || isUserInfoLoading || isFollowingListLoading) {
        return <ProfileSkeleton />
    }

    else if (isUserInfoError || isPostError) {
        toast({
            title: "Something wrong happened",
            className: 'bg-rose-600'
        })
        return <></>
    }

    else if (userInfo?.total === 0) {
        return <NothingFound />
    }

    let button: JSX.Element
    if (isFollowingLoading || isUnFollowingLoading) {
        button = <Loader2 className="mr-2 h-4 w-4 animate-spin" />
    }
    else {
        if (follows) {
            button = <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800" onClick={() => unfollowUser({ followerID: loggedInUser.id, followingID: userID })}>Unfollow</button>
        }
        else {
            button = <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800" onClick={() => followUser({ followerID: loggedInUser.id, followingID: userID })} >Follow</button>
        }
    }

    return (
        <div>
            {
                userInfo?.documents.map(user => (
                    <div className='flex flex-col items-center gap-3 mb-4 md:mb-9' key={user.$id}>
                        <img src={user.imageURL} className='w-28 md:w-40 h-28 md:h-40 rounded-full'></img>
                        {
                            loggedInUser.id === userID ? '' : button
                        }
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
                posts?.documents.map(post => <PostCard key={post.$id} post={post} savedPost={savedPost} />)
            }
        </div>
    );
};

export default Profile;