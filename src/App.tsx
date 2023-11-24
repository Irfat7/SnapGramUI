import router from './Routes/router';
import './global.css'
import { Router, RouterProvider } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster"
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import AuthProvider from './Context/AuthProvider';

const queryClient = new QueryClient()

const App = () => {
    return (
        <main className='max-w-screen-2xl mx-auto'>
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <RouterProvider router={router} />
                    <Toaster />
                </AuthProvider>
            </QueryClientProvider>
        </main>
    );
};

export default App;