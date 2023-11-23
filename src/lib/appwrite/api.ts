import { INewUser } from "@/types";
import { account, appwriteConfig, avatar, database } from "./config";
import { ID, Query } from "appwrite";

export const saveUserToDB = async (user: {
    accountID: string;
    email: string;
    name: string;
    imageURL: URL;
    userName?: string;
}) => {
    try {
        const newUser = await database.createDocument(
            appwriteConfig.databaseID,
            appwriteConfig.usersCollectionID,
            ID.unique(),
            user);

        return newUser
    }
    catch (error) {
        console.log(error)
    }
}

export const createUserAccount = async (user: INewUser) => {
    try {
        const newAccount = await account.create(ID.unique(), user.email, user.password, user.name);

        if (!newAccount) throw Error

        const avatarURL = avatar.getInitials(user.name)

        const newUser = await saveUserToDB({
            accountID: newAccount.$id,
            email: newAccount.email,
            name: newAccount.name,
            imageURL: avatarURL,
            userName: user.userName,
        })

        return newUser

    }
    catch (error) {
        console.log(error)
    }
}

export const signInAccount = async (user: { email: string, password: string }) => {
    try {
        const loggedInUser = await account.createEmailSession(user.email, user.password);
        return loggedInUser
    }
    catch (error) {
        console.log(error)
    }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get()

        if (!currentAccount) throw Error

        const currentUser = await database.listDocuments(
            appwriteConfig.databaseID,
            appwriteConfig.usersCollectionID,
            [
                Query.equal('accountID', currentAccount.$id)
            ])

        if (!currentUser) throw Error

        return currentUser.documents[0]
    }
    catch (error) {
        console.log(error)
    }
}

export const signOutAccount = async () => {
    try {
        const signOut = await account.deleteSession('current');
        if (signOut) {
            return true
        }
        else {
            return false
        }
    }
    catch (error) {
        console.log(error)
    }
}