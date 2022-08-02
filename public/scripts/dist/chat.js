var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
//@ts-ignore
var socket = io();
var number = 4;
function getRoomIdByParams() {
    try {
        var queryString = window.location.search;
        var urlSearchParams = new URLSearchParams(queryString);
        var roomId = urlSearchParams.get('roomId');
        return roomId;
    }
    catch (error) {
        console.error(error);
    }
}
socket.on("connect", function () {
    var roomId = getRoomIdByParams();
    socket.emit('checkRoomId', roomId);
});
function handleSendMessage(event) {
    try {
        event.preventDefault();
        var userInput = document.getElementById('userMessage');
        var username = sessionStorage.getItem('name');
        var userImg = sessionStorage.getItem('userSrc');
        var roomId = getRoomIdByParams();
        var text = event.target.msg.value;
        socket.emit('sendMsg', roomId, text, username, userImg);
        userInput.value = '';
    }
    catch (error) {
        console.error(error);
    }
}
var chatContainer = document.getElementById('chatContainer');
socket.on('sendMessageToClient', function (msg, username, userImg) {
    var newMsgDiv = document.createElement('div');
    var msgDivContent = document.createElement('div');
    var userUsername = document.createElement('h3');
    var userMessage = document.createElement('p');
    var userImage = document.createElement('img');
    newMsgDiv.classList.add('chat-msg');
    msgDivContent.classList.add('chat-content');
    userImage.src = "" + userImg;
    userUsername.innerText = "" + username;
    userMessage.innerText = "" + msg;
    msgDivContent.append(userUsername, userMessage);
    newMsgDiv.append(userImage, msgDivContent);
    chatContainer.append(newMsgDiv);
});
function getUserFriend() {
    return __awaiter(this, void 0, void 0, function () {
        var userDB, roomId, data, friend, error, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, handleGetUser()];
                case 1:
                    userDB = _a.sent();
                    if (!userDB)
                        throw new Error("Couldn't reiceve user by handleGetUser() -> Cookies");
                    roomId = getRoomIdByParams();
                    if (!roomId)
                        throw new Error("Couldn't reiceve user by getRoomIdByParams() -> URLParams");
                    return [4 /*yield*/, axios.post("/friends/get-friendByRoomId", { userDB: userDB, roomId: roomId })];
                case 2:
                    data = (_a.sent()).data;
                    if (!data)
                        throw new Error("Couldn't recieve data from axios POST: '/friends/get-friendByRoomId' ");
                    friend = data.friend, error = data.error;
                    if (error)
                        throw error;
                    if (!friend)
                        throw new Error("Couldn't recieve friend from data");
                    renderFriend(friend);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error(error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function renderFriend(friend) {
    try {
        var friendImg = document.getElementById('chatUserImg');
        var friendUsername = document.getElementById('chatUsername');
        friendImg.src = friend.src;
        friendUsername.innerText = friend.username;
    }
    catch (error) {
        console.error(error);
    }
}
