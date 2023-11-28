import { AuthContext } from '@/Context/AuthProvider';
import { useGetSavePost } from '@/lib/react-query/queriesAndMutation';
import { useContext } from 'react';

const Saved = () => {
    const { user } = useContext(AuthContext)
    const { data:savedPost, isLoading: isSaveLoading } = useGetSavePost(user.id)

    if (isSaveLoading) {
        return <p>loading</p>
    }
    console.log(savedPost)

    return (
        <div>
            
        </div>
    );
};

export default Saved;