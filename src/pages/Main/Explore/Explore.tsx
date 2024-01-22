import { useGetRecentPosts, useGetSavePost, useSearchUser } from '@/lib/react-query/queriesAndMutation';
import Title from '../Shared/Title';
import exploreSVG from '/icons/wallpaper.svg'
import { useContext, useState } from 'react';
import { AuthContext } from '@/Context/AuthProvider';
import { Loader2, SearchCheck } from 'lucide-react';
import PostCard from '../Home/PostCard/PostCard';
import { Models } from 'appwrite';
import PostSkeleton from '@/components/skeletons/PostSkeleton';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import UserSkeleton from '@/components/skeletons/UserSkeleton';
import UserCard from '../Shared/UserCard';

const Explore = () => {
    const { data: posts, isPending: isPostLoading, isError: isErrorPost } = useGetRecentPosts()
    const { user } = useContext(AuthContext)
    const { data: savedPost, isLoading: isSavedPostLoading } = useGetSavePost(user.id)
    const [searchUserName, setSearchUserName] = useState<string>('')
    const { data: searchResult, isLoading: isSearchingLoading, isError: isSearchingError } = useSearchUser(searchUserName)

    return (
        <div>
            <Title svgSrc={exploreSVG} title='Explore' alt='Explore page icon' />
            <div className="flex w-full mt-2 max-w-md items-center space-x-2">
                <Input type="userName" onChange={(e) => setSearchUserName(e.target.value)} className='bg-dark-4 border-none' placeholder="Username" />
                <Button type="submit">Search</Button>
            </div>
            <div className='flex mt-5 gap-2 flex-wrap'>
                {
                    isSearchingLoading ?
                        <>
                            <UserSkeleton />
                            <UserSkeleton />
                            <UserSkeleton />
                        </> :
                        searchResult && searchResult?.documents?.map(user => <UserCard key={user.$id} user={user} />)
                }
                {
                    searchResult && searchResult.total==0 && <p>No user matched</p>
                }
            </div>
            {
                isPostLoading || isSavedPostLoading ?
                    <>
                        <PostSkeleton />
                    </> :
                    <>
                        {
                            !!searchUserName || posts?.documents?.map((post: Models.Document) => <PostCard key={post.$id} post={post} savedPost={savedPost} />)
                        }
                    </>
            }
        </div>
    );
};

export default Explore;