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

export const uploadProfilePicture = async (profilePic: FileList, userID: string) => {
    try {
        //prev image check
        const user = await database.getDocument(
            appwriteConfig.databaseID,
            appwriteConfig.usersCollectionID,
            userID
        )
        if (!user) throw Error

        if (user.imgaeID) {
            //delete if prev image exists
            const deletedImage = await deleteImage(user.imgaeID)
            if (!deletedImage) throw Error
        }

        //upload new image
        const uploadedImage = await uploadImage(profilePic[0])

        if (!uploadedImage) throw Error

        const fileURL = getFilePreview(uploadedImage.$id)

        if (!fileURL) {
            await deleteImage(uploadedImage.$id)
            throw Error
        }

        const updatedUser = database.updateDocument(
            appwriteConfig.databaseID,
            appwriteConfig.usersCollectionID,
            userID,
            {
                imgaeID: uploadedImage.$id,
                imageURL: fileURL
            }
        )

        if (!updatedUser) {
            await deleteImage(uploadedImage.$id)
            throw Error
        }

        return updatedUser

    } catch (error) {
        console.log(error)
    }
}

export const createPost = async (post: { userID: string, caption: string, tags: string, file: File[] | string }) => {
    try {
        //image upload
        if (typeof post.file === 'string') {
            return 1
        }
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

        return deletedPost

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

        if (typeof post.file !== 'string' && Array.isArray(post.file)) {
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

        let followingID: string[] = following?.documents.map((user: Models.Document) => user.following.$id) || []

        followingID = [...followingID, userID]

        const allUsers = await database.listDocuments(
            appwriteConfig.databaseID,
            appwriteConfig.usersCollectionID);

        if (!allUsers) throw Error

        const notFollowedUser = allUsers.documents.filter(user => {
            if (!followingID.includes(user.$id)) {
                return user
            }
        })

        return notFollowedUser

    } catch (error) {
        console.log(error)
    }
}

export const followUser = async (followerID: string, followingID: string) => {
    try {
        const followingList = await getFollowingList(followerID)
        const alreadyFollows = followingList?.documents.find(followRecord => followRecord.follower.$id === followerID && followRecord.following.$id === followingID)

        if (alreadyFollows) {
            return alreadyFollows
        }

        const newFollow = database.createDocument(
            appwriteConfig.databaseID,
            appwriteConfig.followCollectionID,
            ID.unique(),
            {
                follower: followerID,
                following: followingID
            });

        if (!newFollow) throw Error

        return newFollow

    } catch (error) {
        console.log(error)
    }
}

export const unFollowUser = async (followerID: string, followingID: string) => {
    try {
        const record = await database.listDocuments(
            appwriteConfig.databaseID,
            appwriteConfig.followCollectionID,
            [
                Query.equal('follower', followerID),
                Query.equal('following', followingID)
            ]
        )

        if (!record) throw Error

        if (record.total === 0) return

        const followID = record.documents[0].$id

        const unfollow = await database.deleteDocument(
            appwriteConfig.databaseID,
            appwriteConfig.followCollectionID,
            followID);

        if (!unfollow) throw Error

        return unfollow

    } catch (error) {
        console.log(error)
    }
}

export const getFollowingPost = async (id: string) => {
    try {
        const following = await getFollowingList(id)

        if (following?.documents.length === 0) {
            return following
        }

        const followingID: string[] = following?.documents.map((user: Models.Document) => user.following.$id) || [id]


        const followingPosts = await database.listDocuments(
            appwriteConfig.databaseID,
            appwriteConfig.postsCollectionID,
            [
                Query.orderDesc('$createdAt'), Query.equal('creator', [...followingID, id])
            ]);

        if (!followingPosts) throw Error

        return followingPosts

    } catch (error) {
        console.log(error)
    }
}

export const searchUser = async (userName: string) => {
    try {
        if (userName === '') {
            return ''
        }
        const searchResult = await database.listDocuments(
            appwriteConfig.databaseID,
            appwriteConfig.usersCollectionID,
            [
                Query.startsWith("userName", userName),
                Query.limit(20)
            ]
        )

        if (!searchResult) throw Error

        return searchResult

    } catch (error) {
        console.log(error)
    }
}


export const getSpecificUserPost = async (id: string | undefined) => {
    try {
        if (!id) {
            throw Error
        }
        const posts = await database.listDocuments(
            appwriteConfig.databaseID,
            appwriteConfig.postsCollectionID,
            [
                Query.equal('creator', id)
            ]
        );

        if (!posts) throw Error

        return posts

    } catch (error) {
        console.log(error)
    }
}

export const getSpecificUser = async (userID: string) => {
    try {
        const user = await database.listDocuments(
            appwriteConfig.databaseID,
            appwriteConfig.usersCollectionID,
            [
                Query.equal('$id', userID)
            ]
        )
        if (!user) throw Error

        return user
    } catch (error) {
        console.log(error)
    }
}

export const userNameCheck = async (userName: string) => {
    try {
        const userNameExist = await database.listDocuments(
            appwriteConfig.databaseID,
            appwriteConfig.usersCollectionID,
            [
                Query.equal('userName', userName)
            ]
        )

        if (!userNameExist || userNameExist.total > 0) {
            return false // account cant be created
        }

        return true

    } catch (error) {
        console.log(error)
    }
}