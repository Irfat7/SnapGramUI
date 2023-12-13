import { Link } from 'react-router-dom';
import personThinking from '/icons/thinking.svg'

const FollowMoreMsg = () => {
    return (
        <div className='md:w-2/3 h-screen fixed top-0 flex flex-col justify-center items-center text-center space-y-2'>
            <img
                className='invert brightness-0 inline'
                width={150}
                src={personThinking}
                alt="thinking person svg"
            />
            <p className='h3-bold md:h1-bold'>You don't have any post right now.</p>
            <p className='base-regular md:base-medium'>Please
                <Link to='/all-users' className='text-primary-500 underline'> follow </Link>
                people to get more updates
            </p>
        </div>
    );
};

export default FollowMoreMsg;