import express from 'express';
import {PostController} from '../controllers/postController'

const postController = new PostController();

const router = express.Router();

//buscar posts
router.get("/posts", (req, res) => {
    const posts = postController.getAllPost(req, res);
    res.status(201).json(posts);
})

//criar post
router.post("/criarPost", (req, res) => {
    const newPost = postController.createPost(req, res);
    res.status(201).json(newPost);
})

export default router;
