import express from "express";
import { getPostsBySearch, getPosts, createPost, updatePost, deletePost, postLike, getPost, commentPost } from "../controllers/posts.js";
import auth from "../middleware/auth.js"
const routes = express.Router();

routes.get("/", getPosts);
routes.get("/search", getPostsBySearch);
routes.post("/", auth, createPost);
routes.patch("/:id", auth, updatePost)
routes.delete("/:id", auth, deletePost)
routes.patch("/:id/postLike", auth, postLike);
routes.patch("/:id/commentPost", auth, commentPost);
routes.get("/:id", getPost)


export default routes