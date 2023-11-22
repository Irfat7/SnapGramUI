import { Account, Avatars, Client, Databases } from 'appwrite';

export const appwriteConfig = {
    url: import.meta.env.VITE_APPWRITE_URL,
    projectID: import.meta.env.VITE_APPWRITE_USER_ID,
    databaseID: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    storageID: import.meta.env.VITE_APPWRITE_STORAGE_ID,
    usersCollectionID: import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID,
    postsCollectionID: import.meta.env.VITE_APPWRITE_POSTS_COLLECTION_ID,
    savesCollectionID: import.meta.env.VITE_APPWRITE_SAVES_COLLECTION_ID,
}

export const client = new Client();

client
    .setEndpoint(appwriteConfig.url)
    .setProject(appwriteConfig.projectID);


export const account = new Account(client);
export const database = new Databases(client);
export const avatar = new Avatars(client);


