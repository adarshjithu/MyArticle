import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { resendOtp, submitOtp } from "../Services/apiService/userServices";
import { useDispatch, useSelector } from "react-redux";
import { setUserCredentials } from "../app/features/auth";
import { useNavigate } from "react-router-dom";

const OtpModal = ({ setShowOtpModal }) => {
    const [second, setSecond] = useState(30);
    const [load,setLoad] = useState(false);
    const [otp,setOtp] = useState('')
    const dispatch = useDispatch()
    const navigate =  useNavigate()
    const user =  useSelector((data)=>data?.auth?.user)

    useEffect(() => {
        let interval = setInterval(() => {
            let dt = Date.now();
            let diff = Math.floor((dt - parseInt(localStorage.getItem("otp-id"))) / 1000);
            let second = 30 - diff;
            if (second < 0) {
                clearInterval(interval);
            } else {
                setSecond(second);
            }
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, [load]);


    const resend = async () => {
        const res = await resendOtp(localStorage.getItem("otp-id"));
        if(res?.data?.success){

            localStorage.setItem("otp-id", String(res?.data?.time));
            setLoad(!load)
        }
    };


    const submit = async()=>{
             const res =  await submitOtp(localStorage.getItem('otp-id'),otp);
            if(res?.data?.success){
                dispatch(setUserCredentials(res?.data?.user))
                navigate('/dashboard')
            }

    }

    useEffect(()=>{
        if(user){
            navigate('/dashboard')
        }
    },[])

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-96">
                <div className="text-center">
                    <h2 className="text-xl font-semibold">Enter OTP</h2>
                    <p className="mt-2 text-gray-600">We have sent an OTP to your email. Please enter it below.</p>

                    {/* OTP Input Field */}
                    <div className="mt-4">
                        <input value={otp} onChange={(e)=>setOtp(e.target.value)} type="text" maxLength={6} className="w-full px-4 py-2 border border-gray-300 rounded-md" placeholder="Enter OTP" />
                    </div>

                    {/* Timer Section */}
                    <div className="mt-2 text-center">
                        <p className="text-lg text-gray-700">
                            Time remaining: <span className="text-red-500">{second}S</span>
                        </p>
                    </div>

                    <div className="mt-4 flex justify-between">
                        <button onClick={() => setShowOtpModal(false)} className="px-4 py-2 bg-gray-300 rounded-md text-sm">
                            Cancel
                        </button>
                        <button onClick={resend} className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm">
                            Resend
                        </button>
                        <button onClick={submit} className="px-4 py-2 bg-green-600 text-white rounded-md text-sm">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OtpModal;
