import { NextFunction, Request, Response } from "express-serve-static-core";
import { UserServices } from "../Services/userServices";
import { STATUS_CODES } from "../Constants/httpStatusCode";
import { response } from "express";
import { uploadImageToCloudinary } from "../Utils/uploads";
const { OK, BAD_REQUEST, UNAUTHORIZED, CONFLICT } = STATUS_CODES;
export class UserControler {
    constructor(public userServices: UserServices) {}

    async registerUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const result = await this.userServices.registerUser(req.body);
            if (result?.success) {
                res.status(OK).json(result);
            } else {
                res.status(BAD_REQUEST).json(result);
            }
        } catch (error) {
            next(error);
        }
    }

    async resendOtp(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const result = await this.userServices.resendOtp(req.body);

            if (result?.success) {
                res.status(OK).json(result);
            } else {
                res.status(BAD_REQUEST).json(result);
            }
        } catch (error) {
            next(error);
        }
    }

    async submitOtp(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const result = await this.userServices.verifyOtp(req.body.id as string, req.body.otp as string);
            const accessTokenMaxAge = 5 * 60 * 1000;
            const refreshTokenMaxAge = 48 * 60 * 60 * 1000;
            console.log(result);
            if (result?.success) {
                res.status(OK)
                    .cookie("access_token", result?.user?.accessToken, { maxAge: accessTokenMaxAge, secure: true, httpOnly: true, sameSite: "none" })
                    .cookie("refresh_token", result.user.refreshToken, { maxAge: refreshTokenMaxAge, secure: true, httpOnly: true, sameSite: "none" })
                    .json(result);
            } else {
                res.status(BAD_REQUEST).json(result);
            }
        } catch (error) {
            next(error);
        }
    }

    async loginUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const result = await this.userServices.loginUser(req.body);
            const accessTokenMaxAge = 5 * 60 * 1000;
            const refreshTokenMaxAge = 48 * 60 * 60 * 1000;

            if (result?.success) {
                res.status(OK)
                    .cookie("access_token", result?.user?.accessToken, { maxAge: accessTokenMaxAge, secure: true, httpOnly: true, sameSite: "none" })
                    .cookie("refresh_token", result.user.refreshToken, { maxAge: refreshTokenMaxAge, secure: true, httpOnly: true, sameSite: "none" })
                    .json(result);
            } else {
                res.status(BAD_REQUEST).json(result);
            }
        } catch (error) {
            next(error);
        }
    }

    async logoutUser(req: Request, res: Response, next: NextFunction): Promise<void> {
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
        } catch (error) {
            next(error);
        }
    }

    async getProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const result = await this.userServices.getProfile(req.userId as string);
            if (result) {
                res.status(OK).json({ success: true, result: result });
            } else {
                res.status(BAD_REQUEST).json({ success: false });
            }
        } catch (error) {
            next(error);
        }
    }

    async updateProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const result = await this.userServices.updateUserProfile(req.body, req.userId);
            if (result) {
                res.status(OK).json({ success: true, message: "Profile Updated Successfull", result: result });
            } else {
                res.status(BAD_REQUEST).json({ success: false });
            }
        } catch (error) {
            next(error);
        }
    }
    async updateArtcles(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const result = await this.userServices.updatePreferences(req.body, req.userId);
            if (result) {
                res.status(OK).json({ success: true, message: "Preferences Updated Successfull", result: result });
            } else {
                res.status(BAD_REQUEST).json({ success: false });
            }
        } catch (error) {
            next(error);
        }
    }
    async updatePassword(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const result = await this.userServices.updatePassword(req.body, req.userId);
            if (result?.success) {
                res.status(200).json(result);
            } else {
                res.status(BAD_REQUEST).json(result);
            }
        } catch (error) {
            next(error);
        }
    }
    async addArticle(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const results = await uploadImageToCloudinary(req.files);
            const images = results?.results?.map((obj: any) => obj?.url);

            req.body.images = images;
            req.body.userId = req.userId;
            req.body.tags = JSON.parse(req.body.tags);

            const response = await this.userServices.addArticle(req.body, req.userId);

            if (response) {
                res.status(OK).json({ success: true, message: "Article Added successfully", result: response });
            } else {
                res.status(BAD_REQUEST).json({ success: false, message: "Failed to add the article" });
            }
        } catch (error) {
            next(error);
        }
    }

    async getArticle(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const result = await this.userServices.getArticle(req.userId);

            if (result) {
                res.status(200).json(result);
            } else {
                res.status(BAD_REQUEST).json(result);
            }
        } catch (error) {
            next(error);
        }
    }

    async deleteArticle(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const result = await this.userServices.deleteArticle(req.query.articleId as string);

            if (result) {
                res.status(200).json({ success: false, message: "Article Deleted Successfully" });
            } else {
                res.status(BAD_REQUEST).json({ success: false, message: "Something Went Wrong" });
            }
        } catch (error) {
            next(error);
        }
    }

    async updateArticle(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const results = await uploadImageToCloudinary(req.files);
            const images = results?.results?.map((obj: any) => obj?.url);

            req.body.images = images;
            req.body.userId = req.userId;
            req.body.tags = JSON.parse(req.body.tags);

            const response = await this.userServices.updateArticle(req.body, req.userId);

            if (response) {
                res.status(OK).json({ success: true, message: "Article Added successfully", result: response });
            } else {
                res.status(BAD_REQUEST).json({ success: false, message: "Failed to add the article" });
            }
        } catch (error) {
            next(error);
        }
    }
    async getAllArticles(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const result = await this.userServices.getAllArticles(req.userId);
            if (result) {
                res.status(OK).json({ success: true, result: result });
            } else {
                res.status(BAD_REQUEST).json({ success: false });
            }
        } catch (error) {
            next(error);
        }
    }
    async likeArticle(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const result = await this.userServices.likeArticle(req.query.id as string, req.userId);
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(BAD_REQUEST).json({ success: false, message: "Something Went wrong" });
            }
        } catch (error) {
            next(error);
        }
    }
    async unlikeArticle(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const result = await this.userServices.unlikeArticle(req.query.id as string, req.userId);
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(BAD_REQUEST).json({ success: false, message: "Something Went wrong" });
            }
        } catch (error) {
            next(error);
        }
    }
    async blockArticle(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            
            const result = await this.userServices.blockArticle(req.query.id as string, req.userId);
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(BAD_REQUEST).json({ success: false, message: "Something Went wrong" });
            }
        } catch (error) {
            next(error);
        }
    }
    async getSingleArticle(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            console.log(req.params)
            const result = await this.userServices.getArticleDetails(req.params.id as string);
            if (result) {
                res.status(200).json({success:true,result:result});
            } else {
                res.status(BAD_REQUEST).json({ success: false, message: "Something Went wrong" });
            }
        } catch (error) {
            next(error);
        }
    }
}
