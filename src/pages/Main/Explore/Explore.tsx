import { useGetRecentPosts, useGetSavePost } from '@/lib/react-query/queriesAndMutation';
import Title from '../Shared/Title';
import exploreSVG from '/icons/wallpaper.svg'
import { useContext } from 'react';
import { AuthContext } from '@/Context/AuthProvider';
import { Loader2 } from 'lucide-react';
import PostCard from '../Home/PostCard/PostCard';
import { Models } from 'appwrite';
import PostSkeleton from '@/components/skeletons/PostSkeleton';

const Explore = () => {
    const { data: posts, isPending: isPostLoading, isError: isErrorPost } = useGetRecentPosts()
    const { user } = useContext(AuthContext)
    const { data: savedPost, isLoading: isSavedPostLoading } = useGetSavePost(user.id)

    return (
        <div>
            <Title svgSrc={exploreSVG} title='Explore' alt='Explore page icon' />
            {
                isPostLoading || isSavedPostLoading ?
                    <>
                        <PostSkeleton />
                    </> :
                    <>
                        {
                            posts?.documents?.map((post: Models.Document) => <PostCard key={post.$id} post={post} savedPost={savedPost} />)
                        }
                    </>
            }
        </div>
    );
};

export default Explore;