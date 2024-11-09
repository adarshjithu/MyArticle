"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// User schema
const userSchema = new mongoose_1.default.Schema({
    firstname: { type: String },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phonenumber: { type: Number },
    dateofbirth: { type: String },
    password: { type: String, required: true },
    interests: { type: [String], default: [] },
}, { timestamps: true });
// User model
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
