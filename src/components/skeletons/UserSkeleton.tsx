

const UserSkeleton = () => {
    return (
        <div className="w-full md:w-60 bg-dark-4 rounded-lg">
            <div className="flex flex-col items-center py-5">
                <div className="w-24 h-24 mb-3 bg-gray-500 rounded-full animate-pulse"></div>
                <h5 className="mb-1 text-xl font-medium text-white bg-gray-400 w-20"></h5>
                <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-400 w-16"></span>
                <div className="flex mt-4 md:mt-6">
                    <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-gray-700 rounded-lg">
                        <div className="mr-2 h-4 w-4 bg-gray-500 rounded-full animate-pulse"></div>
                        Loading
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserSkeleton;