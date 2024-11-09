import axios from "axios";
import toast from "react-hot-toast";

 const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

axiosInstance.interceptors.response.use((response)=>{

    if(response?.data?.message){
        toast.success(response?.data?.message)
    }
    
    return response;
},(error)=>{
    console.log(error.response.data.message)
    toast.error(error?.response?.data?.message)
    return Promise.reject(error);
})


export default axiosInstance