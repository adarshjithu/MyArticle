import { IArticle } from "../Interfaces/Models/IArticle";
import { MongoOperationResult } from "../Interfaces/Models/IMongoOperation";
import Article from "../Models/ArticleModel";
import TempStorage from "../Models/tempOtpSchema";
import User, { IUser } from "../Models/userModel";

export class UserRepository {
    constructor() {}

    async saveToTempStorage(user: Partial<IUser>): Promise<MongoOperationResult> {
        try {
            return await TempStorage.create({ userData: user });
        } catch (error) {
            console.log(error as Error);
            return null;
        }
    }
    async findUserByEmail(email: String): Promise<MongoOperationResult> {
        try {
            return await User.findOne({ email: email });
        } catch (error) {
            console.log(error as Error);
            return null;
        }
    }
    async findTempUser(id: string): Promise<{ userData: RegisterInterface } | null> {
        try {
            const res = await TempStorage.findOne({ "userData.time": Number(id) });

            return res;
        } catch (error) {
            console.log(error as Error);
            return null;
        }
    }
    async updateTempUser(time: string, newTime: number, otp: string): Promise<MongoOperationResult | null> {
        try {
            return await TempStorage.updateOne({ "userData.time": Number(time) }, { $set: { "userData.time": newTime, "userData.otp": otp } });
        } catch (error) {
            console.log(error as Error);
            return null;
        }
    }
    async createUser(user: Partial<RegisterInterface>, password: string): Promise<Partial<RegisterInterface> | null> {
        try {
            delete user.confirmpassword;
            delete user.time;
            delete user.otp;
            user.password = password;
            const newUser = new User(user);
            await newUser.save();

            return {
                firstname: newUser?.firstname,
                lastname: newUser?.lastname,
                email: newUser.email,
                phonenumber: newUser?.phonenumber,
                dateofbirth: newUser?.dateofbirth,
                _id: newUser?._id,
                interests: newUser?.interests,
            };
        } catch (error) {
            console.log(error as Error);
            return null;
        }
    }

