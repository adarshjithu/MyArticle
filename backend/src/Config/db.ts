import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_CONNECTION_STRING}`);
        console.log("Database Connected Successfully");
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log(error.message);
        } else {
            console.log("An unknown error occured");
        }
    }
};

export default connectDb;
