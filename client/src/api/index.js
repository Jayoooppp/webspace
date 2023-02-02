import axios from "axios";
// import jwt from "jsonwebtoken"
import Url from "./url";
const API = axios.create({ baseURL: Url })


API.interceptors.request.use((req) => {
    if (localStorage.getItem("profile")) {
        req.headers.authentication = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`;

    }
    return req;
})


export const getPost = (id) => {
    return API.get(`/posts/${id}`)
}

export const fetchPosts = (page) => {
    return API.get(`/posts?page=${page}`);
}
export const fetchPostsBySearch = (searchQuery) => {
    return API.get(`/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${searchQuery.tags}`)
}

export const createPost = (newPost) => {
    return API.post("/posts", newPost)
}

export const updatePost = (id, updatedPost) => {
    return API.patch(`/posts/${id}`, updatedPost);
}

export const deletePost = (id) => {
    return API.delete(`/posts/${id}`);
}

export const postLike = (id) => {
    return API.patch(`/posts/${id}/postLike`);

}

export const commentPost = (comment, id) => {
    return API.patch(`/posts/${id}/commentPost`, { comment });

}

export const signIn = (FormData) => {
    return API.post("/users/signin", FormData);
}

export const signUp = (FormData) => {
    return API.post("/users/signup", FormData);
}