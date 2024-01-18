import PostSkeleton from './PostSkeleton';

const ProfileSkeleton = () => {
    return (
        <div className=''>
            <div className='flex flex-col items-center gap-3'>
                <p className='bg-gray-400 w-28 md:w-40 h-28 md:h-40 rounded-full animate-pulse'></p>
                <p className='bg-gray-400 w-40 md:w-60 h-5 md:h-6 animate-pulse'></p>
                <div className='flex gap-2'>
                    <p className='bg-gray-400 w-28 h-5 animate-pulse'></p>
                    <p className='bg-gray-400 w-28 h-5 animate-pulse'></p>
                </div>
            </div>
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
        </div>
    );
};

export default ProfileSkeleton;