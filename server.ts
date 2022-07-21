import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app : express.Application = express();
const port : string = process.env.PORT;
const mongodb_uri : string = process.env.MONGODB_URI;

console.log(`Lior's branch`);

if(mongodb_uri) {
    mongoose
        .connect(mongodb_uri)
        .then(() => console.log("Connected to DB."))
        .catch(() => console.log("Couldn't connect to DB."));
} else {
    console.log("Couldn't find mongodb_uri");
}

app.use(express.json());
app.use(express.static("public"));

app.listen(port, () => {
    console.log(`Server is running http://localhost:${port}`);
})