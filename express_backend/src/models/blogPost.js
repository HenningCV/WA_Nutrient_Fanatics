import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId

const BlogPostSchema = new Schema({
    author: ObjectId,
    title: String,
    body: String,
    date: Date
});

export const BlogPost = mongoose.model('Blogpost', BlogPostSchema);