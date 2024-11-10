import axios from "axios";
import toast from "react-hot-toast";
import {store} from '../app/store'
import { userLogout } from "../app/features/auth";
 const axiosInstance = axios.create({
    baseURL: "https://www.myarticle.shop",
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
    if(error?.response?.data?.message=='Refresh Token Expired'){
     store.dispatch(userLogout())
    }
    if(error?.response?.data?.message!=='Refresh Token Expired'){

        toast.error(error?.response?.data?.message)
    }
    return Promise.reject(error);
})


export default axiosInstance