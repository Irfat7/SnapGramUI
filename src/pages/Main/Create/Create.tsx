import PostForm from '../Shared/PostForm';
import Title from '../Shared/Title';
import addPost from '/icons/add-post.svg'

const Create = () => {
    return (
        <div className='space-y-10'>
                <Title svgSrc={addPost} title='Create Post' alt='Add post icon'/>
                <PostForm post={null}/>
        </div>
    );
};

export default Create;