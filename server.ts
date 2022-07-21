import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import http from 'http';
import { Server } from 'socket.io';

const app : express.Application = express();
const server = http.createServer(app);
const io = new Server (server)

dotenv.config();
const port : string = process.env.PORT;
const mongodb_uri : string = process.env.MONGODB_URI;

if(mongodb_uri) {
    mongoose
        .connect(mongodb_uri)
        .then(() => console.log("Connected to DB."))
        .catch(() => console.log("Couldn't connect to DB."));
} else {
    console.log("Couldn't find mongodb_uri");
}

let counter : number = 1;

io.on("connection", (socket) => {
    console.log(`user_${counter} connected`);
    counter++;
    socket.on("disconnect", () => {
        counter--;
        console.log(`user_${counter} disconnected`);
    });
})

app.use(express.json());
app.use(express.static("public"));

server.listen(port, () => {
    console.log(`Server is running http://localhost:${port}`);
})