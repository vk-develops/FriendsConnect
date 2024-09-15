import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "./Header";

const Layout = () => {
    return (
        <>
            <Header />
            <ToastContainer />
            <Outlet />
        </>
    );
};

export default Layout;
