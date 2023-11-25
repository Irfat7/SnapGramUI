import { INewUser } from "@/types";
import { account, appwriteConfig, avatar, database, storage } from "./config";
import { ID, Query } from "appwrite";
import { error } from "console";

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

const uploadImage = async (file: File) => {
    try {
        const uploadImage = await storage.createFile(appwriteConfig.storageID, ID.unique(), file)

        if (!uploadImage) throw Error

        return uploadImage
    }
    catch (error) {
        console.log(error)
    }
}

const deleteImage = async (id: string) => {
    try {
        const deletedImage = await storage.deleteFile(appwriteConfig.storageID, id)
        if (!deletedImage) throw Error
        return deleteImage
    }
    catch (error) {
        console.log(error)
    }
}

const getFilePreview = (id: string) => {
    try {
        const fileURL = storage.getFilePreview(appwriteConfig.storageID, id)

        if (!fileURL) throw Error

        return fileURL
    }
    catch (error) {
        console.log(error)
    }
}

export const createPost = async (post: { userID: string, caption: string, tags: string, file: File[] }) => {
    try {
        //image upload
        const uploadedImage = await uploadImage(post.file[0])

        if (!uploadedImage) throw Error

        const fileURL = getFilePreview(uploadedImage.$id)

        if (!fileURL) {
            await deleteImage(uploadedImage.$id)
            throw Error
        }

        //tag separate
        const tags = post.tags.split(',').map((item: string) => item.trim());


        const newPost = await database.createDocument(
            appwriteConfig.databaseID,
            appwriteConfig.postsCollectionID,
            ID.unique(),
            {
                creator: post.userID,
                caption: post.caption,
                imageURL: fileURL,
                imageID: uploadedImage.$id,
                tags: tags,
            }
        );

        if (!newPost) {
            await deleteImage(uploadedImage.$id)
            throw Error
        }

        return newPost
    }
    catch (error) {
        console.log(error)
    }
}