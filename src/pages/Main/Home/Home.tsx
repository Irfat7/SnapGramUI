import { useGetAllPosts, useGetRecentPosts } from '@/lib/react-query/queriesAndMutation';
import { Loader2 } from 'lucide-react';
import homeSvg from '/icons/home.svg'
import Title from '../Shared/Title';

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
                        {console.log(posts?.documents)}
                    </>
            }

        </div>
    );
};

export default Home;