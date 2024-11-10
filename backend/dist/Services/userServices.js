"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const generateOtp_1 = require("../Utils/generateOtp");
const hashPassword_1 = require("../Utils/hashPassword");
const sendOtp_1 = require("../Utils/sendOtp");
const token_1 = require("../Utils/token");
class UserServices {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    registerUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const emailExist = yield this.userRepository.findUserByEmail(user.email);
                if (emailExist) {
                    return { success: false, message: "Email already exists Please enter enother email" };
                }
                const otp = (0, generateOtp_1.generateOtp)();
                const isSendOtp = yield (0, sendOtp_1.sentOtpToEmail)(user.email, otp);
                if (isSendOtp) {
                    const time = Date.now();
                    user.time = time;
                    user.otp = otp;
                    const res = yield this.userRepository.saveToTempStorage(user);
                    if (res) {
                        return { success: true, message: "OTP has been sent to your email address successfully.", time: user.time };
                    }
                    else {
                        return { success: false, message: "An Error Occured " };
                    }
                }
                else {
                    return {
                        success: false,
                        message: "Otp Sending Failed ",
                    };
                }
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
    resendOtp(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const time = id.id;
                const tempUserData = yield this.userRepository.findTempUser(time);
                if (!tempUserData) {
                    return { success: false, message: "User Credentials not found signup again" };
                }
                const otp = (0, generateOtp_1.generateOtp)();
                const isSendOtp = yield (0, sendOtp_1.sentOtpToEmail)((_a = tempUserData === null || tempUserData === void 0 ? void 0 : tempUserData.userData) === null || _a === void 0 ? void 0 : _a.email, otp);
                if (isSendOtp) {
                    const newTime = Date.now();
                    const result = yield this.userRepository.updateTempUser(time, newTime, otp);
                    if (result) {
                        return {
                            success: true,
                            message: "Otp has been sent to your email successfully",
                            time: newTime,
                        };
                    }
                    else {
                        return { success: false, message: "Something went wrong" };
                    }
                }
                else {
                    return {
                        success: false,
                        message: "Error while sending otp to this email",
                    };
                }
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
    verifyOtp(id, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const user = yield this.userRepository.findTempUser(id);
                if (!user) {
                    return { success: false, message: "User Credentials not found" };
                }
                const currentTime = Number(new Date());
                const prevTime = Number(new Date((_a = user === null || user === void 0 ? void 0 : user.userData) === null || _a === void 0 ? void 0 : _a.time));
                const diff = Math.floor((currentTime - prevTime) / 1000);
                if (diff > 30) {
                    return { success: false, message: "Otp expired " };
                }
                if (otp !== (user === null || user === void 0 ? void 0 : user.userData.otp))
                    return { success: false, message: "Otp Do not match, Try another one" };
                const password = yield (0, hashPassword_1.hashPassword)((_b = user === null || user === void 0 ? void 0 : user.userData) === null || _b === void 0 ? void 0 : _b.password);
                const newUser = yield this.userRepository.createUser(user === null || user === void 0 ? void 0 : user.userData, password);
                const accessToken = (0, token_1.generateAccessToken)(newUser === null || newUser === void 0 ? void 0 : newUser._id);
                const refreshToken = (0, token_1.generateRefreshToken)(newUser === null || newUser === void 0 ? void 0 : newUser._id);
                return { success: true, message: "User Registration successfull", user: Object.assign(Object.assign({}, newUser), { accessToken, refreshToken }) };
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
    loginUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = yield this.userRepository.findUserByEmailOrPassword(user === null || user === void 0 ? void 0 : user.email);
                if (!userData)
                    return { success: false, message: "Authentication Failed Invalid User" };
                const isPasswordValid = yield (0, hashPassword_1.comparePassword)(user === null || user === void 0 ? void 0 : user.password, userData === null || userData === void 0 ? void 0 : userData.password);
                if (!isPasswordValid)
                    return { success: false, message: "Authentication Failed Incorrect password" };
                const accessToken = (0, token_1.generateAccessToken)(userData === null || userData === void 0 ? void 0 : userData._id);
                const refreshToken = (0, token_1.generateRefreshToken)(userData === null || userData === void 0 ? void 0 : userData._id);
                const userObj = {
                    accessToken,
                    refreshToken,
                    firstname: userData === null || userData === void 0 ? void 0 : userData.firstname,
                    lastname: userData === null || userData === void 0 ? void 0 : userData.lastname,
                    email: userData === null || userData === void 0 ? void 0 : userData.email,
                    phonenumber: userData === null || userData === void 0 ? void 0 : userData.phonenumber,
                    interests: userData === null || userData === void 0 ? void 0 : userData.interests,
                    dateofbirth: userData === null || userData === void 0 ? void 0 : userData.dateofbirth,
                    _id: userData === null || userData === void 0 ? void 0 : userData._id,
                };
                return { success: true, message: "User Registration Successfull", user: userObj };
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
    getProfile(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.userRepository.getProfileData(userId);
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
    updateUserProfile(user, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.userRepository.updateUser(user, userId);
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
    updatePreferences(preferences, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.userRepository.updateInterests(preferences, userId);
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
    updatePassword(password, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userRepository.findUserById(userId);
                if (!user)
                    return { success: false, message: "Invalid User" };
                const isPasswordValid = yield (0, hashPassword_1.comparePassword)(password === null || password === void 0 ? void 0 : password.oldpassword, (user === null || user === void 0 ? void 0 : user.password) || "");
                console.log(isPasswordValid);
                if (!isPasswordValid)
                    return {
                        success: false,
                        message: "The Password You entered is Invalid",
                    };
                const newPassword = yield (0, hashPassword_1.hashPassword)(password.newpassword);
                const passRes = yield this.userRepository.updatePassword(userId, newPassword);
                if (passRes) {
                    return { success: true, message: "Password Updated Successfully" };
                }
                else {
                    return { success: false, message: "Something Went wrong" };
                }
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
    addArticle(data, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.userRepository.createArticle(userId, data);
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
    getArticle(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.userRepository.findArticleById(userId);
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
    deleteArticle(articleId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.userRepository.deleteArticleById(articleId);
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
    updateArticle(data, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.userRepository.findByIdAndUpdateArticle(data);
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
    getAllArticles(userId, type) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.userRepository.getAllArticlesById(userId, type);
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
    likeArticle(articleId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.userRepository.likeArticle(articleId, userId);
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
    unlikeArticle(articleId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.userRepository.unlike(articleId, userId);
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
    blockArticle(articleId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.userRepository.blockArticle(articleId, userId);
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
    getArticleDetails(articleId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.userRepository.getAllArticleDetailsById(articleId);
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
}
exports.UserServices = UserServices;
