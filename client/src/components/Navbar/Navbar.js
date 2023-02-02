import React, { useState, useEffect } from 'react'
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import useStyles from "./style";
import logo from "../../images/logo.png"
import text from "../../images/text.png"
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import decode from "jwt-decode"

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    function handleLogout() {
        dispatch({ type: "LOGOUT" })
        navigate("/");
        setUser(null);


    }
    const auth = localStorage.getItem("authMethod")


    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")))


    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = decode(token)

            if (decodedToken.exp * 1000 < new Date().getTime()) {
                handleLogout();
            }

        }

        setUser(JSON.parse(localStorage.getItem("profile")));
    }, [location])



    if (auth === "google") {
        return (
            <AppBar className={classes.appBar} position="static" color="inherit" >
                <Link to="/" className={classes.brandContainer}>
                    <img src={text} alt="icon" height="60px" />
                    <img className={classes.image} src={logo} alt="logo" height="60px" />
                </Link>
                <Toolbar className={classes.toolbar}>
                    {user ? (
                        <div className={classes.profile}>
                            <Avatar className={classes.purple} alt={user.userObject.given_name} src={user?.userObject.picture}>{user?.userObject.given_name.charAt(0)}</Avatar>
                            <Typography className={classes.userName} variant="h6">{user?.userObject.given_name} {user?.userObject.family_name}</Typography>
                            <Button variant="contained" className={classes.logout} color="secondary" onClick={handleLogout}>Logout</Button>
                        </div>

                    ) : (
                        <Button component={Link} to="/auth" variant="contained" color="primary"> SignUp </Button>

                    )}


                </Toolbar>

            </ AppBar>


        )
    } else {
        return (
            <AppBar className={classes.appBar} position="static" color="inherit" >
                <Link to="/" className={classes.brandContainer}>
                    <img src={text} alt="icon" height="60px" />
                    <img className={classes.image} src={logo} alt="logo" height="60px" />
                </Link>
                <Toolbar className={classes.toolbar}>
                    {user ? (
                        <div className={classes.profile}>
                            <Avatar className={classes.purple} alt={user?.userObject.firstName} src={user?.userObject.photo}>{user?.userObject.name.charAt(0)}</Avatar>
                            <Typography className={classes.userName} variant="h6">{user?.userObject.name}</Typography>
                            <Button variant="contained" className={classes.logout} color="secondary" onClick={handleLogout}>Logout</Button>
                        </div>

                    ) : (
                        <Button component={Link} to="/auth" variant="contained" color="primary"> SignUp </Button>

                    )}


                </Toolbar>

            </ AppBar>
        )
    }
}

export default Navbar