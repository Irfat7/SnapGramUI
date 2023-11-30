import { useGetRecentPosts, useGetSavePost } from '@/lib/react-query/queriesAndMutation';
import { Loader2 } from 'lucide-react';
import homeSvg from '/icons/home.svg'
import Title from '../Shared/Title';
import PostCard from './PostCard/PostCard';
import { useContext } from 'react';
import { AuthContext } from '@/Context/AuthProvider';

const Home = () => {
    const { data: posts, isPending: isPostLoading, isError: isErrorPost } = useGetRecentPosts()
    const {user} = useContext(AuthContext)
    const {data:savedPost, isLoading: isSavedPostLoading} = useGetSavePost(user.id)
    

    return (
        <div>
            <Title svgSrc={homeSvg} title='Home' alt='Home page icon' />
            {
                (isPostLoading && posts === null) || isSavedPostLoading ?
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    </> :
                    <>
                        {
                            posts?.documents?.map(post => <PostCard key={post.$id} post={post} savedPost={savedPost} />)
                        }
                    </>
            }
        </div>
    );
};

export default Home;