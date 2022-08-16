import React, { useState, useEffect } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import useStyle from "./style";
import Input from './Input';
import Icon from "./Icon";
import jwt_decode from "jwt-decode"
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signin, signup } from "../../actions/auth"
const Auth = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);

    const classes = useStyle();
    const [isSignup, changeIsSignup] = useState(false);
    const initialState = { firstName: "", lastName: "", email: "", password: "", confirmPassword: "" }
    const [formData, setFormData] = useState(initialState);

    function handleSubmit(e) {
        e.preventDefault();
        localStorage.setItem("authMethod", "local")

        if (isSignup) {
            dispatch(signup(formData, navigate))
        } else {
            dispatch(signin(formData, navigate))

        }

    }

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    function switchMode() {
        changeIsSignup((prev) => {
            return (!prev)
        })
    }

    function handleShowPassword() {
        setShowPassword((showPassword) => {
            return (!showPassword);
        })
    }

    async function googleSuccess(res) {
        var userObject = jwt_decode(res.credential);
        var token = res.credential;
        try {
            dispatch({ type: "AUTH", data: { userObject, token: token } })
            localStorage.setItem("authMethod", "google")
            navigate("/");
        } catch (error) {
            console.log(error);
        }

    }
    function googleFailure(error) {
        console.log(error);
        console.log("Google Sign In was unsuccessful. Please try again later");
    }

    return (

        <Container className="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">{isSignup ? "Sign Up" : "Sign In"}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignup && (
                            <>
                                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                            </>
                        )}
                        <Input name="email" label="Email" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />

                        {isSignup && <Input name="confirmPassword" label="Re-type Password" handleChange={handleChange} type="password" />}
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {isSignup ? "Sign Up" : "Sign In"}
                    </Button>
                    <GoogleLogin

                        onSuccess={googleSuccess}
                        onError={googleFailure}
                    />


                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignup ? "Already Have An Account? Sign In" : "Don't Have an Account? Sign Up"}
                            </Button>
                        </Grid>

                    </Grid>


                </form>


            </Paper>
        </Container >
    )
}

export default Auth