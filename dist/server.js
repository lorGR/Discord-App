"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const app = express_1.default();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server);
dotenv_1.default.config();
const port = process.env.PORT;
const mongodb_uri = process.env.MONGODB_URI;
if (mongodb_uri) {
    mongoose_1.default
        .connect(mongodb_uri)
        .then(() => console.log("Connected to DB."))
        .catch(() => console.log("Couldn't connect to DB."));
}
else {
    console.log("Couldn't find mongodb_uri");
}
let counter = 1;
io.on("connection", (socket) => {
    console.log(`user_${counter} connected`);
    counter++;
    socket.on("disconnect", () => {
        counter--;
        console.log(`user_${counter} disconnected`);
    });
});
app.use(express_1.default.json());
app.use(express_1.default.static("public"));
server.listen(port, () => {
    console.log(`Server is running http://localhost:${port}`);
});
