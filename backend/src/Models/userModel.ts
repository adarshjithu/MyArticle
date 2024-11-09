import mongoose, { Document, Schema } from "mongoose";


export interface IUser extends Document {
    firstname: string; 
    lastname: string;    
    email: string;       
    phonenumber: number;
    password: string;    
    dateofbirth: string; 
    interests: string[]; 
   
}

// User schema
const userSchema: Schema<IUser> = new mongoose.Schema(
    {
        firstname: { type: String },
        lastname: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        phonenumber: { type: Number }, 
        dateofbirth: { type: String }, 
        password: { type: String, required: true },
        interests: { type: [String], default: [] }, 
    },
    { timestamps: true } 
);

// User model
const User = mongoose.model<IUser>("User", userSchema);

export default User;
