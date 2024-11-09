import express, { Application } from "express";
import cors from "cors";
import cookieParser from 'cookie-parser'
import userRouter from "./Routes/userRoutes";
import { errorHandler } from "./Middleware/errorHandlingMiddleware";
const app: Application = express();
app.use(express.json());
app.use(cookieParser())
app.use(
    cors({
        origin: ["http://localhost:5173"],
        methods: ["PUT", "PATCH", "GET", "POST", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    })
);

app.use('/',userRouter)
app.use(errorHandler)

export default app;
