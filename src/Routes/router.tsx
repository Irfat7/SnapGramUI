import { createBrowserRouter } from "react-router-dom";
import Form from "../Layout/Form";
import SignIn from "../pages/Form/SignIn";
import SignUp from "../pages/Form/SignUp";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Form />,
        children: [
            {
                path: '',
                element: <SignIn/>
            },
            {
                path: 'sign-up',
                element: <SignUp/>
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