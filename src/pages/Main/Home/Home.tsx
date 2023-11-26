import { useGetAllPosts, useGetRecentPosts } from '@/lib/react-query/queriesAndMutation';
import { Loader2 } from 'lucide-react';
import homeSvg from '/icons/home.svg'
import Title from '../Shared/Title';
import PostCard from './PostCard/PostCard';

const Home = () => {
    const { data: posts, isPending: isPostLoading, isError: isErrorPost } = useGetRecentPosts()

    return (
        <div>
            <Title svgSrc={homeSvg} title='Home' alt='Home page icon' />
            {
                isPostLoading && posts === null ?
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    </> :
                    <>
                        {
                            posts?.documents.map(post => <PostCard key={post.$id} post={post} />)
                        }
                    </>
            }
        </div>
    );
};

export default Home;