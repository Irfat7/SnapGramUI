import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import editSVG from '/icons/edit.svg'
import { Models } from "appwrite";
import PostForm from "../../Shared/PostForm";
import DeleteAlert from "@/pages/Main/Home/EditPost/DeletePost";

const EditPost = ({ post, userID }: { post: Models.Document, userID: string }) => {

return (
    <div>
        <Dialog>
            <DialogTrigger asChild>
                <img
                    src={editSVG}
                    onClick={() => { }}
                    hidden={post?.creator?.$id !== userID}
                    className='cursor-pointer'
                    width={25}
                    alt="edit svg" />
            </DialogTrigger>
            <DialogContent className="bg-dark-4 imhere sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="flex justify-between mt-2">
                        <div className='flex-start gap-3 justify-start'>
                            <img
                                src={editSVG}
                                alt='edit svg'
                                width={30}
                            />
                            <h2 className='h3-bold text-left w-full'>Edit Post</h2>
                        </div>
                        <div>
                            <DeleteAlert postID={post.$id}/>
                        </div>
                    </DialogTitle>
                </DialogHeader>

                <PostForm post={post} />

                <DialogFooter>

                </DialogFooter>
                
            </DialogContent>
        </Dialog>
    </div>
);
};

export default EditPost;