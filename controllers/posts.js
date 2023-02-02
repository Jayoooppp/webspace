import postModel from "../models/postModel.js";
import mongoose from "mongoose"

export const getPosts = async (req, res) => {
    const { page } = req.query;
    try {
        const LIMIT = 6;
        const startIndex = (Number(page) - 1) * LIMIT; //Get starting index of every page
        const total = await postModel.countDocuments({});
        const posts = await postModel.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);
        console.log(Math.ceil(total / LIMIT));
        res.status(200).json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) });

    } catch (error) {

        res.status(404).json({ message: error.message })
    }
};

export const getPostsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query;

    try {
        const title = new RegExp(searchQuery, "i"); //i stands for ignore the case test , Test , TEST all will same

        const posts = await postModel.find({ $or: [{ title }, { tags: { $in: tags.split(",") } }] })

        res.json({ data: posts })
    } catch (error) {
        res.status(404).json({ message: error.message })

    }
}



export const createPost = async (req, res) => {
    const post = req.body;

    const newPost = new postModel({ ...post, creator: req.userId, creationTime: new Date().toISOString() })
    try {

        await newPost.save();
        res.status(203).json(newPost)

    } catch (error) {
        res.status(402).json({ message: error.message })

    }
}

export const getPost = async (req, res) => {
    const id = req.params.id;
    try {
        const post = await postModel.findById(id);
        res.json(post)

    } catch (error) {
        res.status(403).json({ message: error.message })

    }

}
export const updatePost = async (req, res) => {
    const id = req.params.id;
    const { title, message, creator, url, selectedFile, tags } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    const updatedPost = { creator, title, message, tags, selectedFile, url, _id: id };
    const newPost = await postModel.findByIdAndUpdate(id, updatedPost, { new: true });

    res.status(208).json(newPost);

}


export const deletePost = async (req, res) => {

    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    await postModel.findByIdAndRemove(id);
    res.status(208).json({ message: "Post deteted" });


}


export const postLike = async (req, res) => {

    const { id } = req.params;
    if (!req.userId) { return res.status(412).json({ message: "Unauthenticated" }) }

    if (!mongoose.Types.ObjectId.isValid(id)) { return res.status(404).send(`No post with id: ${id}`); }
    const post = await postModel.findById(id);

    const index = post.likes.findIndex((fid) => {
        return String(fid) === String(req.userId)
    })
    if (index === -1) {
        // Like a post 
        post.likes.push(req.userId);
    } else {
        // dislike a post
        post.likes = post.likes.filter((id) => {
            return id !== String(req.userId)
        })
    }

    const updatedPost = await postModel.findByIdAndUpdate(id, post, { new: true })


    res.status(200).json(updatedPost);
}

export const commentPost = async (req, res) => {
    const id = req.params.id;
    const comment = req.body.comment;
    const post = await postModel.findById(id);
    post.comments.push(comment)
    const updatedPost = await postModel.findByIdAndUpdate(id, post, { new: true })
    res.json(updatedPost)
}

