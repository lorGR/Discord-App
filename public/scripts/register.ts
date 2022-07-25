const errorContainerRegister = document.getElementById("errorContainer");

function handleLoginPage() {
    try {
        window.location.href = "./login.html";
    } catch (error) {
        console.error(error);
    }
}

function handleVisible() {
    try {
        const input = document.getElementById("registerPassword") as HTMLInputElement;
        const icon = document.getElementById("passwordIcon") as HTMLImageElement;
        if (input.type === "password") {
            input.type = "text";
            icon.src = "../assets/svgs/eye-svgrepo-com.svg";
        } else if (input.type === "text") {
            input.type = "password";
            icon.src = "../assets/svgs/password-svgrepo-com.svg";
        }
    } catch (error) {
        console.error(error);
    }
}

function handleVisibleReIcon() {
    try {
        const input = document.getElementById("registerRePassword") as HTMLInputElement;
        const icon = document.getElementById("rePasswordIcon") as HTMLImageElement;
        if (input.type === "password") {
            input.type = "text";
            icon.src = "../assets/svgs/eye-svgrepo-com.svg";
        } else if (input.type === "text") {
            input.type = "password";
            icon.src = "../assets/svgs/password-svgrepo-com.svg";
        }
    } catch (error) {
        console.error(error);
    }
}

function handleErrorsRegister(error: string) : void {
    try {
        if (error.includes('email_1 dup key: { email:')) errorContainerRegister.innerHTML = "Email is already is in use";
        if (error.includes('"email" must be a valid email')) errorContainerRegister.innerHTML = "Email is not valid - [.com / .net]";

        if (error.includes('"username" length must be at least 3 characters long')) errorContainerRegister.innerHTML = "Username should be at least 3 chracters";
        if (error.includes('"username" length must be less than or equal to 16 characters long')) errorContainerRegister.innerHTML = "Username can't be longer than 16 characters";
        if (error.includes('username_1 dup key: { username:')) errorContainerRegister.innerHTML = "Username is already in use";

        if (error.includes('"password" length must be at least 6 characters long')) errorContainerRegister.innerHTML = "Password should be at least 6 characters";
        if (error.includes('"password" length must be less than or equal to 16 characters long')) errorContainerRegister.innerHTML = "Password can't be longer than 16 characters";
        if (error.includes('"password" should contain at least 1 special character')) errorContainerRegister.innerHTML = "Password should contain at least 1 special character";
        if (error.includes('"password" should contain at least 1 lowercase character')) errorContainerRegister.innerHTML = "Password should contain at least 1 lower case letter";
        if (error.includes('"password" should contain at least 1 uppercase character')) errorContainerRegister.innerHTML = "Password should contain at least 1 upper case letter";
        if (error.includes('"password" should contain at least 1 numeric character')) errorContainerRegister.innerHTML = "Password should contain at least 1 numeric";
        if (error.includes('"password" should not contain white spaces')) errorContainerRegister.innerHTML = "Password can't contain spaces";

        if (error.includes('"repeatPassword" must be [ref:password]')) errorContainerRegister.innerHTML = "Password doesn't match";
    } catch (error) {
        console.error(error);
    }
}

async function handleRegister(event) {
    try {
        event.preventDefault();
        
        const email = event.target.email.value;
        const username = event.target.username.value;
        const password = event.target.password.value;
        const rePassword = event.target.rePassword.value;
        if (!email || !username || !password || !rePassword) throw new Error("All fields must be filled");

        errorContainerRegister.innerHTML = "";
        //@ts-ignore
        const { data } = await axios.post('/users/register', { email, username, password, rePassword });
        if (!data) throw new Error("Couldn't recieve data from axios POST: '/users/register' ");
        console.log(data);
        const { register, userDB, error } = data;
        if (error) handleErrorsRegister(error);
        if (register) window.location.href = "./home.html";
    } catch (error) {
        console.error(error);
    }
}
