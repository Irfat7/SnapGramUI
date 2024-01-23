import { AuthContext } from '@/Context/AuthProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { useSignInAccount } from '@/lib/react-query/queriesAndMutation';
import { INewUser } from '@/types';
import { Loader2 } from 'lucide-react';
import { useContext } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

const SignIn = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<INewUser>()
    const { mutateAsync: signInUser } = useSignInAccount()
    const { isLoading, setAuthenticated } = useContext(AuthContext)
    const navigate = useNavigate()

    const onSubmit: SubmitHandler<INewUser> = async (data) => {
        const currentUser = await signInUser(data)
        if(currentUser){
            setAuthenticated(true)
            navigate('/')
        }
        else{
            return toast({
                title: "Invalid email or password",
                className: 'bg-rose-600'
            })
        }
    }

    return (
        <div>
            <h1 className="h3-bold">Login to your account</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="text-left space-y-4 mb-4">
                <div>
                    <Label className="base-medium" htmlFor="email">Email</Label>
                    <Input className="bg-dark-4 border-none" {...register("email", { required: true })} type="email" defaultValue='' name="email" id="email" />
                    {errors.email && <span className="small-medium text-red">This field is required</span>}
                </div>

                <div>
                    <Label className="base-medium" htmlFor="password">Password</Label>
                    <Input className="bg-dark-4 border-none"
                        {...register("password", { required: true, })}
                        type="password" defaultValue='' name="password" id="password" />
                    {errors.password && <span className="small-medium text-red">This field is required</span>}
                </div>

                <Button disabled={isLoading} className="base-semibold bg-primary-500 w-full hover:bg-white hover:text-black" type="submit">
                    {(isLoading) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Sign in
                </Button>
            </form>
            <p>New to snapgram? <Link to='/form/sign-up' className="underline text-primary-500">Sign up</Link></p>
        </div>
    );
};

export default SignIn;