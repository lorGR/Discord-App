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

const errorContainer = document.getElementById("errorContainer");

async function handleRegister(event) {
    try {
        event.preventDefault();
        const email = event.target.email.value;
        const username = event.target.username.value;
        const password = event.target.password.value;
        const rePassword = event.target.rePassword.value;

        errorContainer.innerHTML = "";
        //@ts-ignore
        const { data } = await axios.post('/users/register', { email, username, password, rePassword });
        if (!data) throw new Error("Couldn't recieve data from axios POST: '/users/register' ");
        console.log(data);
        const { register, userDB, error } = data;
        if (error) handleErrorsRegister(error);
    } catch (error) {
        console.error(error);
    }
}

function handleErrorsRegister(error: string) {
    try {
        if (error.includes("E11000")) errorContainer.innerHTML = "Email is already is use";
        if (error.includes('"email" must be a valid email')) errorContainer.innerHTML = "Email is not valid - [.com / .net]";
    } catch (error) {
        console.error(error);
    }
}