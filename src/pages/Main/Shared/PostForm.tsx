import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@radix-ui/react-label';
import FileUploader from './FileUploader';
import { Loader2 } from 'lucide-react';

const PostForm = () => {
    return (
        <div className='w-full'>
            <form className='space-y-4 md:space-y-6'>
                <div className="space-y-2">
                    <Label className='body-medium' htmlFor="caption">Caption</Label>
                    <Textarea className='bg-dark-4' name='caption' placeholder="Enter a caption for your post" id="caption-2" />
                    <p className="text-sm text-muted-foreground">
                        Enter a caption for your post
                    </p>
                </div>

                <FileUploader />

                <div>
                    <Label className="base-medium" htmlFor="email">Add Tags <span className='small-medium'>(Separated by comma)</span></Label>
                    <Input placeholder='Nature, Coding, Photography' className="bg-dark-4 border-none" type="text" defaultValue='' name="email" id="email" />
                </div>

                <Button
                    className='w-full bg-primary-500 small-semibold hover:bg-white hover:text-black' type="submit"
                >
                    {/* <Loader2 className="mr-2 h-4 w-4 animate-spin" /> */}
                    Upload
                </Button>
            </form>
        </div>
    );
};

export default PostForm;