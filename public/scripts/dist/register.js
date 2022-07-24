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
function handleLoginPage() {
    try {
        window.location.href = "./login.html";
    }
    catch (error) {
        console.error(error);
    }
}
function handleVisible() {
    try {
        var input = document.getElementById("registerPassword");
        var icon = document.getElementById("passwordIcon");
        if (input.type === "password") {
            input.type = "text";
            icon.src = "../assets/svgs/eye-svgrepo-com.svg";
        }
        else if (input.type === "text") {
            input.type = "password";
            icon.src = "../assets/svgs/password-svgrepo-com.svg";
        }
    }
    catch (error) {
        console.error(error);
    }
}
function handleVisibleReIcon() {
    try {
        var input = document.getElementById("registerRePassword");
        var icon = document.getElementById("rePasswordIcon");
        if (input.type === "password") {
            input.type = "text";
            icon.src = "../assets/svgs/eye-svgrepo-com.svg";
        }
        else if (input.type === "text") {
            input.type = "password";
            icon.src = "../assets/svgs/password-svgrepo-com.svg";
        }
    }
    catch (error) {
        console.error(error);
    }
}
var errorContainer = document.getElementById("errorContainer");
function handleRegister(event) {
    return __awaiter(this, void 0, void 0, function () {
        var email, username, password, rePassword, data, register, userDB, error, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    event.preventDefault();
                    email = event.target.email.value;
                    username = event.target.username.value;
                    password = event.target.password.value;
                    rePassword = event.target.rePassword.value;
                    errorContainer.innerHTML = "";
                    return [4 /*yield*/, axios.post('/users/register', { email: email, username: username, password: password, rePassword: rePassword })];
                case 1:
                    data = (_a.sent()).data;
                    if (!data)
                        throw new Error("Couldn't recieve data from axios POST: '/users/register' ");
                    console.log(data);
                    register = data.register, userDB = data.userDB, error = data.error;
                    if (error)
                        handleErrorsRegister(error);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error(error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function handleErrorsRegister(error) {
    try {
        if (error.includes("E11000"))
            errorContainer.innerHTML = "Email is already is use";
        if (error.includes('"email" must be a valid email'))
            errorContainer.innerHTML = "Email is not valid - [.com / .net]";
        if (error.includes('"username" length must be at least 3 characters long'))
            errorContainer.innerHTML = "Username should be at least 3 chracters";
        if (error.includes('"username" length must be less than or equal to 16 characters long'))
            errorContainer.innerHTML = "Username can't be longer than 16 characters";
        if (error.includes('"password" length must be at least 6 characters long'))
            errorContainer.innerHTML = "Password should be at least 6 characters";
        if (error.includes('"password" length must be less than or equal to 16 characters long'))
            errorContainer.innerHTML = "Password can't be longer than 16 characters";
        if (error.includes('"password" should contain at least 1 special character'))
            errorContainer.innerHTML = "Password should contain at least 1 special character";
        if (error.includes('"password" should contain at least 1 lowercase character'))
            errorContainer.innerHTML = "Password should contain at least 1 lower case letter";
        if (error.includes('"password" should contain at least 1 uppercase character'))
            errorContainer.innerHTML = "Password should contain at least 1 upper case letter";
        if (error.includes('"password" should contain at least 1 numeric character'))
            errorContainer.innerHTML = "Password should contain at least 1 numeric";
        if (error.includes('"password" should not contain white spaces'))
            errorContainer.innerHTML = "Password can't contain spaces";
        if (error.includes('"repeatPassword" must be [ref:password]'))
            errorContainer.innerHTML = "Password doesn't match";
    }
    catch (error) {
        console.error(error);
    }
}
