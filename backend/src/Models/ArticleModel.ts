import mongoose, { mongo } from "mongoose";

const articleSchema = new mongoose.Schema({
    userId:{type:mongoose.Types.ObjectId,ref:'User'},
    title: String,
    images: { type: Array, default: [] },
    description: String,
    tags: { type: Array, default: [] },
    category: String,
    likes:[{type:mongoose.Types.ObjectId,ref:'User'}],
    unlikes:[{type:mongoose.Types.ObjectId,ref:'User'}],
    blocks:[{type:mongoose.Types.ObjectId,ref:'User'}]
},{timestamps:true});


const Article = mongoose.model('Article',articleSchema);
export default Article