import { sidebarLinks } from '@/constatnts';
import { NavLink, useLocation } from 'react-router-dom';

const BottomBar = () => {
    const {pathname} = useLocation()

    return (
        <div className='fixed bg-dark-1 w-full bottom-0 md:hidden'>
            <ul className='flex justify-between gap-5'>
                {
                    sidebarLinks.map((link, index) => {
                        const isActive = link.route === pathname
                        return (
                            <li className={`flex-1 flex justify-center py-1 ${isActive && 'bg-primary-500'}`} key={index}>
                                <NavLink
                                    to={link.route}
                                    className={`group`}
                                    onClick={() => {
                                        if (isActive) {
                                            localStorage.setItem(pathname, '0')
                                            window.scrollTo({
                                                top: 0,
                                                left: 0
                                            })
                                        }
                                    }}
                                >
                                    <img src={link.imgURL} className={`block mx-auto ${isActive && 'invert-white'} group-hover:invert-white`} />
                                    <p className='text-sm'>{link.label}</p>
                                </NavLink>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    );
};

export default BottomBar;