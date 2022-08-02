const errorContainerLogin = document.getElementById("errorContainer") as HTMLSpanElement;

function handleRegisterPage() {
    try {
        window.location.href = "./register.html";
    } catch (error) {
        console.error(error);
    }
}

function handleVisiblePass() {
    try {
        const input = document.getElementById("loginPassword") as HTMLInputElement;
        const icon = document.getElementById("passwordIcon") as HTMLImageElement;        
        if(input.type === "password") {
            input.type = "text";
            icon.src = "../assets/svgs/eye-svgrepo-com.svg";
        } else if(input.type === "text") {
            input.type = "password";
            icon.src = "../assets/svgs/password-svgrepo-com.svg";
        }
    } catch (error) {
        console.error(error);
    }
}

function handleErrorsLogin (error: string){
    try {
        console.log('from the handleErrorsLogin');
        console.log(errorContainerLogin);
        if (error.includes(`User with that email can't be found`)) errorContainerLogin.innerHTML = "Email address isn't registered";
        if (error.includes(`Email or password do not match`)) errorContainerLogin.innerHTML = "Email or password doesn't match";
    } catch (error) {
        console.error(error);
    }
}

async function handleLogin(event) {
    try {
        event.preventDefault();
        errorContainerLogin.innerHTML = '';

        const email = event.target.email.value;
        const password = event.target.password.value;
        if (!email || !password) throw new Error("All fields must be filled");

        //@ts-ignore
        const { data } = await axios.post("/users/login", { email, password });
        if (!data) throw new Error("Couldn't recieve data from axios POST: '/users/login' ");
        console.log(data);
        const { login, userDB, error } = data;
        if (error) handleErrorsLogin(error);
        sessionStorage.setItem('name', userDB.username);
        if (login) window.location.href = "./home.html";
    } catch (error) {
        console.error(error);
    }
}