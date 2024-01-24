import UserCard from '../Shared/UserCard';
import { useGetNotFollowingUser } from '@/lib/react-query/queriesAndMutation';
import { AuthContext } from '@/Context/AuthProvider';
import UserSkeleton from '@/components/skeletons/UserSkeleton';
import { useContext } from 'react';
import Title from '../Shared/Title';
import peopleSVG from '/icons/people.svg'

const AllUsers = () => {
    const { user } = useContext(AuthContext)
    const { data: suggestedUser, isLoading: isSuggestedUserLoading } = useGetNotFollowingUser(user.id)

    return (
        <div>
            <Title svgSrc={peopleSVG} title='People' alt='Explore page icon' />
            <div className='flex gap-2 flex-wrap mt-2'>
                {
                    isSuggestedUserLoading ?
                        <>
                            <UserSkeleton />
                            <UserSkeleton />
                            <UserSkeleton />
                        </> :
                        suggestedUser?.map(user => <UserCard key={user.$id} user={user} />)
                }
            </div>
        </div>
    );
};

export default AllUsers;