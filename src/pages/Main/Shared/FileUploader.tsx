import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone'
import fileUpload from '/icons/file-upload.svg'
import { File } from 'lucide-react';

const FileUploader = () => {
    const [file, setFile] = useState([])
    const [fileURL, setFileURL] = useState('')
    const onDrop = useCallback(acceptedFiles => {
        const filesShow = acceptedFiles.map(file => (
            <img
                src={URL.createObjectURL(file)}
                className='h-20'
            />
        ));
        setFile(acceptedFiles)
        setFileURL(filesShow)

    }, [])
    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.png', '.jpeg', '.jpg', '.svg']
        }
    })

    return (
        <div>
            <div className='bg-dark-3 cursor-pointer rounded-md p-4 text-center' {...getRootProps()}>
                <input {...getInputProps()} />
                {
                    fileURL ? (
                        <div className='flex'>
                            {fileURL}
                        </div>
                    ) : (
                        <div className=''>
                            <img className='block mx-auto' src={fileUpload} alt="file upload icon" />
                            <h3 className='base-medium text-light-2 mb-2 mt-6'>Drag photo here</h3>
                            <p className='text-light-4 small-regular'>SVG, PNG, JPG</p>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default FileUploader;