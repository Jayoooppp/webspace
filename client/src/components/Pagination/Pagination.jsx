import React, { useEffect } from "react"
import { Pagination, PaginationItem } from "@material-ui/lab"
import useStyles from "./style";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { getPosts } from "../../actions/posts";

const Paginate = ({ page }) => {
    const { numberOfPages } = useSelector((state) => state.posts);
    const dispatch = useDispatch();
    useEffect(() => {
        if (page) {
            dispatch(getPosts(page))
        }
    }, [dispatch, page])
    const classes = useStyles();
    return (
        <Pagination
            classes={{ ul: classes.ul }}
            count={numberOfPages}
            page={Number(page) || 1}
            variant="outlined"
            color="primary"
            renderItem={(items) => (
                <PaginationItem {...items} component={Link} to={`/posts?page=${items.page}`} />
            )}
        />
    );

};

export default Paginate