import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config();
import userModel from "../models/userModel.js";

export const signIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userObject = await userModel.findOne({ email });
        if (!userObject) {
            return res.status(408).json({ message: "User don't exist" })
        }

        const isPasswordCorrect = await bcrypt.compare(password, userObject.password);

        if (!isPasswordCorrect) {
            return res.status(402).json({ message: "Password is incorrect" })
        }
        const token = jwt.sign({ email: userObject.email, id: userObject._id }, process.env.SECRET, { expiresIn: "1h" })
        return res.status(200).json({ userObject, token })


    } catch (error) {
        return res.status(410).json({ message: "Something went wrong" })

    }
}


export const signUp = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body;
    try {
        const userExist = await userModel.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "User Already Exist" });
        }
        if (password !== confirmPassword) {
            return res.status(403).json({ message: "Password is incorrect" })
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const userObject = new userModel({ email, password: hashedPassword, name: `${firstName} ${lastName}` })
        await userObject.save();
        const token = jwt.sign({ email: userObject.email, id: userObject._id }, process.env.SECRET, { expiresIn: "1h" });
        return res.status(200).json({ userObject, token })

    } catch (error) {
        return res.status(421).json({ message: "Something went wrong" })
    }
}