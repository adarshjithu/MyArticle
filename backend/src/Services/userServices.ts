import { ObjectId } from "mongoose";
import { UserRepository } from "../Repositories/userRepository";
import { generateOtp } from "../Utils/generateOtp";
import { comparePassword, hashPassword } from "../Utils/hashPassword";
import { sentOtpToEmail } from "../Utils/sendOtp";
import { generateAccessToken, generateRefreshToken } from "../Utils/token";
import { IUser } from "../Models/userModel";
import { MongoOperationResult } from "../Interfaces/Models/IMongoOperation";
import { IArticle } from "../Interfaces/Models/IArticle";

export class UserServices {
    constructor(public userRepository: UserRepository) {}

    async registerUser(user: RegisterInterface): Promise<IRegisterSuccess | null> {
        try {
            const emailExist = await this.userRepository.findUserByEmail(user.email);
            if (emailExist) {
                return { success: false, message: "Email already exists Please enter enother email" };
            }
            const otp = generateOtp();
            const isSendOtp = await sentOtpToEmail(user.email, otp);
            if (isSendOtp) {
                const time = Date.now();
                user.time = time;
                user.otp = otp;
                const res = await this.userRepository.saveToTempStorage(user);
                if (res) {
                    return { success: true, message: "OTP has been sent to your email address successfully.", time: user.time };
                } else {
                    return { success: false, message: "An Error Occured " };
                }
            } else {
                return {
                    success: false,
                    message: "Otp Sending Failed ",
                };
            }
        } catch (error) {
            console.log(error as Error);
            return null;
        }
    }

    async resendOtp(id: { id: string }): Promise<IRegisterSuccess | null> {
        try {
            const time = id.id;
            const tempUserData = await this.userRepository.findTempUser(time);

            if (!tempUserData) {
                return { success: false, message: "User Credentials not found signup again" };
            }

            const otp = generateOtp();
            const isSendOtp = await sentOtpToEmail(tempUserData?.userData?.email, otp);
            if (isSendOtp) {
                const newTime = Date.now();
                const result = await this.userRepository.updateTempUser(time, newTime, otp);
                if (result) {
                    return {
                        success: true,
                        message: "Otp has been sent to your email successfully",
                        time: newTime,
                    };
                } else {
                    return { success: false, message: "Something went wrong" };
                }
            } else {
                return {
                    success: false,
                    message: "Error while sending otp to this email",
                };
            }
        } catch (error) {
            console.log(error as Error);
            return null;
        }
    }

    async verifyOtp(id: string, otp: string): Promise<IRegisterSuccess | null> {
        try {
            const user = await this.userRepository.findTempUser(id);

            if (!user) {
                return { success: false, message: "User Credentials not found" };
            }
            const currentTime = Number(new Date());
            const prevTime = Number(new Date(user?.userData?.time));
            const diff = Math.floor((currentTime - prevTime) / 1000);
            if (diff > 30) {
                return { success: false, message: "Otp expired " };
            }
            if (otp !== user?.userData.otp) return { success: false, message: "Otp Do not match, Try another one" };

            const password = await hashPassword(user?.userData?.password);
            const newUser = await this.userRepository.createUser(user?.userData, password);

            const accessToken = generateAccessToken(newUser?._id as ObjectId);
            const refreshToken = generateRefreshToken(newUser?._id as ObjectId);
            return { success: true, message: "User Registration successfull", user: { ...newUser, accessToken, refreshToken } };
        } catch (error) {
            console.log(error as Error);
            return null;
        }
    }

    async loginUser(user: { email: string | number; password: string }): Promise<any> {
        try {
            const userData = await this.userRepository.findUserByEmailOrPassword(user?.email);
            if (!userData) return { success: false, message: "Authentication Failed Invalid User" };

            const isPasswordValid = await comparePassword(user?.password, userData?.password);
            if (!isPasswordValid) return { success: false, message: "Authentication Failed Incorrect password" };

            const accessToken = generateAccessToken(userData?._id as ObjectId);
            const refreshToken = generateRefreshToken(userData?._id as ObjectId);
            const userObj = {
                accessToken,
                refreshToken,
                firstname: userData?.firstname,
                lastname: userData?.lastname,
                email: userData?.email,
                phonenumber: userData?.phonenumber,
                interests: userData?.interests,
                dateofbirth: userData?.dateofbirth,
                _id: userData?._id,
            };

            return { success: true, message: "User Registration Successfull", user: userObj };
        } catch (error) {
            console.log(error as Error);
            return null;
        }
    }

