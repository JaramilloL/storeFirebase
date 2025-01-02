import { createBrowserRouter, Navigate } from "react-router-dom";
import Index from "../layout/Index";
import HomePage from "../pages/users/HomePage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Index/>,
        children: [
            {
                path: '/home',
                element: <HomePage/>

            },
            {
                path: '*',
                element: <Navigate to={'/'}/>
            }
        ]
    }
])