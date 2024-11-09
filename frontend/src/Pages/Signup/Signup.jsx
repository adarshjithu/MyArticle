import React, { useEffect, useState } from "react";
import InterestModal from "../../Components/InterestModal";
import toast from "react-hot-toast";
import { signupSchema } from "../../Utils/Validations";
import { useNavigate } from "react-router-dom";
import { userSignup } from "../../Services/apiService/userServices";
import OtpModal from "../../Components/OtpModal";
import LoadingCircle from "../../Components/LoadingCircle";
import { useDispatch, useSelector } from "react-redux";

const Signup = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedInterests, setSelectedInterests] = useState([]);
    const [showOtpModal, setShowOtpModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const userCredentials = useSelector((data) => data?.auth?.userData);
    console.log(userCredentials);

    const [error, setError] = useState({
        firstname: "",
        lastname: "",
        phonenumber: "",
        email: "",
        dateofbirth: "",
        password: "",
        confirmpassword: "",
    });

    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        phonenumber: "",
        email: "",
        dateofbirth: "",
        password: "",
        confirmpassword: "",
        interests: [],
    });
    const [showInterests, setShowInterests] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (selectedInterests.length < 3) {
            toast.error("Please select atleast 3 interests");
            return;
        }
        try {
            await signupSchema.validate(formData, { abortEarly: false });
            formData.interests = selectedInterests;
            setLoading(true);
            const res = await userSignup(formData);
            setLoading(false);
            if (res?.data?.success) {
                const time = res?.data?.time;

                localStorage.setItem("otp-id", String(time));
                setShowOtpModal(true);
            }
        } catch (err) {
            setLoading(false);
            const validationErrors = {};
            if (err.inner) {
                err.inner.forEach((error) => {
                    validationErrors[error.path] = error.message;
                });
            }
            //User validation failed errors
            setError(validationErrors);
        }
    };

    useEffect(() => {
        if (userCredentials) navigate("/dashboard");
    }, []);
    return (
        <>
            {showOtpModal && <OtpModal setShowOtpModal={setShowOtpModal} />}
            {isOpen && (
                <InterestModal
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    selectedInterests={selectedInterests}
                    setSelectedInterests={setSelectedInterests}
                />
            )}
            <div className="flex items-center justify-center min-h-screen bg-gray-200">
                <div className="w-full max-w-md bg-white p-8 border border-gray-200 shadow-sm rounded-lg">
                    <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Sign up</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-5">
                            <label className="block text-gray-700 font-medium mb-2">First Name</label>
                            {error.firstname && <span className="text-[red]">{error.firstname}</span>}
                            <input
                                type="text"
                                name="firstname"
                                value={formData.firstname}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 placeholder-gray-500"
                                placeholder="Enter firsname"
                            />
                        </div>

                        <div className="mb-5">
                            <label className="block text-gray-700 font-medium mb-2">Last Name</label>
                            {error.lastname && <span className="text-[red]">{error.lastname}</span>}
                            <input
                                type="text"
                                name="lastname"
                                value={formData.lastname}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 placeholder-gray-500"
                                placeholder="Enter lastname"
                            />
                        </div>
                        <div className="mb-5">
                            <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
                            {error.phonenumber && <span className="text-[red]">{error.phonenumber}</span>}
                            <input
                                type="number"
                                name="phonenumber"
                                value={formData.phonenumber}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 placeholder-gray-500"
                                placeholder="Enter phonenumber"
                            />
                        </div>

                        <div className="mb-5">
                            <label className="block text-gray-700 font-medium mb-2">Email Address</label>
                            {error.email && <span className="text-[red]">{error.email}</span>}
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 placeholder-gray-500"
                                placeholder="Enter email"
                            />
                        </div>

                        <div className="mb-5">
                            <label className="block text-gray-700 font-medium mb-2">Date Of Birth</label>
                            {}
                            <input
                                type="date"
                                name="dateofbirth"
                                value={formData.dateofbirth}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 placeholder-gray-500"
                                placeholder="Enter date of birth"
                            />
                        </div>

                        <div className="mb-5">
                            <label className="block text-gray-700 font-medium mb-2">Password</label>
                            {error.password && <span className="text-[red]">{error.password}</span>}
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 placeholder-gray-500"
                                placeholder="Enter password"
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-700 font-medium mb-2">Confirm Password</label>
                            {error.confirmpassword && <span className="text-[red]">{error.confirmpassword}</span>}
                            <input
                                type="password"
                                name="confirmpassword"
                                value={formData.confirmpassword}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 placeholder-gray-500"
                                placeholder="Enter confirm password"
                            />
                        </div>

                        <div className="mb-6">
                            <button
                                type="button"
                                onClick={() => setIsOpen(!isOpen)}
                                className="w-full bg-green-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-700 transition duration-150"
                            >
                                What are you interested in?
                            </button>

                            {showInterests && (
                                <div className="mt-4 border border-gray-300 rounded-lg p-4 bg-gray-50">
                                    <p className="text-gray-700 font-medium mb-2">Select Interests</p>
                                    <div className="grid grid-cols-2 gap-2">
                                        {interestsOptions.map((interest, index) => (
                                            <div key={index} className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    id={interest}
                                                    name="interests"
                                                    value={interest}
                                                    checked={formData.interests.includes(interest)}
                                                    onChange={handleCheckboxChange}
                                                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                                                />
                                                <label htmlFor={interest} className="ml-2 text-gray-700 font-medium">
                                                    {interest}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-black text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-700 transition duration-150"
                        >
                            {loading ? (
                                <div className="w-full flex justify-center items-center">
                                    <LoadingCircle />
                                </div>
                            ) : (
                                "  Sign Up"
                            )}
                        </button>
                    </form>

                    <p className="mt-4 text-center text-sm text-gray-600">
                        Already have an account?{" "}
                        <button onClick={() => navigate("/login")} className="text-green-600 font-bold hover:underline">
                            Sign in
                        </button>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Signup;
