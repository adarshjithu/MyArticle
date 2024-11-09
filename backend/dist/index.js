"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./Config/db"));
dotenv_1.default.config();
(0, db_1.default)();
app_1.default.listen(process.env.PORT || 3000, () => {
    console.log("Server started successfully");
});
