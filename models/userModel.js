import mongoose from "mongoose";
const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, requried: true },
    password: { type: String, required: true },
    id: { type: String }
})
const userModel = mongoose.model("user", userSchema);

export default userModel;