"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const token_1 = require("../Utils/token");
const authenticate = (req, res, next) => {
    const { access_token, refresh_token } = req.cookies;
    if (!refresh_token) {
        res.status(404).json({ success: false, message: "Refresh Token Expired" });
    }
    else {
        const refreshTokenValid = (0, token_1.verifyRefreshToken)(refresh_token);
        if (refreshTokenValid) {
            req.userId = refreshTokenValid.data;
            next();
        }
        else {
            res.status(404).json({ success: false, message: "Refresh Token Expired" });
        }
    }
};
exports.authenticate = authenticate;
