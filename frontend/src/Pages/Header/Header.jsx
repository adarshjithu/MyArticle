import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../Services/apiService/userServices";
import { userLogout } from "../../app/features/auth";

function Header() {
    const dispatch = useDispatch();
    const user = useSelector((data) => data?.auth?.userData);
    const navigate = useNavigate();

    const logout = async () => {
        const res = await logoutUser();
        dispatch(userLogout());
    };

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [logout]);

    return (
        <header className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-500 to-indigo-600 shadow-lg">
            {/* Logo */}
            <div onClick={() => navigate("/dashboard")} className="text-2xl font-bold text-white cursor-pointer">
                MyArticleSite
            </div>

            {/* Navigation & Actions */}
            <div className="flex items-center gap-6">
                {/* Action Links */}
                <div className="flex gap-4">
                    <button
                        onClick={() => navigate("/dashboard")}
                        className="text-white hover:text-gray-200 transition-colors"
                    >
                        <i className="fas fa-home mr-2"></i>Dashboard
                    </button>
                    <button
                        onClick={() => navigate("/my-articles")}
                        className="text-white hover:text-gray-200 transition-colors"
                    >
                        <i className="fas fa-book mr-2"></i>My Articles
                    </button>
                    <button
                        onClick={logout}
                        className="text-white hover:text-gray-200 transition-colors"
                    >
                        <i className="fas fa-sign-out-alt mr-2"></i>Logout
                    </button>
                </div>

                {/* Settings Icon */}
                <button
                    className="p-2 text-white hover:text-gray-200 transition-colors focus:outline-none"
                    aria-label="Settings"
                    onClick={() => navigate("/settings")}
                >
                    <i className="fas fa-cog text-2xl"></i>
                </button>
            </div>
        </header>
    );
}

export default Header;
