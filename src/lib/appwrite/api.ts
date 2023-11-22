import { INewUser } from "@/types";
import { account, appwriteConfig, avatar, database } from "./config";
import { ID } from "appwrite";

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