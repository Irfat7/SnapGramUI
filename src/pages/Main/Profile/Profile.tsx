import ProfileSkeleton from '@/components/skeletons/ProfileSkeleton';
import { useGetSpecificUserPost } from '@/lib/react-query/queriesAndMutation';
import { useParams } from 'react-router-dom';

const User = () => {
    const { id: userID } = useParams()
    const { data: posts, isLoading: isPostLoading, isError: isPostError } = useGetSpecificUserPost(userID)
    if (!isPostLoading) {
        console.log(posts)
    }
    return (
        <div>
            {
                /* isPostLoading && */ <ProfileSkeleton />
            }
        </div>
    );
};

export default User;