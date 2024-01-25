import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        const scrollAmount = parseInt(localStorage.getItem(pathname) || "0")
        window.scrollTo({
            top: scrollAmount,
            left: 0,
            behavior: 'instant'
        });
    }, [pathname]);

    return null
};

export default ScrollToTop;