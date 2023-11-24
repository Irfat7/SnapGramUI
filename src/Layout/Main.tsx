import { AuthContext } from '@/Context/AuthProvider';
import LeftSideBar from '@/pages/Main/Shared/LeftSideBar';
import Topbar from '@/pages/Main/Shared/Topbar';
import { useContext, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

const Main = () => {

    return (
        <div>
            <Topbar />
            <div className='flex'>
                <LeftSideBar />
                <div className='w-full'>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Main;