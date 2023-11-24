import { useContext, useEffect } from 'react';
import logo from '/images/logo.svg'
import { AuthContext } from '@/Context/AuthProvider';
import { Link, NavLink, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { sidebarLinks } from '@/constatnts';
import { Button } from '@/components/ui/button';
import logOutSVG from '/icons/logout.svg'
import { useSignOutAccount } from '@/lib/react-query/queriesAndMutation';

const LeftSideBar = () => {
    const { user, setAuthenticated } = useContext(AuthContext)
    const { pathname } = useLocation()
    const navigate = useNavigate()
    const { mutateAsync: signOut, isSuccess: signOutComplete } = useSignOutAccount()

    useEffect(() => {
        if (signOutComplete) {
            setAuthenticated(false)
            console.log('signed out')
            navigate('/form')
        }
    }, [signOutComplete])

    return (
        <div className='hidden md:block sticky h-screen w-1/4 bg-dark-2 space-y-8 px-10 py-8'>
            <img src={logo} width={130} height={325} alt="snapgram logo" />


            <Link to={`/user/${user.id}`} className='flex items-center gap-2'>
                <img src={user.imageURL} className='w-14 h-14 rounded-full' alt="user profile image" />
                <div className='h-12'>
                    <p className='body-bold'>{user.name}</p>
                    <p className='small-regular text-light-3'>{user.userName}</p>
                </div>
            </Link>

            <ul className='space-y-3'>
                {
                    sidebarLinks.map((link, index) => {
                        const isActive = link.route === pathname
                        return (
                            <li key={index}>
                                <NavLink
                                    to={link.route}
                                    className={`group flex gap-4 items-center p-2 ${isActive && 'bg-primary-500'} transition hover:bg-primary-500 rounded-md`}
                                >
                                    <img src={link.imgURL} className={`${isActive && 'invert-white'} group-hover:invert-white`} />
                                    <p className='text-xl'>{link.label}</p>
                                </NavLink>
                            </li>
                        )
                    })
                }
                <li>
                    <Button
                        onClick={() => signOut()}
                        className='group bg-transparent hover:bg-primary-500 active:bg-primary-500 w-full flex justify-start gap-4 p-2 '
                    >
                        <img src={logOutSVG} className='group-hover:invert-white group-active:invert-white' alt="" />
                        <p className='text-xl'>Sign-out</p>
                    </Button>
                </li>
            </ul>


        </div>
    );
};

export default LeftSideBar;