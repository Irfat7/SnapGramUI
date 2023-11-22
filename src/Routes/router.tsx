import { createBrowserRouter } from "react-router-dom";
import Form from "../Layout/Form";
import SignIn from "../pages/Form/SignIn/SignIn";
import SignUp from "../pages/Form/SignUp/SignUp";
import Welcome from "@/pages/Main/Welcome";
import ProtectedRoutes from "./ProtectedRoutes";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Form />,
        children: [
            {
                path: '',
                element: <SignIn />
            },
            {
                path: 'sign-up',
                element: <SignUp />
            },
            {
                path: 'sign-in',
                element: <SignIn />
            }
        ]
    },
    {
        path: '/home',
        element: <ProtectedRoutes><Welcome></Welcome></ProtectedRoutes>
    },
    {
        path: '*',
        //change
        element: <p>not found</p>
    }
])

export default router