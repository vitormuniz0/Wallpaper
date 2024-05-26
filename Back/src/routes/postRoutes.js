import express from 'express';
import {PostController} from '../controllers/postController.js';
import upload from '../config/multer.js'

const postController = new PostController();

const router = express.Router();

//buscar posts
router.get("/posts", async (req, res) => {
    const posts = await postController.getAllPost(req, res);
    res.status(201).json(posts);
})

//criar post
router.post("/criarPost", upload.single("src"), async (req, res) => {
    const newPost = await postController.createPost(req, res);
    res.status(201).json();
})

router.delete("/removePost" , async (req , res) =>{
    const remove = await postController.removePost(req , res);
    res.status(201).json(remove);
})

export default router;
