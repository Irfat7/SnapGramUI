import { useGetFollowingPost, useGetSavePost } from '@/lib/react-query/queriesAndMutation';
import homeSvg from '/icons/home.svg'
import Title from '../Shared/Title';
import PostCard from './PostCard/PostCard';
import { useContext } from 'react';
import { AuthContext } from '@/Context/AuthProvider';
import PostSkeleton from '@/components/skeletons/PostSkeleton';
import FollowMoreMsg from './FollowMoreMsg';

const Home = () => {
    const { user } = useContext(AuthContext)
    const { data: followingPost, isLoading: isFollowingPostLoading } = useGetFollowingPost(user.id)
    const { data: savedPost, isLoading: isSavedPostLoading } = useGetSavePost(user.id)

    return (
        <div>
            <Title svgSrc={homeSvg} title='Home' alt='Home page icon' />
            {
                isFollowingPostLoading || isSavedPostLoading ?
                    <div className='bg-redl'>
                        <PostSkeleton />
                        <PostSkeleton />
                        <PostSkeleton />
                    </div> :
                    followingPost?.documents?.length === 0 ?
                        <FollowMoreMsg /> :
                        <>
                            {
                                followingPost?.documents?.map(post => <PostCard key={post.$id} post={post} savedPost={savedPost} />)
                            }
                        </>
            }
        </div>
    );
};

export default Home;