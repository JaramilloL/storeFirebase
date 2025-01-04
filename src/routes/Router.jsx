import { createBrowserRouter, Navigate } from "react-router-dom";
import Index from "../layout/Index";
import HomePage from "../pages/users/HomePage";
import RegisterPage from "../pages/auth/RegisterPage";
import LoginPage from "../pages/auth/LoginPage";

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
                path: '/register',
                element: <RegisterPage/>
            },
            {
                path: '/login',
                element: <LoginPage />
            },
            {
                path: '*',
                element: <Navigate to={'/'}/>
            }
        ]
    }
])