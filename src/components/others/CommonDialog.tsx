import { AuthContext } from "@/Context/AuthProvider";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { UseMutateAsyncFunction } from "@tanstack/react-query";
import { Models } from "appwrite";
import React, { useContext } from "react";

interface ICommonDialog {
    dialogOpen: boolean | undefined;
    setDialogOpen: React.Dispatch<React.SetStateAction<boolean | undefined>>;
    file: FileList | undefined;
    setFile: React.Dispatch<React.SetStateAction<FileList | undefined>>
    uploadProfilePic: UseMutateAsyncFunction<Models.Document | undefined, Error, FileList, unknown>;
}

const CommonDialog: React.FC<ICommonDialog> = ({ dialogOpen, setDialogOpen, file = undefined, uploadProfilePic, setFile }) => {
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
        setFile(undefined)
    }

    return (
        <Dialog open={dialogOpen}>
            <DialogContent className="sm:max-w-md bg-dark-3">
                <DialogHeader>
                    <DialogTitle>Profile Picture</DialogTitle>
                    <DialogDescription>
                        Your photo will look like this
                    </DialogDescription>
                </DialogHeader>
                <div className="flex justify-center">
                    <img className="max-h-56 aspect-square object-cover rounded-full" src={URL.createObjectURL(file[0])} alt="" />
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