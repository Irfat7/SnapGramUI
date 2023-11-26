import { AuthContext } from '@/Context/AuthProvider';
import BottomBar from '@/pages/Main/Shared/BottomBar';
import LeftSideBar from '@/pages/Main/Shared/LeftSideBar';
import Topbar from '@/pages/Main/Shared/Topbar';
import { useContext, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

const Main = () => {

    return (
        <div className=''>
            <Topbar />
            <div className='flex'>
                <LeftSideBar />
                <div className='md:w-1/2 px-3 md:p-8'>
                    <Outlet />
                </div>
            </div>
            <BottomBar />
        </div>
    );
};

export default Main;