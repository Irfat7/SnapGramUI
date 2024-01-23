import { Link, useNavigate } from 'react-router-dom';
import logo from '/images/logo.svg'
import { Button } from '@/components/ui/button';
import { useSignOutAccount } from '@/lib/react-query/queriesAndMutation';
import { useContext, useEffect } from 'react';
import { AuthContext, initialUser } from '@/Context/AuthProvider';
import { IoLogOut } from "react-icons/io5";

const Topbar = () => {
    const { user, setAuthenticated, setUser } = useContext(AuthContext)
    const { mutateAsync: signOut, isSuccess: signOutComplete } = useSignOutAccount()
    const navigate = useNavigate()

    useEffect(() => {
        if (signOutComplete) {
            setAuthenticated(false)
            setUser(initialUser)
            navigate('/form')
        }
    }, [signOutComplete])

    return (
        <div className='sticky top-0 left-0 bg-black z-10 p-3 md:hidden flex justify-between items-center'>
            <Link to={'/home'}><img src={logo} width={130} height={325} alt="snapgram logo" /></Link>
            <div className='flex items-center gap-3'>
                <Button onClick={() => signOut()} className='bg-transparent p-0'>
                    <IoLogOut size='1.7em' className='text-blue-400' />
                </Button>
                <Link to={`/profile/${user.id}`}>
                    <img src={user.imageURL} className='w-8 h-8 rounded-full' alt="" />
                </Link>
            </div>
        </div>
    );
};

export default Topbar;