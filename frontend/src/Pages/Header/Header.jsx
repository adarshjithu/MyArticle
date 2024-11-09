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
        <header className="flex items-center justify-between p-4 bg-white shadow-md">
            {/* Logo */}
            <div  onClick={()=>navigate("/dashboard")} className="text-2xl font-bold text-gray-700">

                MyArticleSite
            </div>

            {/* Navigation & Actions */}
            <div className="flex items-center gap-6">
                {/* Settings Icon */}

                {/* Action Links */}
                <div className="flex gap-4">
                    <button
                        onClick={() => navigate("/dashboard")}
                        className="text-gray-600 hover:text-gray-800 transition-colors"
                    >
                        Dashboard
                    </button>
                    <button
                        onClick={() => navigate("/my-articles")}
                        className="text-gray-600 hover:text-gray-800 transition-colors"
                    >
                        My Articles
                    </button>
                    <button
                        onClick={logout}
                        className="text-gray-600 hover:text-gray-800 transition-colors"
                    >
                        Logout
                    </button>
                <button
                    className="p-2 text-gray-500 hover:text-gray-800 transition-colors focus:outline-none"
                    aria-label="Settings"
                    onClick={()=>navigate("/settings")}
                >
                    <img src="data:image/png;base64,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" className="h-[40px] w-[40px] rounded-full" alt="" />
                </button>
                </div>
            </div>
        </header>
    );
}

export default Header;
