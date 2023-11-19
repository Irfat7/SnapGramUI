import router from './Routes/router';
import './global.css'
import { RouterProvider } from "react-router-dom";

const App = () => {
    return (
        <main className='max-w-screen-2xl mx-auto'>
            <RouterProvider router={router} />
        </main>
    );
};

export default App;