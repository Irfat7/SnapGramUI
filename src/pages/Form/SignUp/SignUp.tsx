import { AuthContext } from "@/Context/AuthProvider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { useCreateUserAccount, useSignInAccount } from "@/lib/react-query/queriesAndMutation"
import { nameValidate, passwordValidate } from "@/lib/validation"
import { INewUser } from "@/types"
import { Loader2 } from "lucide-react"
import { useContext } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"

const SignUp = () => {
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm<INewUser>()

    const { toast } = useToast()
    const { user, isLoading: isUserLoading, checkAuthUser } = useContext(AuthContext)
    const { mutateAsync: createUserAccount, isPending: isCreatingUser } = useCreateUserAccount()
    const { mutateAsync: signInUser, isPending: isSigningIn } = useSignInAccount()
    const navigate = useNavigate()

    const onSubmit: SubmitHandler<INewUser> = async (data) => {
        const newUser = await createUserAccount(data)

        if (!newUser) {
            toast({
                title: "Something went wrong! try again later",
                className: 'bg-rose-600'
            })
            return
        }

        reset()
        //create a session
        const session = await signInUser({
            email: data.email,
            password: data.password
        })

        if (!session) {
            return toast({
                title: "Sign in failed! no session found! please try again",
                className: 'bg-rose-600'
            })
        }

        const loggedIn = await checkAuthUser()

        if (loggedIn) {
            navigate('/')
        }
        else {
            return toast({
                title: "Sign in failed! checkAuthUser error! please try again",
                className: 'bg-rose-600'
            })
        }

    }

    return (
        <div>
            <h1 className="h3-bold">Create a new account</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="text-left space-y-4 mb-4">
                <div>
                    <Label className="base-medium" htmlFor="name">Name</Label>
                    <Input className="bg-dark-4 border-none" {...register("name", { required: true, minLength: 3, maxLength: 12 })} type="text" defaultValue='' name="name" id="name" />
                    <p className="small-medium text-red" role="alert">{nameValidate(errors)}</p>
                </div>

                <div>
                    <Label className="base-medium" htmlFor="userName">Username</Label>
                    <Input className="bg-dark-4 border-none" {...register("userName", { required: true })} type="text" defaultValue='' name="userName" id="userName" />
                    {errors.userName && <span className="small-medium text-red">This field is required</span>}
                </div>

                <div>
                    <Label className="base-medium" htmlFor="email">Email</Label>
                    <Input className="bg-dark-4 border-none" {...register("email", { required: true })} type="email" defaultValue='' name="email" id="email" />
                    {errors.email && <span className="small-medium text-red">This field is required</span>}
                </div>

                <div>
                    <Label className="base-medium" htmlFor="password">Password</Label>
                    <Input className="bg-dark-4 border-none"
                        {...register("password",
                            {
                                required: true,
                                validate: (value) => {
                                    //regex for at least alphanumeric 6 digits
                                    const regex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;
                                    if (regex.test(value)) {
                                        return true
                                    } else {
                                        return false
                                    }
                                }
                            })}
                        type="password" defaultValue='' name="password" id="password" />
                    <p className="small-medium text-red">{passwordValidate(errors)}</p>
                </div>

                <Button disabled={isUserLoading} className="base-semibold bg-primary-500 w-full hover:bg-white hover:text-black" type="submit">
                    {isUserLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Sign-up
                </Button>
            </form>
            <p>Already have an account? <Link to='/form' className="underline text-primary-500">Login</Link></p>
        </div>
    );
};

export default SignUp;