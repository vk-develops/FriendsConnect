import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { IconShoppingCart, IconChevronDown } from "@tabler/icons-react";
import { styles } from "../Styles/styles";
import useLogout from "../Hooks/useLogout";

const Header = () => {
    const { user } = useSelector((state) => state.auth);

    const { logoutHandler } = useLogout();

    const handleLogout = async () => {
        await logoutHandler();
    };

    return (
        <header className="w-full sticky top-0 z-30  border-b-[1.5px] border-screenColor2 bg-screenColor1">
            <nav
                className={`${styles.layout} flex items-center justify-between`}
            >
                {/* Logo */}
                <NavLink to={`/`}>
                    <img
                        className="w-28"
                        alt="Friends App Logo"
                    />
                </NavLink>

                <div>
                    <h1 className="font-eduoxusSans text-3xl text-primaryColor font-medium">
                        FriendsSphere
                    </h1>
                </div>

                {/* Cta buttons */}
                <div className="flex items-center justify-center gap-5">
                    {user ? (
                        <>
                            <button
                                className={`px-4 py-3 bg-primaryColor inline-block text-screenColor1 font-eduoxusSans font-medium text-sm max-mobile:text-xs`}
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <NavLink
                                to={`account/login`}
                                className={({ isActive }) =>
                                    isActive
                                        ? `${styles.navLink} text-primaryColor`
                                        : `${styles.navLink} hover:text-primaryColor`
                                }
                            >
                                Login
                            </NavLink>
                            <NavLink
                                to={`account/register`}
                                className={`${styles.navButton}`}
                            >
                                Register
                            </NavLink>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;
