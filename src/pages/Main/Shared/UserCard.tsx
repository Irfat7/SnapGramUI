import { AuthContext } from "@/Context/AuthProvider";
import { useFollowUser, useGetFollowingList } from "@/lib/react-query/queriesAndMutation";
import { Models } from "appwrite";
import { Loader2 } from "lucide-react";
import { useContext } from "react";

const UserCard = ({ user }: { user: Models.Document }) => {
    const { user: follower } = useContext(AuthContext)
    const { mutateAsync: followUser, isSuccess: followingSuccess, isPending: isFollowingLoading, isError: failedFollowingUser } = useFollowUser(follower.id)
    const { data: followingList, isLoading: isFollowingListLoading } = useGetFollowingList(follower.id)
    const follows = followingList?.documents.find(eachFollowing => eachFollowing.following.$id == user.$id);
    console.log(followingList?.documents)

    const handleFollow = () => {
        followUser({ followerID: follower.id, followingID: user.$id })
    }

    return (
        <div className="w-full md:w-60 bg-dark-4 rounded-lg">
            <div className="flex flex-col items-center py-5">
                <img className="w-24 h-24 mb-3 rounded-full" src={user.imageURL} alt="user image" />
                <h5 className="mb-1 text-xl font-medium text-white">{user.name}</h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">{user.userName}</span>
                <div className="flex mt-4 md:mt-6">
                    <button
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800"
                        onClick={handleFollow}
                    >
                        {
                            isFollowingLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> :
                                follows ? 'following' : 'follow'
                        }
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserCard;