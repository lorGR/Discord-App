let degs : number = 360;
function turn360() {
    try {
        const logo = document.getElementById("logo") as HTMLImageElement;
        logo.style.transform = `rotate(${degs}deg)`;
        degs += 360;
    } catch (error) {
        console.error(error);
    }
}

function handleConnect() {
    window.location.href = "./views/login.html";
}