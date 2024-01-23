import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@radix-ui/react-label';
import FileUploader from './FileUploader';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IPost } from '@/types';
import { useState, useContext } from 'react'
import { useCreateNewPost, useUpdatePost } from '@/lib/react-query/queriesAndMutation';
import { AuthContext } from '@/Context/AuthProvider';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { Models } from 'appwrite';

interface PostFormProps {
    post: Models.Document | null;
    setEditOpen?: React.Dispatch<React.SetStateAction<boolean | undefined>>;
}

const PostForm: React.FC<PostFormProps> = ({ post = null, setEditOpen}) => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IPost>()
    const [file, setFile] = useState<string | File[]>(post ? post.imageURL : [])
    const { mutateAsync: createPost, isPending: isCreatingNewPost } = useCreateNewPost()
    const { user } = useContext(AuthContext)
    const { mutateAsync: updatePost, isPending: isUpdatingPost, isSuccess: isUpdatingSuccess } = useUpdatePost(user.id)
    const { toast } = useToast()
    const navigate = useNavigate()

    if (isUpdatingSuccess && setEditOpen) {
        setEditOpen(false)
    }

    const onSubmit: SubmitHandler<IPost> = async (data) => {
        if (isCreatingNewPost || isUpdatingPost) {
            return
        }

        if (post) {
            //update post file will be a string or file[]\
            await updatePost({ ...data, file, postID: post.$id, imageID: post.imageID })
        }
        else {
            //new post
            const newPost = await createPost({ ...data, userID: user.id, file })
            if (!newPost) {
                return toast({
                    title: "Failed to post! try again later",
                    className: 'bg-rose-600'
                })
            }
            navigate('/')
        }
    }

    return (
        <div className='w-full h-[80vh] overflow-y-scroll custom-scrollbar'>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4 md:space-y-6'>
                <div className="space-y-2">
                    <Label className='body-medium' htmlFor="caption">Caption</Label>
                    <Textarea defaultValue={post?.caption} {...register("caption", { required: true, maxLength: 2200 })} className='bg-dark-4' name='caption' placeholder="Enter a caption for your post" id="caption-2" />
                    {errors.caption?.type === 'required' && <p className="text-sm text-muted-foreground">This field required</p>}
                    {errors.caption?.type === 'maxLength' && <p className="text-sm text-muted-foreground">Caption too long</p>}
                </div>

                <FileUploader prevFileURL={post?.imageURL} setFile={setFile} />

                <div>
                    <Label className="base-medium block mb-2" htmlFor="email">Add Tags <span className='small-medium'>(Separated by comma)</span></Label>
                    <Input defaultValue={post ? post?.tags?.join(', ') : ''} {...register("tags", { required: true, maxLength: 2200 })} placeholder='Nature, Coding, Photography' className="bg-dark-4 border-none" type="text" name="tags" id="email" />
                    {errors.tags?.type === 'required' && <p className="text-sm text-muted-foreground">This field required</p>}
                    {errors.tags?.type === 'maxLength' && <p className="text-sm text-muted-foreground">Caption too long</p>}
                </div>

                <Button
                    disabled={file.length === 0}
                    className='w-full bg-primary-500 small-semibold hover:bg-white hover:text-black' type="submit"
                >
                    {/* <Loader2 className="mr-2 h-4 w-4 animate-spin" /> */}
                    {post ? 'Update' : 'Upload'}
                </Button>
            </form>
        </div>
    );
};

export default PostForm;