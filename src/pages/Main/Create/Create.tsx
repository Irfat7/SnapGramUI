import PostForm from '../Shared/PostForm';
import addPost from '/icons/add-post.svg'

const Create = () => {
    return (
        <div className='space-y-10 md:w-1/2'>
                <div className=' flex-start gap-3 justify-start'>
                    <img
                        src={addPost}
                        alt="Add post icon"
                        width={36}
                        height={36}
                    />
                    <h2 className='h3-bold md:h2-bold text-left w-full'>Create Post</h2>
                </div>

                <PostForm/>
        </div>
    );
};

export default Create;