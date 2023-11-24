import { createBrowserRouter } from "react-router-dom";
import Form from "../Layout/Form";
import SignIn from "../pages/Form/SignIn/SignIn";
import SignUp from "../pages/Form/SignUp/SignUp";
import ProtectedRoutes from "./ProtectedRoutes";
import Main from "@/Layout/Main";
import Home from "@/pages/Main/Home/Home";
import User from "@/pages/Main/User/User";

const router = createBrowserRouter([
    {
        path: '/form',
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
        ]
    },
    {
        path: '/',
        element: <ProtectedRoutes><Main></Main></ProtectedRoutes>,
        children: [
            {
                path: '',
                element: <Home />
            },
            {
                path: 'explore',
                element: <Home />
            },
            {
                path: 'all-users',
                element: <Home />
            },
            {
                path: 'saved',
                element: <Home />
            },
            {
                path: 'create-post',
                element: <Home />
            },
            {
                path: '/user/:id',
                element: <User/>
            }
        ]
    },
    {
        path: '*',
        //change
        element: <p>not found</p>
    }
])

export default router