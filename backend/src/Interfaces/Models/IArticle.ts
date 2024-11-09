import { ObjectId } from "mongoose";

export interface IArticle{
    userId:string;
    title:string;
    description:string;
    images:string[]
    _id?:ObjectId
    tags:string[];
    category:string;
    likes?:string[];
    blocks?:string[],
    unlikes?:string[]
}