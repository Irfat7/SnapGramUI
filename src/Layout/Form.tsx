import { Outlet } from 'react-router-dom'
import sideImg from '/images/side-img.svg'
import logo from '/images/logo.svg'

const Form = () => {
    return (
        <div className='h-screen md:flex md:justify-between'>
            <div className='m-auto text-center w-1/4'>
                <img className='mx-auto mb-8' src={logo} alt="Snapgram logo" />
                <Outlet />
            </div>
            <img className='w-1/2 object-cover' src={sideImg} alt="Side Image" />
        </div>
    );
};

export default Form;