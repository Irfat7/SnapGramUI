import ScrollToTop from '@/components/others/ScrollToTop';
import BottomBar from '@/pages/Main/Shared/BottomBar';
import LeftSideBar from '@/pages/Main/Shared/LeftSideBar';
import Topbar from '@/pages/Main/Shared/Topbar';
import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

const Main = () => {
    const { pathname } = useLocation()

    useEffect(()=>{
        localStorage.removeItem('/')
        localStorage.removeItem('/explore')
    },[])
    window.onscroll = () => {
        if (pathname === '/' || pathname === '/explore') {
            localStorage.setItem(pathname, JSON.stringify(window.scrollY))
        }
    }

    return (
        <div className=''>
            <Topbar />
            <div className='flex'>
                <LeftSideBar />
                <div className='w-full md:w-2/3 px-3 mb-14 md:p-8'>
                    <ScrollToTop />
                    <Outlet />
                </div>
            </div>
            <BottomBar />
        </div>
    );
};

export default Main;