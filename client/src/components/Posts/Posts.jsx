import React from 'react'
import Post from './Post/Post'
import useStyle from "./style";
import { Grid, CircularProgress } from "@material-ui/core";
import { useSelector } from 'react-redux';



const Posts = ({ setCurrentId }) => {
    const { posts, isLoading } = useSelector((state) => state.posts)
    const classes = useStyle();
    console.log("This are the posts reqtrived from the database ", posts)
    if (!posts.length && !isLoading) {
        return "No Posts are present"
    }
    return (
        isLoading ? <CircularProgress /> : (
            <Grid className={classes.mainContainer} container aligneitems="stretch" spacing={3}>
                {posts.map((post) => (
                    <Grid key={post._id} item xs={12} sm={12} md={6} lg={4}>
                        <Post post={post} setCurrentId={setCurrentId} />

                    </Grid>
                ))}

            </Grid>
        )
    )
}

export default Posts