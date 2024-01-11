import { AuthContext } from '@/Context/AuthProvider';
import PostSkeleton from '@/components/skeletons/PostSkeleton';
import { useGetSavePost } from '@/lib/react-query/queriesAndMutation';
import { useContext } from 'react';
import personThinking from '/icons/thinking.svg'
import PostCard from '../Home/PostCard/PostCard';
import { Models } from 'appwrite';

const Saved = () => {
    const { user } = useContext(AuthContext)
    const { data: savedPosts, isLoading: isSaveLoading } = useGetSavePost(user.id)

    if (isSaveLoading) {
        return <PostSkeleton />
    }

    if (savedPosts?.total === 0) {
        return (
            <div className='md:w-2/3 h-screen fixed top-0 flex flex-col justify-center items-center text-center space-y-2'>
                <img
                    className='invert brightness-0 inline'
                    width={150}
                    src={personThinking}
                    alt="thinking person svg"
                />
                <p className='h3-bold md:h1-bold'>You don't have any post saved right now.</p>
            </div>
        )
    }

    return (
        <div>
            {savedPosts?.documents?.map((savedPost: Models.Document) => <PostCard key={savedPost.$id} post={savedPost.post} savedPost={savedPosts} />)}
        </div>
    );
};

export default Saved;