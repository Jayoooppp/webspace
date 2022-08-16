import * as api from "../api";
import { CREATE, UPDATE, FETCH_ALL, DELETE, COMMENT, LIKE, FETCH_BY_SEARCH, START_LOADING, END_LOADING, FETCH_BY_ID } from "../constants/actionTypes"

// Action Creators

export const getPosts = (page) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        const { data } = await api.fetchPosts(page);
        dispatch({ type: FETCH_ALL, payload: data })
        dispatch({ type: END_LOADING })

    } catch (error) {
        console.log(error);
    }


}


export const getPost = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        const { data } = await api.getPost(id);
        dispatch({ type: FETCH_BY_ID, payload: data })
        dispatch({ type: END_LOADING })

    } catch (error) {
        console.log(error);
    }
}
export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })

        const { data: { data } } = await api.fetchPostsBySearch(searchQuery);
        dispatch({ type: FETCH_BY_SEARCH, payload: data })
        dispatch({ type: END_LOADING })

    } catch (error) {
        console.log(error)
    }
}

export const newPost = (post, navigate) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })

        const { data } = await api.createPost(post);
        navigate(`/posts/${data._id}`)
        dispatch({ type: CREATE, payload: data })
        dispatch({ type: END_LOADING })

    } catch (error) {
        console.log(error);

    }
}

export const updatePost = (currentId, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(currentId, post);
        dispatch({ type: UPDATE, payload: data })
    } catch (error) {
        console.log(error);

    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        const response = await api.deletePost(id);
        dispatch({ type: DELETE, payload: id })
    } catch (error) {
        console.log(error)
    }
}

export const postLike = (id) => async (dispatch) => {
    try {

        const { data } = await api.postLike(id);

        dispatch({ type: LIKE, payload: data })
    } catch (error) {
        console.log(error);

    }
}

export const commentPost = (comment, id) => async (dispatch) => {
    try {

        const { data } = await api.commentPost(comment, id);
        dispatch({ type: COMMENT, payload: data })
        return data.comments;
    } catch (error) {
        console.log(error);

    }
}