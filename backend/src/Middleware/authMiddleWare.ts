import { NextFunction,Request,Response } from "express";
import { verifyRefreshToken } from "../Utils/token";


export const authenticate = (req:Request,res:Response,next:NextFunction)=>{
    const { access_token, refresh_token } = req.cookies;
    
  
    if(!refresh_token){
        res.status(404).json({success:false,message:"Refresh Token Expired"})
    }else{

        const refreshTokenValid = verifyRefreshToken(refresh_token)
     
        if(refreshTokenValid){
            req.userId = refreshTokenValid.data;
          next()
        }else{
           res.status(404).json({success:false,message:"Refresh Token Expired"})
        }
    }
   
}