import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";
import express from "express";
import parser from "body-parser";
import mongoose from "mongoose";
import cors from "cors"
import dotenv from "dotenv"
import path from "path"

dotenv.config();

const __dirname = path.resolve();



const app = express()
app.use(express.json({ limit: '50mb' }));

app.use(cors())

// This makes the prefix URL as localhost:8080/posts
app.use("/posts", postRoutes);
app.use("/users", userRoutes);



app.use(parser.json({ limit: "30mb", extended: true }))
app.use(parser.urlencoded({ limit: "30mb", extended: true }))

//Requests targetting all the notes
app.use(express.static(path.resolve(__dirname, "./client/build")));
// Step 2:
app.get("/", function (request, response) {
    response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});


const PORT = process.env.PORT || 8080;

mongoose.connect(process.env.MONGO + "/Webspace")
    .then(() => {
        app.listen(PORT, function () {
            console.log("Server started at ", PORT);
        })
    })
    .catch((error) => {
        console.log(error);
    })



