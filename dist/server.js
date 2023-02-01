"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = express_1.default();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server);
dotenv_1.default.config();
const port = process.env.PORT;
const mongodb_uri = process.env.MONGODB_URI;
if (mongodb_uri) {
    mongoose_1.default
        .connect(mongodb_uri)
        .then((res) => console.log("Connected to DB."))
        .catch((err) => {
        console.log("Couldn't connect to DB.");
        console.log(err.message);
    });
}
else {
    console.log("Couldn't find mongodb_uri");
}
io.on("connection", (socket) => __awaiter(void 0, void 0, void 0, function* () {
    socket.on("checkRoomId", (roomId) => {
        socket.join(roomId);
    });
    socket.on('sendMsg', (roomId, msg, username, userImg) => {
        io.to(roomId).emit('sendMessageToClient', msg, username, userImg);
    });
}));
app.use(express_1.default.json());
app.use(cookie_parser_1.default());
app.use(express_1.default.static("public"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
app.use("/users", userRoutes_1.default);
const friendRoutes_1 = __importDefault(require("./routes/friendRoutes"));
app.use("/friends", friendRoutes_1.default);
server.listen(port, () => {
    console.log(`Server is running http://localhost:${port}`);
});
