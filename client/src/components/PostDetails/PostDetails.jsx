import React, { useEffect } from 'react';
import { Paper, Typography, CircularProgress, Divider, Link } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment"
import { useParams, useNavigate } from "react-router-dom"
import { getPost, getPostsBySearch } from "../../actions/posts";
import CommentSection from "./CommentSection"

import useStyles from "./style";
const PostDetails = () => {
    const { post, posts, isLoading } = useSelector((state) => state.posts)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const classes = useStyles();
    const { id } = useParams();
    useEffect(() => {
        dispatch(getPost(id))
    }, [id])

    // useEffect for the recommendation
    useEffect(() => {
        if (post) {
            dispatch(getPostsBySearch({ search: "none", tags: post?.tags.join(",") }))
        }
    }, [post])


    if (!post) {
        return null;
    }
    if (isLoading) {
        return (
            <Paper className={classes.loadingPaper}>
                <CircularProgress size="7rem" />
            </Paper >
        )
    }
    function openPost(_id) {
        navigate(`/posts/${_id}`);
    }

    const recommendedPosts = posts.filter(({ _id }) => _id !== post._id)
    return (
        <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
            <div className={classes.card}>
                <div className={classes.section}>
                    <Typography variant="h3" component="h2">{post.title}</Typography>
                    <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => (
                        <Link to={`/tags/${tag}`} style={{ textDecoration: 'none', color: '#3f51b5' }}>
                            {` #${tag} `}
                        </Link>
                    ))}
                    </Typography>
                    <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>

                    <Typography gutterBottom variant="body1" component="p">Link : <Link href={post.url} underline="always" variant="body2">
                        {post.url}
                    </Link></Typography>
                    <Typography variant="h6">
                        Created by:
                        <Link to={`/creators/${post.name}`} style={{ textDecoration: 'none', color: '#3f51b5' }}>
                            {` ${post.name}`}
                        </Link>
                    </Typography>
                    &nbsp;

                    <Typography variant="body1">{moment(post.creationTime).fromNow()}</Typography>
                    <Divider style={{ margin: '20px 0' }} />
                    <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
                    <Divider style={{ margin: '20px 0' }} />
                    <CommentSection post={post} />
                    <Divider style={{ margin: '20px 0' }} />
                </div>
                <div className={classes.imageSection}>
                    <img className={classes.media} src={post.selectedFile || "https://media.sproutsocial.com/uploads/2022/04/Best-times-to-post-2022_BTTP-Social-Media.jpg"} alt={post.title} />
                </div>
            </div>
            {recommendedPosts && (
                <div className={classes.section}>
                    <Typography gutterBottom variant="h5">
                        You might also like:
                    </Typography>
                    <Divider />
                    <div className={classes.recommendedPosts}>
                        {recommendedPosts.map(({ title, message, likes, url, selectedFile, _id, name }) => (
                            <div style={{ margin: "20px", cursor: "pointer" }} onClick={() => openPost(_id)} key={_id}>
                                <Typography gutterBottom variant="h6">{title}</Typography>
                                <Typography gutterBottom variant="subtitle2">{name}</Typography>
                                <Typography gutterBottom variant="subtitle2">{message}</Typography>
                                <Typography gutterBottom variant="subtitle2">Link : <Link to={url} style={{ textDecoration: 'none', color: '#3f51b5' }}>
                                    {url}
                                </Link></Typography>
                                <Typography gutterBottom variant="subtitle1">Likes: {likes.length}</Typography>
                                <img src={selectedFile || "https://media.sproutsocial.com/uploads/2022/04/Best-times-to-post-2022_BTTP-Social-Media.jpg"} width="200px" alt="logoimage" />
                            </div>
                        ))}
                    </div>


                </div>
            )}
        </Paper>
        // Login for recommended posts
    )
}

export default PostDetails