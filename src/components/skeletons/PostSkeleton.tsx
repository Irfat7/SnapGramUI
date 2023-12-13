

const PostSkeleton = () => {
    return (
        <div className="space-y-1 my-4 bg-dark-3 px-2 py-3 rounded-lg animate-pulse">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-gray-400"></div>
                    <div className="h-12">
                        <p className="base-medium lg:body-bold text-light-1 bg-gray-400 rounded"></p>
                        <p className="subtle-semibold lg:small-regular small-regular gap-2 text-light-3 bg-gray-400 rounded"></p>
                    </div>
                </div>
                <div className="bg-gray-400 rounded w-16 h-6"></div>
            </div>
            <p className="bg-gray-400 rounded h-6"></p>
            <p className="bg-gray-400 rounded h-6"></p>
            <div className="rounded-xl w-full bg-gray-400" style={{ height: '300px' }}></div>
            <div className="flex justify-between">
                <div className="flex gap-2">
                    <div className="bg-gray-400 rounded w-6 h-6"></div>
                    <p className="bg-gray-400 rounded h-6"></p>
                </div>
                <div className="bg-gray-400 rounded w-6 h-6"></div>
            </div>
        </div>
    );
};

export default PostSkeleton;