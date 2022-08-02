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
var friendListContainer = document.getElementById("friendListContainer");
function handleHomePage() {
    try {
        window.location.href = "./home.html";
    }
    catch (error) {
        console.error(error);
    }
}
function handleAddFriendPage() {
    try {
        window.location.href = "./add-friend.html";
    }
    catch (error) {
        console.error(error);
    }
}
function handleSettingPage() {
    try {
        window.location.href = "./user-setting.html";
    }
    catch (error) {
        console.error(error);
    }
}
function handleLoad() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            try {
                handleGetUser();
                getAllFriends();
                renderUserSettings();
            }
            catch (error) {
                console.error(error);
            }
            return [2 /*return*/];
        });
    });
}
function handleGetUser() {
    return __awaiter(this, void 0, void 0, function () {
        var data, userDB, error, username, greetUser, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios.get("/users/get-user")];
                case 1:
                    data = (_a.sent()).data;
                    if (!data)
                        throw new Error("Couldn't recieve data from axios GET: '/users/get-user' ");
                    userDB = data.userDB, error = data.error;
                    if (error)
                        throw error;
                    username = document.getElementById("usernameBox");
                    username.innerHTML = userDB.username;
                    greetUser = document.getElementById("greetingUser");
                    if (greetUser)
                        greetUser.innerHTML = "Hello " + userDB.username;
                    return [2 /*return*/, userDB];
                case 2:
                    error_1 = _a.sent();
                    console.error(error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function getAllFriends() {
    return __awaiter(this, void 0, void 0, function () {
        var userDB, data, userFriendsDB, error, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, handleGetUser()];
                case 1:
                    userDB = _a.sent();
                    if (!userDB)
                        throw new Error("Couldn't get User");
                    return [4 /*yield*/, axios.post('/friends/get-friends', { userDB: userDB })];
                case 2:
                    data = (_a.sent()).data;
                    if (!data)
                        throw new Error("Couldn't recieve data from axios POST: '/friends/get-friends' ");
                    userFriendsDB = data.userFriendsDB, error = data.error;
                    if (error)
                        throw error;
                    renderFriends(userFriendsDB);
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    console.error(error_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function renderUserSettings() {
    return __awaiter(this, void 0, void 0, function () {
        var userDB, usernameInput, emailInput, passwordInput, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, handleGetUser()];
                case 1:
                    userDB = _a.sent();
                    console.log(userDB);
                    usernameInput = document.getElementById("usenameSetting");
                    emailInput = document.getElementById("emailSetting");
                    passwordInput = document.getElementById("passwordSetting");
                    usernameInput.value = "" + userDB.username;
                    emailInput.value = "" + userDB.email;
                    passwordInput.value = "" + userDB.password;
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    console.error(error_3);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function renderFriends(userFriendArray) {
    try {
        var html_1 = '';
        console.log(userFriendArray);
        userFriendArray.forEach(function (userFriend) {
            html_1 += "\n                <div class=\"friend\">\n                    <div onclick=\"handleChatFriend('" + userFriend.friend.username + "')\" class=\"right\">\n                        <img src=\"../assets/svgs/user-profile-svgrepo-com.svg\">\n                        <p>" + userFriend.friend.username + "</p>\n                    </div>\n                    <div onclick=\"handleDeleteFriend('" + userFriend.friend.username + "')\" class=\"left\">\n                        <img src=\"../assets/svgs/trash-svgrepo-com.svg\">\n                    </div>\n                </div>\n            ";
        });
        friendListContainer.innerHTML = html_1;
    }
    catch (error) {
        console.error(error);
    }
}
function handleChatFriend(friendUsername) {
    return __awaiter(this, void 0, void 0, function () {
        var userDB, data, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, handleGetUser()];
                case 1:
                    userDB = _a.sent();
                    if (!userDB)
                        throw new Error("Couldn't get user from data base");
                    return [4 /*yield*/, axios.post('/friends/get-sharedRoomId', { friendUsername: friendUsername, userDB: userDB })];
                case 2:
                    data = (_a.sent()).data;
                    if (!data)
                        throw new Error("Couldn't recieve data from axios POST: '/friends/get-sharedRoomId' ");
                    console.log(data);
                    return [3 /*break*/, 4];
                case 3:
                    error_4 = _a.sent();
                    console.error(error_4);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function handleDeleteFriend(friendUsername) {
    return __awaiter(this, void 0, void 0, function () {
        var userDB, username, data, succses, error, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, handleGetUser()];
                case 1:
                    userDB = _a.sent();
                    username = userDB.username;
                    console.log('Clicked trash icon');
                    return [4 /*yield*/, axios["delete"]("/friends/delete-friend", { data: { friendUsername: friendUsername, username: username } })];
                case 2:
                    data = (_a.sent()).data;
                    if (!data)
                        throw new Error("Coulnd't recieve data from axios DELETE: '/users/delete-friend' ");
                    succses = data.succses, error = data.error;
                    if (error)
                        throw error;
                    if (succses) {
                        location.reload();
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_5 = _a.sent();
                    console.error(error_5);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
