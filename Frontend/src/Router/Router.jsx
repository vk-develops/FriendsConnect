import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../Pages/Home/HomePage";
import Layout from "../Components/Layout";
import RegisterPage from "../Pages/Auth/RegisterPage";
import LoginPage from "../Pages/Auth/LoginPage";
import VerifyPage from "../Pages/Auth/VerifyPage";
import { useDispatch } from "react-redux";
import { setCredentials } from "../App/Features/usersAuthSlice";

const Router = () => {
    const dispatch = useDispatch();

    const checkIsLoggedIn = async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_APP_BACKEND_URI}/${
                    import.meta.env.VITE_BACKEND_USERS_AUTH_URI
                }/isloggedin`,
                {
                    method: "GET",
                    credentials: "include",
                }
            );

            if (response.ok) {
                const data = await response.json();
                const userInfo = data.userInfo;

                dispatch(setCredentials(userInfo));
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        checkIsLoggedIn();
    }, []);

    return (
        <Routes>
            <Route
                path="/"
                element={<Layout />}
            >
                {/* HomePage Route */}
                <Route
                    index
                    element={<HomePage />}
                />

                {/* Account Routes */}
                <Route path="account">
                    <Route
                        path="register"
                        element={<RegisterPage />}
                    />
                    <Route
                        path="login"
                        element={<LoginPage />}
                    />
                    <Route
                        path="verify"
                        element={<VerifyPage />}
                    />
                </Route>
            </Route>
        </Routes>
    );
};

export default Router;
