import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import { useSelector } from "react-redux";
import { changeUserPassword, getProfile, updateInterests, updateUserProfile } from "../../Services/apiService/userServices";
import toast from "react-hot-toast";

const Settings = () => {
    const [activeTab, setActiveTab] = useState("info"); // Toggle between 'info' and 'preferences'
    const [articles, setArticles] = useState(["Technology", "Health", "Business", "Lifestyle", "Programming", "Design", "Education", "Writing"]);
    const [seletedArticles, setSelectedArticles] = useState([]);
    const [formData, setFormData] = useState({ firstname: "", lastname: "", email: "", phonenumber: "", dateofbirth: "" });
    const handleTabClick = (tab) => setActiveTab(tab);
    const [passwordData, setPasswordData] = useState({ oldpassword: "", newpassword: "", confirmpassword: "" });

    const selectArticle = (article) => {
        if (seletedArticles.includes(article)) {
            setSelectedArticles(seletedArticles.filter((data) => data !== article));
        } else {
            setSelectedArticles((data) => [...data, article]);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePasswordChange = (e) => {
        setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    };
    useEffect(() => {
        const fetchData = async () => {
            const res = await getProfile();

            const data = res?.data?.result;
            setSelectedArticles(data?.interests);

            const profileObj = {
                firstname: data.firstname,
                lastname: data.lastname,
                email: data.email,
                phonenumber: data.phonenumber,
                dateofbirth: data.dateofbirth,
            };

            setFormData(profileObj);
        };
        fetchData();
    }, []);

    const savePrferences = async () => {
         console.log('save',seletedArticles)
     const res = await updateInterests(seletedArticles);
    };

    const UpdateProfile = async () => {
        const res = await updateUserProfile(formData);
    };

    const changePassword = async () => {
        const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
        if (passwordData.newpassword !== passwordData.confirmpassword||passwordData.newpassword==''||setPasswordData.confirmpassword=='') {
            toast.error("Password Donot match");
        } else if(!regex.test(passwordData.newpassword)){
           toast.error("Password should contain 1 number 1 special charector and a uppercase letter")
        }
            else {
            const res = await changeUserPassword(passwordData);
        }
    };
    return (
        <div className="font-sans bg-gray-50 text-gray-800 min-h-screen">
            <Header />

            {/* Tabs Navigation */}
            <div className="p-6 flex justify-center gap-6">
                <button
                    onClick={() => handleTabClick("info")}
                    className={`px-4 py-2 ${activeTab === "info" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"}`}
                >
                    Edit User Information
                </button>
                <button
                    onClick={() => handleTabClick("preferences")}
                    className={`px-4 py-2 ${activeTab === "preferences" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"}`}
                >
                    Article Preferences
                </button>
                <button
                    onClick={() => handleTabClick("password")}
                    className={`px-4 py-2 ${activeTab === "password" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"}`}
                >
                    Change Password
                </button>
            </div>

            {/* User Information Section */}
            {activeTab === "info" && (
                <section className="p-6 bg-gray-100">
                    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold mb-4">User Information</h2>
                        <div className="mb-4">
                            <label className="block text-gray-700">First Name</label>
                            <input
                                type="text"
                                value={formData.firstname}
                                name="firstname"
                                onChange={handleChange}
                                placeholder="Your Name"
                                className="w-full p-2 border rounded mt-1"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700">Last Name</label>
                            <input
                                onChange={handleChange}
                                name="lastname"
                                value={formData.lastname}
                                type="text"
                                placeholder="Your Email"
                                className="w-full p-2 border rounded mt-1"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700">Email</label>
                            <input
                                onChange={handleChange}
                                name="email"
                                value={formData?.email}
                                type="email"
                                placeholder="Your Email"
                                className="w-full p-2 border rounded mt-1"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700">Phone Number</label>
                            <input
                                onChange={handleChange}
                                name="phonenumber"
                                value={formData.phonenumber}
                                type="number"
                                placeholder="Your Email"
                                className="w-full p-2 border rounded mt-1"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Date Of Birth</label>
                            <input
                                onChange={handleChange}
                                name="dateofbirth"
                                value={formData.dateofbirth}
                                type="date"
                                placeholder="Your Email"
                                className="w-full p-2 border rounded mt-1"
                            />
                        </div>

                        <button onClick={UpdateProfile} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                            Save Information
                        </button>
                    </div>
                </section>
            )}

            {/* password */}
            {activeTab == "password" && (
                <section className="p-6 bg-gray-100">
                    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold mb-4">Change Password</h2>
                        <div className="mb-4">
                            <label className="block text-gray-700">Old Password</label>
                            <input
                                onChange={handlePasswordChange}
                                type="password"
                                placeholder="Your Name"
                                name="oldpassword"
                                className="w-full p-2 border rounded mt-1"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700">New Password</label>
                            <input
                                onChange={handlePasswordChange}
                                name="newpassword"
                                type="password"
                                placeholder="Your Email"
                                className="w-full p-2 border rounded mt-1"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700">Confirm New Password</label>
                            <input
                                onChange={handlePasswordChange}
                                type="password"
                                name="confirmpassword"
                                placeholder="Your Email"
                                className="w-full p-2 border rounded mt-1"
                            />
                        </div>

                        <button onClick={changePassword} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                            Change
                        </button>
                    </div>
                </section>
            )}
            {/* Article Preferences Section */}
            {activeTab === "preferences" && (
                <section className="p-6 bg-gray-100">
                    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold mb-4">Article Preferences</h2>
                        <div className="flex gap-2 flex-wrap">
                            {articles.map((category) => (
                                <button
                                    onClick={() => selectArticle(category)}
                                    key={category}
                                    className={`px-4 py-2 rounded-full ${
                                        seletedArticles.includes(category) ? "bg-green-600 text-white" : "bg-gray-200 text-gray-800"
                                    }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                        <button onClick={savePrferences} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                            Save Preferences
                        </button>
                    </div>
                </section>

                // change password
            )}
        </div>
    );
};

export default Settings;
