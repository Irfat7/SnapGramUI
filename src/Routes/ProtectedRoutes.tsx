import { AuthContext } from '@/Context/AuthProvider';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { LineWave } from  'react-loader-spinner'

const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
    const { authenticated, isLoading } = useContext(AuthContext)
    if (isLoading) {
        return (
            <div className='h-screen w-screen fixed top-0 left-0 flex justify-center items-center'>
                <LineWave height={600} width={150} color="#877EFF" middleLineColor="#877EFF" lastLineColor="#877EFF" />
            </div>
        )
    }
    else if (authenticated) {
        return children
    }
    
    return <Navigate to='/form' />
};

export default ProtectedRoutes;