    async findUserByEmailOrPassword(email: string | number): Promise<IUser | null> {
        try {
            const isNumber = !isNaN(Number(email)); // Check if the email variable is actually a number

            // Assuming `UserModel` is your Mongoose model or database model
            let user: IUser | null;

            if (isNumber) {
                // Find by ID or phone number, depending on your schema
                user = await User.findOne({ phonenumber: email });
            } else {
                // Find by email
                user = await User.findOne({ email: email });
            }

            return user;
        } catch (error) {
            console.log(error as Error);
            return null;
        }
    }
    async getProfileData(userId: string): Promise<IUser | null> {
        try {
            return await User.findOne({ _id: userId });
        } catch (error) {
            console.log(error as Error);
            return null;
        }
    }
    async updateUser(user: IUser, userId: string): Promise<IUser | null> {
        try {
            return await User.findByIdAndUpdate({ _id: userId }, user);
        } catch (error) {
            console.log(error as Error);
            return null;
        }
    }
    async updateInterests(interests: string[], userId: string): Promise<MongoOperationResult | null> {
        try {
            return await User.updateOne({ _id: userId }, { $set: { interests: interests } });
        } catch (error) {
            console.log(error as Error);
            return null;
        }
    }
    async findUserById(userId: string): Promise<IUser | null> {
        try {
            return await User.findOne({ _id: userId });
        } catch (error) {
            console.log(error as Error);
            return null;
        }
    }
    async updatePassword(userId: string, pass: string): Promise<MongoOperationResult | null> {
        try {
            return await User.updateOne({ _id: userId }, { $set: { password: pass } });
        } catch (error) {
            console.log(error as Error);
            return null;
        }
    }
    async createArticle(userId: string, article: IArticle): Promise<Record<string, any> | null> {
        try {
            const newArticle = new Article(article);
            await newArticle.save();
            return newArticle;
        } catch (error) {
            console.log(error as Error);
            return null;
        }
    }
    async findArticleById(userId: string): Promise<Record<string, any> | null> {
        try {
            const res = await Article.find({ userId: userId }).populate("userId");

            return res;
        } catch (error) {
            console.log(error as Error);
            return null;
        }
    }
    async deleteArticleById(articleId: string): Promise<Record<string, any> | null> {
        try {
            return await Article.deleteOne({ _id: articleId });
        } catch (error) {
            console.log(error as Error);
            return null;
        }
    }
    async findByIdAndUpdateArticle(data: IArticle): Promise<Record<string, any> | null> {
        try {
            console.log(data);
            if (data?.images.length !== 0) {
                await Article.findByIdAndUpdate({ _id: data?._id }, data);
                return await Article.findOne({ _id: data._id });
            } else {
                await Article.findByIdAndUpdate(
                    { _id: data?._id },
                    { _id: data._id, title: data?.title, description: data.description, tags: data.tags, category: data.category }
                );
                return await Article.findOne({ _id: data._id });
            }
        } catch (error) {
            console.log(error as Error);
            return null;
        }
    }
    async getAllArticlesById(userId: string): Promise<any | null> {
        try {
            const user = await User.findOne({ _id: userId });
            const interests = user?.interests;
            
            const articles = await Article.find({ category: { $in: interests },blocks:{$nin:userId}})
                .sort({ _id: -1 })
                .populate("userId");

                
            return articles;
        } catch (error) {
            console.log(error as Error);
            return null;
        }
    }
    async likeArticle(articleId: string, userId: string): Promise<any | null> {
        try {
            interface IAr {
                _id: string;
                likes: string[]; // Specify that likes is an array of strings
            }
            const articleData: IAr | null = await Article.findOne({ _id: articleId });
            const likesArr: string[] = articleData?.likes || []; // Define likesArr as a string array
            const isExists = likesArr.includes(userId);
            if (isExists) {
                await Article.updateOne({ _id: articleId }, { $pull: { likes: userId } });
                return { success: true, liked: true, userId: userId };
            } else {
                await Article.updateOne({ _id: articleId }, { $push: { likes: userId } });
                return { success: true, liked: false, userId: userId };
            }
        } catch (error) {
            console.log(error as Error);
            return null;
        }
    }
    async unlike(articleId: string, userId: string): Promise<any | null> {
        try {
            interface IAr {
                _id: string;
                unlikes: string[]; // Specify that likes is an array of strings
            }
            const articleData: IAr | null = await Article.findOne({ _id: articleId });
            const unlikesArr: string[] = articleData?.unlikes || []; // Define likesArr as a string array
            const isExists = unlikesArr.includes(userId);
            if (isExists) {
                await Article.updateOne({ _id: articleId }, { $pull: { unlikes: userId } });
                return { success: true, unliked: true, userId: userId };
            } else {
                await Article.updateOne({ _id: articleId }, { $push: { unlikes: userId } });
                return { success: true, unliked: false, userId: userId };
            }
        } catch (error) {
            console.log(error as Error);
            return null;
        }
    }
    async blockArticle(articleId: string, userId: string): Promise<any | null> {
        try {
            interface IAr {
                _id: string;
                blocks: string[]; // Specify that likes is an array of strings
            }
            const articleData: IAr | null = await Article.findOne({ _id: articleId });
            const blocksArr: string[] = articleData?.blocks || []; // Define likesArr as a string array
            const isExists = blocksArr.includes(userId);
            if (isExists) {
                await Article.updateOne({ _id: articleId }, { $pull: { blocks: userId } });
                return { success: true, blocked: true, userId: userId };
            } else {
                await Article.updateOne({ _id: articleId }, { $push: { blocks: userId } });
                return { success: true, blocked: false, userId: userId };
            }
        } catch (error) {
            console.log(error as Error);
            return null;
        }
    }
}
