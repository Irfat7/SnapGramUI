import { useSignOutAccount } from '@/lib/react-query/queriesAndMutation';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
    const { mutateAsync: signOut, isPending: isSigningOut } = useSignOutAccount()
    const navigate = useNavigate()
    const signOutHandler = async() => {
        const signedOut = await signOut()
        if(signedOut){
            console.log('signed out successfully')
            navigate('/sign-in')
        }
        else{
            console.log('failed to sign out')
        }
    }
    return (
        <div>
            <h1>Welcome User</h1>
            <button onClick={signOutHandler}>Logout</button>
        </div>
    );
};

export default Welcome;