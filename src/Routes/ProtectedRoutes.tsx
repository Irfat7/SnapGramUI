import { AuthContext } from '@/Context/AuthProvider';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
    const { authenticated, isLoading } = useContext(AuthContext)
    if (isLoading) {
        return <p>Loading</p>
    }
    else if (authenticated) {
        return children
    }

    console.log('redirecting to sign up')
    return <Navigate to='/sign-up' />
};

export default ProtectedRoutes;