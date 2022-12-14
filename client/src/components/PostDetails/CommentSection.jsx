import React, { useState, useRef } from "react"
import { Typography, TextField, Button } from "@material-ui/core"
import { useDispatch } from "react-redux"
import useStyles from "./style"
import { commentPost } from "../../actions/posts";


const CommentSection = ({ post }) => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const [comments, setComments] = useState(post?.comments)
    const [comment, setComment] = useState("")
    const user = JSON.parse(localStorage.getItem("profile"))
    const commentsRef = useRef();
    async function handleClick() {
        const finalComment = `${user.userObject.name}: ${comment}`
        const newComments = await dispatch(commentPost(finalComment, post._id));
        setComments(newComments);
        setComment("");

        commentsRef.current.scrollIntoView({ behavior: 'smooth' });

    }

    return (
        <div className={classes.commentsOuterContainer}>
            <div className={classes.commentsInnerContainer}>
                <Typography gutterBottom variant="h6">Comments</Typography>
                {comments?.map((c, i) => (
                    <Typography key={i} gutterBottom variant="subtitle1">
                        <strong>{c.toString().split(': ')[0]}</strong>
                        {c.toString().split(':')[1]}
                    </Typography>
                ))}
                <div ref={commentsRef} />
            </div>
            {user?.userObject && (
                <div style={{ width: "70%" }}>
                    <Typography gutterBottom variant="h6">Write A Comment</Typography>
                    <TextField
                        fullWidth
                        rows={4}
                        variant="outlined"
                        label="Comment"
                        multiline
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <br />
                    <Button style={{ marginTop: "10px" }} fullWidth disabled={!comment} variant="contained" onClick={handleClick} color="primary">
                        Comment
                    </Button>

                </div>
            )}


        </div >
    )
}
export default CommentSection
