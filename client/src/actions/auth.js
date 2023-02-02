import * as api from "../api";
import { AUTH } from "../constants/actionTypes";
export const signin = (formData, navigate) => async (dispatch) => {

    try {
        // Login the user using the API call
        const { data } = await api.signIn(formData);

        dispatch({ type: AUTH, data })

        navigate("/");
    } catch (error) {
        alert(error.response.data.message)

    }
}
export const signup = (formData, navigate) => async (dispatch) => {

    try {
        // Signup the user using the API call

        const { data } = await api.signUp(formData);
        dispatch({ type: AUTH, data })

        navigate("/");
    } catch (error) {
        alert(error.response.data.message)
    }
}

