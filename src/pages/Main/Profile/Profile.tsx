import ProfileSkeleton from '@/components/skeletons/ProfileSkeleton';
import { toast } from '@/components/ui/use-toast';
import { useFollowUser, useGetFollowingList, useGetSavePost, useGetSpecificUser, useGetSpecificUserPost, useUnfollowUser, useUploadProfilePicture } from '@/lib/react-query/queriesAndMutation';
import { useParams } from 'react-router-dom';
import NothingFound from '../Shared/NothingFound';
import PostCard from '../Home/PostCard/PostCard';
import { useContext } from 'react';
import { AuthContext } from '@/Context/AuthProvider';
import { Loader2 } from 'lucide-react';
import addSVG from '/icons/add-svg.svg'

const Profile = () => {
    const { user: loggedInUser, checkAuthUser } = useContext(AuthContext)
    const { id: userID } = useParams()

    if (!userID) { return <NothingFound /> }

    const { data: userInfo, isLoading: isUserInfoLoading, isError: isUserInfoError } = useGetSpecificUser(userID)
    const { data: posts, isLoading: isPostLoading, isError: isPostError } = useGetSpecificUserPost(userID)
    const { data: savedPost } = useGetSavePost(loggedInUser.id)
    const { data: followingList, isLoading: isFollowingListLoading } = useGetFollowingList(loggedInUser.id)
    const follows = !!followingList?.documents.find(eachFollowing => eachFollowing.following.$id == userID);
    const { mutateAsync: followUser, isSuccess: followingSuccess, isPending: isFollowingLoading, isError: failedFollowingUser } = useFollowUser(loggedInUser.id)
    const { mutateAsync: unfollowUser, isSuccess: unfollowingSuccess, isPending: isUnFollowingLoading, isError: failedUnfollowingUser } = useUnfollowUser(loggedInUser.id)
    const { mutateAsync: uploadProfilePic, isPending: isUpdatingProfilePic, isSuccess: profilePicSuccess } = useUploadProfilePicture(loggedInUser.id)

    const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        if (!e.target.files) {
            return toast({
                title: "Something went wrong! Try again later",
                className: 'bg-rose-600'
            })
        }
        const validFile = ['image/jpeg', 'image/jpg', 'image/png'].includes(e.target.files[0].type)
        if (!validFile) {
            return toast({
                title: "JPEG, JPG, PNG file supported only",
                className: 'bg-rose-600'
            })
        }

        const uploadedPic = await uploadProfilePic(e.target.files)
        if (uploadedPic?.$id) {
            checkAuthUser()
        }
    }

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
                        <div className='relative'>
                            <img src={user.imageURL} className='object-cover w-28 md:w-40 h-28 md:h-40 rounded-full'></img>
                            {
                                isUpdatingProfilePic && <div className='flex justify-center items-center absolute top-0 left-0 rounded-full w-28 md:w-40 h-28 md:h-40 bg-black/[.54] z-10'>
                                    <svg aria-hidden="true" className="inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                    </svg>
                                </div>
                            }
                            {
                                loggedInUser.id === userID && !isUpdatingProfilePic ? <form>
                                    <label htmlFor="plus-button" className="text-5xl absolute top-[70%] left-[65%] md:left-[76%] cursor-pointer">
                                        <img src={addSVG} alt="" />
                                    </label>
                                    <input name="profileImage" onChange={(e) => handleImage(e)} type='file' id="plus-button" className='hidden' />
                                </form> : ''
                            }
                        </div>
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