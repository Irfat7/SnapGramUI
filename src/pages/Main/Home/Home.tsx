import { useGetFollowingList, useGetFollowingPost, useGetRecentPosts, useGetSavePost } from '@/lib/react-query/queriesAndMutation';
import { Loader2 } from 'lucide-react';
import homeSvg from '/icons/home.svg'
import Title from '../Shared/Title';
import PostCard from './PostCard/PostCard';
import { useContext } from 'react';
import { AuthContext } from '@/Context/AuthProvider';

const Home = () => {
    const { user } = useContext(AuthContext)
    const { data: followingPost, isLoading: isFollowingPostLoading, isError: isFollowingPostError } = useGetFollowingPost(user.id)
    const { data: savedPost, isLoading: isSavedPostLoading } = useGetSavePost(user.id)

    console.log(followingPost)

    return (
        <div>
            <Title svgSrc={homeSvg} title='Home' alt='Home page icon' />
            {
                isFollowingPostLoading || isSavedPostLoading ?
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    </> :
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