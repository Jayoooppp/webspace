import mongoose from "mongoose";
import 'mongoose-type-url';


const postSchema = mongoose.Schema({
    title: String,
    message: String,
    name: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    url: mongoose.SchemaTypes.Url,
    comments: {
        type: [String],
        default: [],
    },
    likes: {
        type: [String],
        default: [],
    },
    creationTime: {
        type: Date,
        default: new Date().toLocaleString("en-Us", { timeZone: 'Asia/Kolkata' }),
    }
})

const postModel = mongoose.model("posts", postSchema);

export default postModel;