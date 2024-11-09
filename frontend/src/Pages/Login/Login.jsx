import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../Services/apiService/userServices";
import { setUserCredentials } from "../../app/features/auth";

const Login = () => {
    const navigate = useNavigate()
    const user  = useSelector((data)=>data?.auth?.userData)
    const disptach  = useDispatch()
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    useEffect(()=>{
        if(user) navigate('/dashboard')
    },[user])

    const login =async ()=>{
        const res = await loginUser(formData);
        if(res?.data?.success){
            disptach(setUserCredentials(res?.data?.user));
            navigate("/dashboard")
        }

    }
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-200">
            <div className="w-full max-w-md bg-white p-8 border border-gray-200 shadow-sm rounded-lg">
                <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Login </h2>
                <div>
                    <div className="mb-5">
                        <label className="block text-gray-700 font-medium mb-2">Email Or Phonenumber</label>
                        <input
                            type="text"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 placeholder-gray-500"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 placeholder-gray-500"
                            placeholder="Enter your password"
                        />
                    </div>

                    <button
                        type="submit"
                        onClick={login}
                        className="w-full bg-black text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-700 transition duration-150"
                    >
                        Log In
                    </button>
                </div>

                <p className="mt-4 text-center text-sm text-gray-600">
                    Don’t have an account?{" "}
                    <button onClick={()=>navigate("/signup")} className="text-green-600 font-bold hover:underline">
                        Sign up
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Login;
