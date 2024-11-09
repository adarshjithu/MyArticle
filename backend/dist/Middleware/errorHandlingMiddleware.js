"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
function errorHandler(err, req, res, next) {
    res.status(res.statusCode || 500).json({ message: err.message || "Internal Server Error" });
}
