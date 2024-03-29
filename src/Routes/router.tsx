import { createBrowserRouter } from "react-router-dom";
import Form from "../Layout/Form";
import SignIn from "../pages/Form/SignIn/SignIn";
import SignUp from "../pages/Form/SignUp/SignUp";
import ProtectedRoutes from "./ProtectedRoutes";
import Main from "@/Layout/Main";
import Home from "@/pages/Main/Home/Home";
import Explore from "@/pages/Main/Explore/Explore";
import AllUsers from "@/pages/Main/AllUsers/AllUsers";
import Saved from "@/pages/Main/Saved/Saved";
import Create from "@/pages/Main/Create/Create";
import NothingFound from "@/pages/Main/Shared/NothingFound";
import Profile from "@/pages/Main/Profile/Profile";

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
                element: <Explore />
            },
            {
                path: 'all-users',
                element: <AllUsers />
            },
            {
                path: 'saved',
                element: <Saved />
            },
            {
                path: 'create-post',
                element: <Create />
            },
            {
                path: '/profile/:id',
                element: <Profile />
            }
        ]
    },
    {
        path: '*',
        element: <NothingFound />
    }
])

export default router