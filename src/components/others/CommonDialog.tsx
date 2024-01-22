import { AuthContext } from "@/Context/AuthProvider";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useContext } from "react";

const CommonDialog = ({ dialogOpen, setDialogOpen, file = undefined, uploadProfilePic, setFile }) => {
    const { checkAuthUser } = useContext(AuthContext)
    if (!file) {
        return
    }

    const handleUploadPic = async () => {
        setDialogOpen(undefined)
        const uploadedPic = await uploadProfilePic(file)
        if (uploadedPic?.$id) {
            checkAuthUser()
        }
    }

    const handleCancel = () => {
        setDialogOpen(undefined)
        setFile(null)
    }

    return (
        <Dialog open={dialogOpen}>
            <DialogContent className="sm:max-w-md bg-dark-3">
                <DialogHeader>
                    <DialogTitle>Profile Picture</DialogTitle>
                    <DialogDescription>
                        Always public
                    </DialogDescription>
                </DialogHeader>
                <div className="flex justify-center">
                    <img className="max-h-56" src={URL.createObjectURL(file[0])} alt="" />
                </div>
                <div className="justify-end flex gap-2">
                    <Button onClick={handleCancel} type="button" variant="secondary">
                        Cancel
                    </Button>
                    <Button type="button" onClick={handleUploadPic} className="bg-primary-500">
                        Upload
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default CommonDialog;