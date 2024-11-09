import express from "express";
import { UserServices } from "../Services/userServices";
import { UserRepository } from "../Repositories/userRepository";
import { UserControler } from "../Controlers/userControler";
import { authenticate } from "../Middleware/authMiddleWare";
import upload from "../Middleware/upload";
const userRouter = express.Router();
const userRepository = new UserRepository();
const userServices = new UserServices(userRepository);
const controler = new UserControler(userServices);

userRouter.post("/signup",(req,res,next)=>{controler.registerUser(req,res,next)})
userRouter.post('/otp/resend',(req,res,next)=>controler.resendOtp(req,res,next))
userRouter.post("/otp/submit",(req,res,next)=>controler.submitOtp(req,res,next));
userRouter.post("/login",(req,res,next)=>controler.loginUser(req,res,next))
userRouter.get("/logout",(req,res,next)=>{controler.logoutUser(req,res,next)})
userRouter.get('/profile',authenticate,(req,res,next)=>controler.getProfile(req,res,next))
userRouter.patch("/profile",authenticate,(req,res,next)=>controler.updateProfile(req,res,next))
userRouter.patch("/interests",authenticate,(req,res,next)=>controler.updateArtcles(req,res,next))
userRouter.patch("/password",authenticate,(req,res,next)=>controler.updatePassword(req,res,next))
userRouter.post("/articles",authenticate,upload.any(),(req,res,next)=>controler.addArticle(req,res,next))
userRouter.put("/articles",authenticate,upload.any(),(req,res,next)=>controler.updateArticle(req,res,next))
userRouter.get('/article',authenticate,(req,res,next)=>controler.getArticle(req,res,next))
userRouter.delete('/article',authenticate,(req,res,next)=>controler.deleteArticle(req,res,next))
userRouter.get('/articles',authenticate,(req,res,next)=>controler.getAllArticles(req,res,next))
userRouter.get("/article/like",authenticate,(req,res,next)=>controler.likeArticle(req,res,next))
userRouter.get("/article/unlike",authenticate,(req,res,next)=>controler.unlikeArticle(req,res,next))
userRouter.get("/article/block",authenticate,(req,res,next)=>controler.blockArticle(req,res,next))
export default userRouter;
