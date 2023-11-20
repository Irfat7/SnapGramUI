import { createBrowserRouter } from "react-router-dom";
import Form from "../Layout/Form";
import SignIn from "../pages/Form/SignIn/SignIn";
import SignUp from "../pages/Form/SignUp/SignUp";

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
        path: '*',
        //change
        element: <p>not found</p>
    }
])

export default router