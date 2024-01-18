import ProfileSkeleton from '@/components/skeletons/ProfileSkeleton';
import { toast } from '@/components/ui/use-toast';
import { useGetSpecificUser, useGetSpecificUserPost } from '@/lib/react-query/queriesAndMutation';
import { useParams } from 'react-router-dom';
import NothingFound from '../Shared/NothingFound';

const User = () => {
    const { id: userID } = useParams()
    const { data: userInfo, isLoading: isUserInfoLoading, isError: isUserInfoError } = useGetSpecificUser(userID)
    const { data: posts, isLoading: isPostLoading, isError: isPostError } = useGetSpecificUserPost(userID)

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

    return (
        <div>
            <div className='flex flex-col items-center gap-3'>
                <p className='bg-gray-400 w-28 md:w-40 h-28 md:h-40 rounded-full animate-pulse'></p>
                <p className='bg-gray-400 w-40 md:w-60 h-5 md:h-6 animate-pulse'></p>
                <div className='flex gap-2'>
                    <p className='bg-gray-400 w-28 h-5 animate-pulse'></p>
                    <p className='bg-gray-400 w-28 h-5 animate-pulse'></p>
                </div>
            </div>
        </div>
    );
};

export default User;