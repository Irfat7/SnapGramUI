import UserCard from '../Shared/UserCard';
import { useGetNotFollowingUser } from '@/lib/react-query/queriesAndMutation';
import { AuthContext } from '@/Context/AuthProvider';
import UserSkeleton from '@/components/skeletons/UserSkeleton';

const AllUsers = () => {
    const { user } = useContext(AuthContext)
    const { data: suggestedUser, isLoading: isSuggestedUserLoading } = useGetNotFollowingUser(user.id)

    return (
        <div className='flex gap-2 flex-wrap'>
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
    );
};

export default AllUsers;