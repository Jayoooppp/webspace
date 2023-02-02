import React from 'react'
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from "@material-ui/core"
import useStyles from "./style";
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import ChipInput from "material-ui-chip-input"
import { getPostsBySearch } from '../../actions/posts';
import { useState } from "react";
import Paginate from '../Pagination/Pagination';



function useQuery() {
    return new URLSearchParams(useLocation().search);
}
const Home = () => {
    const classes = useStyles();
    const [currId, setCurrId] = useState(null);
    const dispatch = useDispatch();

    const query = useQuery();
    const navigate = useNavigate();
    const page = query.get("page") || 1;
    const searchQuery = query.get("searchQuery");
    const [search, setSearch] = useState("");
    const [tags, setTags] = useState([]);


    function searchPost() {
        if (search.trim() || tags) {
            dispatch(getPostsBySearch({ search, tags: tags.join(",") }))
            navigate(`/posts/search?searchQuery=${search || "none"}&tags=${tags}`)
        } else {
            navigate("/");
        }
    }

    function handleKeyPress(e) {
        if (e.keyCode === 13) {
            searchPost();
        }
    }
    const handleAdd = (tag) => setTags([...tags, tag])
    const handleDelete = (tagtoDelete) => setTags(tags.filter((tag) => tag !== tagtoDelete))




    return (
        <Grow in>
            <Container maxWidth="xl">
                <Grid container justifyContent="space-between" spacing={3} className={classes.gridContainer}>
                    <Grid item xs={9} sm={6} md={9}>
                        <Posts setCurrentId={setCurrId} />
                    </Grid>
                    <Grid item xs={15} sm={6} md={3}>
                        <AppBar className={classes.appBarSearch} position="static" color="inherit">
                            <TextField
                                name="search"
                                variant="outlined"
                                label="Search WebPost"
                                fullWidth
                                onKeyPress={handleKeyPress}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <ChipInput
                                style={{ margin: "10px 0" }}
                                value={tags}
                                onAdd={handleAdd}
                                onDelete={handleDelete}
                                label="Search Tags"
                                variant="outlined"
                            />
                            <Button onClick={searchPost} variant="contained" className={classes.searchButton} color="primary">Search</Button>
                        </AppBar>
                        <Form currentId={currId} setCurrentId={setCurrId} />
                        {(!searchQuery && !tags.length) && (
                            <Paper elevation={6} className={classes.pagination}>
                                <Paginate page={page} />
                            </Paper>
                        )}

                    </Grid>
                </Grid>
            </Container >
        </Grow >
    )
}

export default Home