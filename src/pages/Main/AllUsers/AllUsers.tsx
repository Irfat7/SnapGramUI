import React, { useContext } from 'react';
import UserCard from './UserCard';
import { useGetNotFollowingUser } from '@/lib/react-query/queriesAndMutation';
import { AuthContext } from '@/Context/AuthProvider';

const AllUsers = () => {
    const { user } = useContext(AuthContext)
    const { data: notFollowingUser, isLoading: isNotFollowingUserLoading } = useGetNotFollowingUser(user.id)
    if (isNotFollowingUserLoading) {
        return <p>following list loading</p>
    }
    console.log(notFollowingUser)
    return (
        <div className='flex gap-2 flex-wrap'>
            {
                notFollowingUser?.map(user => <UserCard key={user.$id} user={user} />)
            }
        </div>
    );
};

export default AllUsers;