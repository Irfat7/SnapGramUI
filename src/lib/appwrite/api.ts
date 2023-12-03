import { INewUser } from "@/types";
import { account, appwriteConfig, avatar, database, storage } from "./config";
import { ID, Models, Query } from "appwrite";

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

        console.log(fileURL)

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

export const deletePost = async (postID: string) => {
    try {
        const post = await database.getDocument(
            appwriteConfig.databaseID,
            appwriteConfig.postsCollectionID,
            postID);

        if (!post) throw Error

        const imageID = post.imageID

        const deletedPost = await database.deleteDocument(
            appwriteConfig.databaseID,
            appwriteConfig.postsCollectionID,
            postID);

        if (!deletedPost) throw Error

        await deleteImage(imageID)

        return deletePost

    } catch (error) {
        console.log(error)
    }
}

export const getRecentPosts = async () => {
    try {
        const allPost = await database.listDocuments(
            appwriteConfig.databaseID,
            appwriteConfig.postsCollectionID,
            [Query.orderDesc('$createdAt'), Query.limit(20)])

        if (!allPost) throw Error
        return allPost
    }
    catch (error) {
        console.log(error)
    }
}

export const getSpecificPost = async (id: string) => {
    try {
        const specificPost = await database.getDocument(
            appwriteConfig.databaseID,
            appwriteConfig.postsCollectionID,
            id);

        if (!specificPost) throw Error

        return specificPost
    } catch (error) {
        console.log(error)
    }
}

export const likePost = async (postID: string, likesArray: string[]) => {
    try {
        const updatedDoc = await database.updateDocument(
            appwriteConfig.databaseID,
            appwriteConfig.postsCollectionID,
            postID,
            {
                likes: likesArray
            }
        );
        if (!updatedDoc) throw Error

        return updatedDoc.likes

    } catch (error) {
        console.log(error)
    }
}

export const savePost = async (userID: string, postID: string) => {
    try {
        console.log(123)
        const newSave = await database.createDocument(
            appwriteConfig.databaseID,
            appwriteConfig.savesCollectionID,
            ID.unique(),
            {
                user: userID,
                post: postID
            }
        );
        if (!newSave) throw Error

        return newSave

    } catch (error) {
        console.log(error)
    }
}

export const getSavePost = async (userID: string) => {
    try {
        const savedPost = await database.listDocuments(
            appwriteConfig.databaseID,
            appwriteConfig.savesCollectionID,
            [
                Query.equal('user', userID)
            ])

        if (!savedPost) throw Error

        return savedPost

    } catch (error) {
        console.log(error)
    }
}

export const deleteSavePost = async (saveID: string) => {
    try {
        const statusCode = database.deleteDocument(
            appwriteConfig.databaseID,
            appwriteConfig.savesCollectionID,
            saveID
        );
        if (!statusCode) throw Error

        return { status: 'ok' }

    } catch (error) {
        console.log(error)
    }
}

export const updatePost = async (post: {
    postID: string,
    imageID: string,
    caption: string,
    tags: string,
    file: File[] | string | URL
}) => {
    try {
        const tags = post.tags.split(',').map((item: string) => item.trim());

        const toUpdatePost = {
            caption: post.caption,
            tags,
            imageURL: post.file,
            imageID: post.imageID
        }

        if (typeof post.file !== 'string') {
            // create a new file and delete prev one from bucket
            const uploadedImage = await uploadImage(post.file[0])

            if (!uploadedImage) throw Error

            const fileURL = getFilePreview(uploadedImage.$id)

            if (!fileURL) {
                await deleteImage(uploadedImage.$id)
                throw Error
            }
            toUpdatePost.imageURL = fileURL
            toUpdatePost.imageID = uploadedImage.$id

        }

        const updatedPost = database.updateDocument(
            appwriteConfig.databaseID,
            appwriteConfig.postsCollectionID,
            post.postID,
            toUpdatePost
        );

        if (!updatedPost) {
            toUpdatePost.imageID !== post.imageID && await deleteImage(toUpdatePost.imageID)
            throw Error
        }

        toUpdatePost.imageID !== post.imageID && await deleteImage(post.imageID)

        return updatedPost

    } catch (error) {
        console.log(error)
    }
}

export const getFollowingList = async (userID: string) => {
    try {
        const following = await database.listDocuments(
            appwriteConfig.databaseID,
            appwriteConfig.followCollectionID,
            [
                Query.equal('follower', userID)
            ]
        )

        if (!following) throw Error

        return following

    } catch (error) {
        console.log(error)
    }

}

export const getNotFollowingUser = async (userID: string) => {
    try {
        const following = await getFollowingList(userID)

        const followingID: string[] = following?.documents.map((user: Models.Document) => user.following.$id) || ['123']

        console.log('following id', followingID)

        const allUsers = await database.listDocuments(
            appwriteConfig.databaseID,
            appwriteConfig.usersCollectionID);

        if (!allUsers) throw Error

        const notFollowedUser = allUsers.documents.filter(user => {
            if(!followingID.includes(user.$id)){
                return user
            }
        })

        console.log(notFollowedUser)

        return notFollowedUser

    } catch (error) {
        console.log(error)
    }
}