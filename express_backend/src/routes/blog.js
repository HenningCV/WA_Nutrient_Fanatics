import { Router } from 'express';
import {BlogPost} from "../models/blogPost.js";

const router = Router();

router.get('/', async (req, res) => {
    const blogPosts = await BlogPost.find({});

    return res.status(200).json({
        blogPosts: blogPosts
    })
})

export { router };