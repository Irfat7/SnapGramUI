import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone'
import fileUpload from '/icons/file-upload.svg'

const FileUploader = ({setFile }) => {
    const [fileURL, setFileURL] = useState('')

    const onDrop = useCallback(acceptedFiles => {
        setFile(acceptedFiles)
        setFileURL(URL.createObjectURL(acceptedFiles[0]))
    }, [])

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.png', '.jpeg', '.jpg', '.svg']
        },
    })

    return (
        <div>
            <p className='body-medium mb-2'>Add photos</p>
            <div className='bg-dark-3 cursor-pointer rounded-md p-4 text-center' {...getRootProps()}>
                <input required {...getInputProps()} />
                {
                    fileURL ? (
                        <div className='flex flex-1'>
                            <img className='rounded-md' src={fileURL} alt="" />
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