    async getProfile(userId: string): Promise<IUser | null> {
        try {
            return await this.userRepository.getProfileData(userId);
        } catch (error) {
            console.log(error as Error);
            return null;
        }
    }

    async updateUserProfile(user: IUser, userId: string): Promise<IUser | null> {
        try {
            return await this.userRepository.updateUser(user, userId);
        } catch (error) {
            console.log(error as Error);
            return null;
        }
    }
    async updatePreferences(preferences: string[], userId: string): Promise<MongoOperationResult | null> {
        try {
            return await this.userRepository.updateInterests(preferences, userId);
        } catch (error) {
            console.log(error as Error);
            return null;
        }
    }
    async updatePassword(
        password: { oldpassword: string; newpassword: string; confirmpassword: string },
        userId: string
    ): Promise<IRegisterSuccess | null> {
        try {
            const user = await this.userRepository.findUserById(userId);
            if (!user) return { success: false, message: "Invalid User" };

            const isPasswordValid = await comparePassword(password?.oldpassword, user?.password || "");
            console.log(isPasswordValid);
            if (!isPasswordValid)
                return {
                    success: false,
                    message: "The Password You entered is Invalid",
                };

            const newPassword = await hashPassword(password.newpassword);
            const passRes = await this.userRepository.updatePassword(userId, newPassword);
            if (passRes) {
                return { success: true, message: "Password Updated Successfully" };
            } else {
                return { success: false, message: "Something Went wrong" };
            }
        } catch (error) {
            console.log(error as Error);
            return null;
        }
    }


    async addArticle(data:IArticle,userId:string): Promise<Record<string,any> | null> {
        try {
          return this.userRepository.createArticle(userId,data)
        } catch (error) {
            console.log(error as Error);
            return null;
        }
    }
    async getArticle(userId:string): Promise<Record<string,any> | null> {
        try {
          return this.userRepository.findArticleById(userId)
        } catch (error) {
            console.log(error as Error);
            return null;
        }
    }
    async deleteArticle(articleId:string): Promise<Record<string,any> | null> {
        try {
          return this.userRepository.deleteArticleById(articleId)
        } catch (error) {
            console.log(error as Error);
            return null;
        }
    }
  
    async updateArticle(data:IArticle,userId:string): Promise<Record<string,any> | null> {
        try {
        return await this.userRepository.findByIdAndUpdateArticle(data)
        } catch (error) {
            console.log(error as Error);
            return null;
        }
    }
    async getAllArticles(userId:string): Promise<Record<string,any> | null> {
        try {
        return await this.userRepository.getAllArticlesById(userId)
        } catch (error) {
            console.log(error as Error);
            return null;
        }
    }
    async likeArticle(articleId:string,userId:string): Promise<Record<string,any> | null> {
        try {
        return await this.userRepository.likeArticle(articleId,userId)
        } catch (error) {
            console.log(error as Error);
            return null;
        }
    }
    async unlikeArticle(articleId:string,userId:string): Promise<Record<string,any> | null> {
        try {
        return await this.userRepository.unlike(articleId,userId)
        } catch (error) {
            console.log(error as Error);
            return null;
        }
    }
    async blockArticle(articleId:string,userId:string): Promise<Record<string,any> | null> {
        try {
        return await this.userRepository.blockArticle(articleId,userId)
        } catch (error) {
            console.log(error as Error);
            return null;
        }
    }
    async getArticleDetails(articleId:string): Promise<Record<string,any> | null> {
        try {
            return await this.userRepository.getAllArticleDetailsById(articleId)
        } catch (error) {
            console.log(error as Error);
            return null;
        }
    }
}
