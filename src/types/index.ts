import { File } from "buffer";
import { type } from "os";

export type INewUser = {
    name: string;
    email: string;
    userName: string;
    password: string;
}

export type IUser = {
    id: string;
    name: string;
    userName: string;
    email: string;
    bio: string;
    imageURL: URL | string,
}

export type IContext = {
    user: IUser,
    setUser: React.Dispatch<React.SetStateAction<IUser>>,
    isLoading: boolean,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    authenticated: boolean,
    setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>,
    checkAuthUser: () => Promise<boolean>,
}

export type IPost = {
    caption: string;
    tags: string;
}