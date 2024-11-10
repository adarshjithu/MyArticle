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
exports.UserControler = void 0;
const httpStatusCode_1 = require("../Constants/httpStatusCode");
const uploads_1 = require("../Utils/uploads");
const { OK, BAD_REQUEST, UNAUTHORIZED, CONFLICT } = httpStatusCode_1.STATUS_CODES;
class UserControler {
    constructor(userServices) {
        this.userServices = userServices;
    }
    registerUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.userServices.registerUser(req.body);
                if (result === null || result === void 0 ? void 0 : result.success) {
                    res.status(OK).json(result);
                }
                else {
                    res.status(BAD_REQUEST).json(result);
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    resendOtp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.userServices.resendOtp(req.body);
                if (result === null || result === void 0 ? void 0 : result.success) {
                    res.status(OK).json(result);
                }
                else {
                    res.status(BAD_REQUEST).json(result);
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    submitOtp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const result = yield this.userServices.verifyOtp(req.body.id, req.body.otp);
                const accessTokenMaxAge = 5 * 60 * 1000;
                const refreshTokenMaxAge = 48 * 60 * 60 * 1000;
                console.log(result);
                if (result === null || result === void 0 ? void 0 : result.success) {
                    res.status(OK)
                        .cookie("access_token", (_a = result === null || result === void 0 ? void 0 : result.user) === null || _a === void 0 ? void 0 : _a.accessToken, { maxAge: accessTokenMaxAge, secure: true, httpOnly: true, sameSite: "none" })
                        .cookie("refresh_token", result.user.refreshToken, { maxAge: refreshTokenMaxAge, secure: true, httpOnly: true, sameSite: "none" })
                        .json(result);
                }
                else {
                    res.status(BAD_REQUEST).json(result);
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    loginUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const result = yield this.userServices.loginUser(req.body);
                const accessTokenMaxAge = 5 * 60 * 1000;
                const refreshTokenMaxAge = 48 * 60 * 60 * 1000;
                if (result === null || result === void 0 ? void 0 : result.success) {
                    res.status(OK)
                        .cookie("access_token", (_a = result === null || result === void 0 ? void 0 : result.user) === null || _a === void 0 ? void 0 : _a.accessToken, { maxAge: accessTokenMaxAge, secure: true, httpOnly: true, sameSite: "none" })
                        .cookie("refresh_token", result.user.refreshToken, { maxAge: refreshTokenMaxAge, secure: true, httpOnly: true, sameSite: "none" })
                        .json(result);
                }
                else {
                    res.status(BAD_REQUEST).json(result);
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    logoutUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.cookie("access_token", "", {
                    maxAge: 0,
                    httpOnly: true,
                    sameSite: "none",
                });
                // Clearing the refresh token cookie
                res.cookie("refresh_token", "", {
                    maxAge: 0,
                    httpOnly: true,
                    secure: true,
                    sameSite: "none",
                });
                // Responding with a success message
                res.status(200).json({ success: true, message: "User logout successful" });
            }
            catch (error) {
                next(error);
            }
        });
    }
    getProfile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.userServices.getProfile(req.userId);
                if (result) {
                    res.status(OK).json({ success: true, result: result });
                }
                else {
                    res.status(BAD_REQUEST).json({ success: false });
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    updateProfile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.userServices.updateUserProfile(req.body, req.userId);
                if (result) {
                    res.status(OK).json({ success: true, message: "Profile Updated Successfull", result: result });
                }
                else {
                    res.status(BAD_REQUEST).json({ success: false });
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    updateArtcles(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.userServices.updatePreferences(req.body, req.userId);
                if (result) {
                    res.status(OK).json({ success: true, message: "Preferences Updated Successfull", result: result });
                }
                else {
                    res.status(BAD_REQUEST).json({ success: false });
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    updatePassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.userServices.updatePassword(req.body, req.userId);
                if (result === null || result === void 0 ? void 0 : result.success) {
                    res.status(200).json(result);
                }
                else {
                    res.status(BAD_REQUEST).json(result);
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    addArticle(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const results = yield (0, uploads_1.uploadImageToCloudinary)(req.files);
                const images = (_a = results === null || results === void 0 ? void 0 : results.results) === null || _a === void 0 ? void 0 : _a.map((obj) => obj === null || obj === void 0 ? void 0 : obj.url);
                req.body.images = images;
                req.body.userId = req.userId;
                req.body.tags = JSON.parse(req.body.tags);
                const response = yield this.userServices.addArticle(req.body, req.userId);
                if (response) {
                    res.status(OK).json({ success: true, message: "Article Added successfully", result: response });
                }
                else {
                    res.status(BAD_REQUEST).json({ success: false, message: "Failed to add the article" });
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    getArticle(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.userServices.getArticle(req.userId);
                if (result) {
                    res.status(200).json(result);
                }
                else {
                    res.status(BAD_REQUEST).json(result);
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    deleteArticle(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.userServices.deleteArticle(req.query.articleId);
                if (result) {
                    res.status(200).json({ success: false, message: "Article Deleted Successfully" });
                }
                else {
                    res.status(BAD_REQUEST).json({ success: false, message: "Something Went Wrong" });
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    updateArticle(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const results = yield (0, uploads_1.uploadImageToCloudinary)(req.files);
                const images = (_a = results === null || results === void 0 ? void 0 : results.results) === null || _a === void 0 ? void 0 : _a.map((obj) => obj === null || obj === void 0 ? void 0 : obj.url);
                req.body.images = images;
                req.body.userId = req.userId;
                req.body.tags = JSON.parse(req.body.tags);
                const response = yield this.userServices.updateArticle(req.body, req.userId);
                if (response) {
                    res.status(OK).json({ success: true, message: "Article Added successfully", result: response });
                }
                else {
                    res.status(BAD_REQUEST).json({ success: false, message: "Failed to add the article" });
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    getAllArticles(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.userServices.getAllArticles(req.userId, req.query.type);
                if (result) {
                    res.status(OK).json({ success: true, result: result });
                }
                else {
                    res.status(BAD_REQUEST).json({ success: false });
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    likeArticle(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.userServices.likeArticle(req.query.id, req.userId);
                if (result) {
                    res.status(200).json(result);
                }
                else {
                    res.status(BAD_REQUEST).json({ success: false, message: "Something Went wrong" });
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    unlikeArticle(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.userServices.unlikeArticle(req.query.id, req.userId);
                if (result) {
                    res.status(200).json(result);
                }
                else {
                    res.status(BAD_REQUEST).json({ success: false, message: "Something Went wrong" });
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    blockArticle(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.userServices.blockArticle(req.query.id, req.userId);
                if (result) {
                    res.status(200).json(result);
                }
                else {
                    res.status(BAD_REQUEST).json({ success: false, message: "Something Went wrong" });
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    getSingleArticle(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.params);
                const result = yield this.userServices.getArticleDetails(req.params.id);
                if (result) {
                    res.status(200).json({ success: true, result: result });
                }
                else {
                    res.status(BAD_REQUEST).json({ success: false, message: "Something Went wrong" });
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.UserControler = UserControler;
