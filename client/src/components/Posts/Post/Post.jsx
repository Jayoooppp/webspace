import React, { useState } from 'react';
import useStyle from "./style.js";
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Link } from "@material-ui/core"
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined"
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deletePost, postLike, getPosts } from '../../../actions/posts.js';
import { useNavigate, useLocation } from "react-router-dom"


function useQuery() {
    return new URLSearchParams(useLocation().search);
}


const Post = ({ post, setCurrentId }) => {
    const navigate = useNavigate();
    const classes = useStyle();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem("profile"))
    const query = useQuery();
    const page = query.get("page") || 1;
    const [likes, setLikes] = useState(post?.likes)
    const userId = user?.userObject.sub || user?.userObject?._id;

    const checkLike = post.likes.find((like) => like === userId);

    async function handleLike() {
        dispatch(postLike(post._id))
        if (checkLike) {
            setLikes(post.likes.filter((id) => id !== userId))
        } else {
            setLikes([...post.likes, userId])

        }

    }


    const Likes = () => {
        if (user) {
            if (likes.length > 0) {
                return likes.find((like) => like === userId)
                    ? (
                        <><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}`}</>
                    ) : (
                        <><ThumbUpAltOutlined fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
                    );
            }
        }

        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
    };

    function openPost() {
        navigate(`/posts/${post._id}`)

    }

    return (
        <Card className={classes.card} raised elevation={6}>

            <CardMedia className={classes.media} image={post.selectedFile || "https://media.sproutsocial.com/uploads/2022/04/Best-times-to-post-2022_BTTP-Social-Media.jpg"} title={post.title} />
            <div className={classes.overlay}>
                <Typography variant="h6">{post.name}</Typography>
                <Typography variant="body2">{moment(post.creationTime).fromNow()}</Typography>

            </div>
            <div className={classes.overlay2}>
                {(user?.userObject.sub === post.creator || user?.userObject._id === post.creator) && (
                    <Button style={{ color: 'white' }}
                        size="small"
                        onClick={() => {
                            setCurrentId(post._id);
                        }} >
                        <MoreHorizIcon fontSize="medium" />
                    </Button>
                )}

            </div>
            <div
                className="postButton"
                component="span"
                name="test"
                onClick={openPost}
                style={{ cursor: "pointer" }}
            >
                <div className={classes.details}>
                    <Typography variant="body2" color="textSecondary">{post.tags.map((tag) => `#${tag} `)}</Typography>
                </div>
                <Typography className={classes.title} variant="h5" gutterBottom>{post.title}</Typography>

                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
                    <Link href={post.url} underline="always" variant="body2">
                        {post.url}
                    </Link>

                </CardContent>
            </div>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" onClick={handleLike} disabled={!user}>

                    <Likes />
                </Button>
                {(user?.userObject.sub === post.creator || user?.userObject._id === post.creator) && (
                    <Button size="small" color="primary" onClick={() => {
                        dispatch(deletePost(post._id))
                        dispatch(getPosts(page))
                    }}>
                        <DeleteIcon fontSize="small" />
                        Delete
                    </Button>
                )}


            </CardActions>




        </Card>
    )
}

export default Post