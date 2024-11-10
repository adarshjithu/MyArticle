"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const userRoutes_1 = __importDefault(require("./Routes/userRoutes"));
const errorHandlingMiddleware_1 = require("./Middleware/errorHandlingMiddleware");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: ["http://localhost:5173", "https://my-article-eosin.vercel.app"],
    methods: ["PUT", "PATCH", "GET", "POST", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
}));
app.use('/', userRoutes_1.default);
app.use(errorHandlingMiddleware_1.errorHandler);
exports.default = app;
