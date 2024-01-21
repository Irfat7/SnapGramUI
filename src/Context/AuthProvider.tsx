import { getCurrentUser } from '@/lib/appwrite/api';
import { IContext, IUser } from '@/types';
import React, { useEffect } from 'react';
import { createContext, useState } from 'react';

const initialUser = {
    id: '',
    name: '',
    userName: '',
    email: '',
    bio: '',
    imageURL: '',
}

const initialContext = {
    user: initialUser,
    setUser: () => { },
    isLoading: true,
    setIsLoading: () => { },
    authenticated: false,
    setAuthenticated: () => { },
    checkAuthUser: async () => false as boolean,
}

export const AuthContext = createContext<IContext>(initialContext)

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<IUser>(initialUser)
    const [isLoading, setIsLoading] = useState(true)
    const [authenticated, setAuthenticated] = useState(false)

    useEffect(() => {
        checkAuthUser()
    }, [authenticated])

    const checkAuthUser = async (): Promise<boolean> => {
        try {
            const currentAccount = await getCurrentUser()
            if (currentAccount) {
                setUser({
                    id: currentAccount.$id,
                    name: currentAccount.name,
                    userName: currentAccount.userName,
                    email: currentAccount.email,
                    bio: currentAccount.bio,
                    imageURL: currentAccount.imageURL,
                })
                console.log('should b updated')
                setAuthenticated(true)
                setIsLoading(false)
                return true
            }
        }
        catch (error) {
            console.log(error)
        }
        finally {
            setIsLoading(false)
        }
        return false
    }

    const value = {
        user,
        setUser,
        isLoading,
        setIsLoading,
        authenticated,
        setAuthenticated,
        checkAuthUser,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )

};

export default AuthProvider;