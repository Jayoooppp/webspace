import React, { useState, useEffect } from 'react';
import useStyle from "./style";
import { Button, Typography, Paper, TextField } from "@material-ui/core";

import FileBase from "react-file-base64";
import { useDispatch } from 'react-redux';
import { newPost, updatePost, getPosts } from '../../actions/posts';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from "react-router-dom"


function useQuery() {
    return new URLSearchParams(useLocation().search);
}
const Form = ({ currentId, setCurrentId }) => {
    const post = useSelector((state) => currentId ? state.posts.posts.find((p) => p._id === currentId) : null);
    const dispatch = useDispatch();
    const classes = useStyle();
    const [postData, setData] = useState({ title: '', message: '', url: '', tags: '', selectedFile: '' });
    const user = JSON.parse(localStorage.getItem("profile"))
    const query = useQuery();
    const page = query.get("page") || 1;
    const navigate = useNavigate();





    useEffect(() => {
        if (post) {
            setData(post)
        }

    }, [post, dispatch, page]) //This is the dependency array which say that whenever there is any changes in items from the dependency array then this function will get executed

    function handleSubmit(e) {

        e.preventDefault();

        if (currentId) {
            dispatch(updatePost(currentId, { ...postData, name: user.userObject.name }))
            clear()

        } else {
            dispatch(newPost({ ...postData, name: user.userObject.name }, navigate))
            clear()
        }



    }

    function clear() {
        setCurrentId(null);
        setData({ title: '', message: '', url: '', tags: '', selectedFile: '' })

    }

    if (!user) {
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Please Sign In to create a post
                </Typography>
            </Paper>
        )
    }
    return (
        <Paper className={classes.paper} componenet="container" elevation={6}>
            <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId ? "Update" : "Create"} a Post</Typography>

                <TextField required name="title" variant="outlined" label="Title" fullWidth value={postData.title}
                    onChange={(e) => {
                        setData({ ...postData, title: e.target.value })
                    }} />
                <TextField required name="message" variant="outlined" label="Message" fullWidth multiline minRows={4} value={postData.message}
                    onChange={(e) => {
                        setData({ ...postData, message: e.target.value })
                    }} />
                <TextField required name="url" variant="outlined" label="url" fullWidth value={postData.url}
                    onChange={(e) => {
                        setData({ ...postData, url: e.target.value })
                    }} />
                <TextField required name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags}
                    onChange={(e) => {
                        setData({ ...postData, tags: e.target.value.split(',') })
                    }} />

                <div className={classes.fileInput}>
                    <FileBase
                        required
                        type="file"
                        multiple={false}
                        onDone={({ base64 }) => setData({ ...postData, selectedFile: base64 })} />
                </div>

                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>{currentId ? "Update" : " Submit"}</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>



            </form >

        </Paper >

    )
}

export default Form