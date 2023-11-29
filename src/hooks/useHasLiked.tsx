import { AuthContext } from '@/Context/AuthProvider';
import { Models } from 'appwrite';
import { useContext } from 'react';

const useHasLiked = (allLikes: Models.Document[]): [boolean, string[]] => {
    const { user } = useContext(AuthContext)
    const allLikeUserID = allLikes?.map((like: Models.Document) => like.$id)
    const hasLiked = allLikeUserID?.includes(user.id)

    return [hasLiked, allLikeUserID]
};

export default useHasLiked;