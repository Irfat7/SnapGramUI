import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createUserAccount } from "@/lib/appwrite/api"
import { nameValidate, passwordValidate } from "@/lib/validation"
import { INewUser } from "@/types"
import { useForm, SubmitHandler } from "react-hook-form"
import { Link } from "react-router-dom"

const SignUp = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<INewUser>()

    const onSubmit: SubmitHandler<INewUser> = (data) => {
        createUserAccount(data)
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

                <Button className="base-semibold bg-primary-500 w-full hover:bg-white hover:text-black" type="submit">Submit</Button>
            </form>
            <p>Already have an account? <Link to='/sign-in' className="underline text-primary-500">Login</Link></p>
        </div>
    );
};

export default SignUp;