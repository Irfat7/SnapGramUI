import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import deleteSVG from '/icons/delete.svg'
import { useDeletePost } from "@/lib/react-query/queriesAndMutation";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

interface PostFormProps {
    postID: string;
    setEditOpen: React.Dispatch<React.SetStateAction<boolean | undefined>>;
}


const DeletePost: React.FC<PostFormProps> = ({ postID, setEditOpen }) => {
    const { mutateAsync: deletePost, isPending: isDeletingPost, isSuccess: isDeletingPostComplete } = useDeletePost()
    const navigate = useNavigate()

    if (isDeletingPostComplete) {
        setEditOpen(false)
    }

    const deleteHandler = async (id: string) => {
        if (isDeletingPost) {
            return
        }

        if (await deletePost(id)) {
            toast({
                description: "post deleted",
                className: 'bg-dark-2'
            })
        }
        else {
            toast({
                description: "post failed to delete",
                className: 'bg-rose-600'
            })
        }
        navigate('/')
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger><img
                src={deleteSVG}
                className="cursor-pointer"
                alt='delete svg'
                width={20}
            /></AlertDialogTrigger>
            <AlertDialogContent className="bg-dark-3">
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the post from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="text-black">Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={() => deleteHandler(postID)}>
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    );
};

export default DeletePost;