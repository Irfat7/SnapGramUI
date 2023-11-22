import { Outlet } from 'react-router-dom'
import sideImg from '/images/side-img.svg'
import logo from '/images/logo.svg'
import { useContext, useEffect, } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '@/Context/AuthProvider'

const Form = () => {
    const navigate = useNavigate()
    const { checkAuthUser } = useContext(AuthContext)

    useEffect(() => {
        (async () => {
            if (
                localStorage.getItem('cookieFallBack') !== '[]' ||
                localStorage.getItem('cookieFallBack') !== null
            ) {
                await checkAuthUser() && navigate('/home')
            }
        })()
    }, [])

    return (
        <div className='md:h-screen md:flex md:justify-between bg-black bg-opacity-70'>
            <div className='h-screen px-3 py-8 m-auto text-center md:h-auto md:p-0 md:w-1/4'>
                <img className='mx-auto mb-4' src={logo} alt="Snapgram logo" />
                <Outlet />
            </div>
            <img className='fixed -z-10 md:z-0 top-0 h-screen md:static md:w-1/2 object-cover' src={sideImg} alt="Side Image" />
        </div>
    );
};

export default Form;