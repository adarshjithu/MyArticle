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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const ArticleModel_1 = __importDefault(require("../Models/ArticleModel"));
const tempOtpSchema_1 = __importDefault(require("../Models/tempOtpSchema"));
const userModel_1 = __importDefault(require("../Models/userModel"));
class UserRepository {
    constructor() { }
    saveToTempStorage(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield tempOtpSchema_1.default.create({ userData: user });
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
    findUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield userModel_1.default.findOne({ email: email });
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
    findTempUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield tempOtpSchema_1.default.findOne({ "userData.time": Number(id) });
                return res;
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
    updateTempUser(time, newTime, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield tempOtpSchema_1.default.updateOne({ "userData.time": Number(time) }, { $set: { "userData.time": newTime, "userData.otp": otp } });
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
    createUser(user, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                delete user.confirmpassword;
                delete user.time;
                delete user.otp;
                user.password = password;
                const newUser = new userModel_1.default(user);
                yield newUser.save();
                return {
                    firstname: newUser === null || newUser === void 0 ? void 0 : newUser.firstname,
                    lastname: newUser === null || newUser === void 0 ? void 0 : newUser.lastname,
                    email: newUser.email,
                    phonenumber: newUser === null || newUser === void 0 ? void 0 : newUser.phonenumber,
                    dateofbirth: newUser === null || newUser === void 0 ? void 0 : newUser.dateofbirth,
                    _id: newUser === null || newUser === void 0 ? void 0 : newUser._id,
                    interests: newUser === null || newUser === void 0 ? void 0 : newUser.interests,
                };
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
    findUserByEmailOrPassword(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isNumber = !isNaN(Number(email)); // Check if the email variable is actually a number
                // Assuming `UserModel` is your Mongoose model or database model
                let user;
                if (isNumber) {
                    // Find by ID or phone number, depending on your schema
                    user = yield userModel_1.default.findOne({ phonenumber: email });
                }
                else {
                    // Find by email
                    user = yield userModel_1.default.findOne({ email: email });
                }
                return user;
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
    getProfileData(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield userModel_1.default.findOne({ _id: userId });
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
    updateUser(user, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield userModel_1.default.findByIdAndUpdate({ _id: userId }, user);
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
    updateInterests(interests, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield userModel_1.default.updateOne({ _id: userId }, { $set: { interests: interests } });
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
    findUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield userModel_1.default.findOne({ _id: userId });
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
    updatePassword(userId, pass) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield userModel_1.default.updateOne({ _id: userId }, { $set: { password: pass } });
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
    createArticle(userId, article) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newArticle = new ArticleModel_1.default(article);
                yield newArticle.save();
                return newArticle;
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
    findArticleById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield ArticleModel_1.default.find({ userId: userId }).populate("userId");
                return res;
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
    deleteArticleById(articleId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield ArticleModel_1.default.deleteOne({ _id: articleId });
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
    findByIdAndUpdateArticle(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(data);
                if ((data === null || data === void 0 ? void 0 : data.images.length) !== 0) {
                    yield ArticleModel_1.default.findByIdAndUpdate({ _id: data === null || data === void 0 ? void 0 : data._id }, data);
                    return yield ArticleModel_1.default.findOne({ _id: data._id });
                }
                else {
                    yield ArticleModel_1.default.findByIdAndUpdate({ _id: data === null || data === void 0 ? void 0 : data._id }, { _id: data._id, title: data === null || data === void 0 ? void 0 : data.title, description: data.description, tags: data.tags, category: data.category });
                    return yield ArticleModel_1.default.findOne({ _id: data._id });
                }
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
    getAllArticlesById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield userModel_1.default.findOne({ _id: userId });
                const interests = user === null || user === void 0 ? void 0 : user.interests;
                const articles = yield ArticleModel_1.default.find({ category: { $in: interests }, blocks: { $nin: userId } })
                    .sort({ _id: -1 })
                    .populate("userId");
                return articles;
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
                const articleData = yield ArticleModel_1.default.findOne({ _id: articleId });
                const likesArr = (articleData === null || articleData === void 0 ? void 0 : articleData.likes) || []; // Define likesArr as a string array
                const isExists = likesArr.includes(userId);
                if (isExists) {
                    yield ArticleModel_1.default.updateOne({ _id: articleId }, { $pull: { likes: userId } });
                    return { success: true, liked: true, userId: userId };
                }
                else {
                    yield ArticleModel_1.default.updateOne({ _id: articleId }, { $push: { likes: userId } });
                    return { success: true, liked: false, userId: userId };
                }
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
    unlike(articleId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const articleData = yield ArticleModel_1.default.findOne({ _id: articleId });
                const unlikesArr = (articleData === null || articleData === void 0 ? void 0 : articleData.unlikes) || []; // Define likesArr as a string array
                const isExists = unlikesArr.includes(userId);
                if (isExists) {
                    yield ArticleModel_1.default.updateOne({ _id: articleId }, { $pull: { unlikes: userId } });
                    return { success: true, unliked: true, userId: userId };
                }
                else {
                    yield ArticleModel_1.default.updateOne({ _id: articleId }, { $push: { unlikes: userId } });
                    return { success: true, unliked: false, userId: userId };
                }
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
                const articleData = yield ArticleModel_1.default.findOne({ _id: articleId });
                const blocksArr = (articleData === null || articleData === void 0 ? void 0 : articleData.blocks) || []; // Define likesArr as a string array
                const isExists = blocksArr.includes(userId);
                if (isExists) {
                    yield ArticleModel_1.default.updateOne({ _id: articleId }, { $pull: { blocks: userId } });
                    return { success: true, blocked: true, userId: userId };
                }
                else {
                    yield ArticleModel_1.default.updateOne({ _id: articleId }, { $push: { blocks: userId } });
                    return { success: true, blocked: false, userId: userId };
                }
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
}
exports.UserRepository = UserRepository;
