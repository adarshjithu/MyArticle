"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const articleSchema = new mongoose_1.default.Schema({
    userId: { type: mongoose_1.default.Types.ObjectId, ref: 'User' },
    title: String,
    images: { type: Array, default: [] },
    description: String,
    tags: { type: Array, default: [] },
    category: String,
    likes: [{ type: mongoose_1.default.Types.ObjectId, ref: 'User' }],
    unlikes: [{ type: mongoose_1.default.Types.ObjectId, ref: 'User' }],
    blocks: [{ type: mongoose_1.default.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });
const Article = mongoose_1.default.model('Article', articleSchema);
exports.default = Article;
