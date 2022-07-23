var degs = 360;
function turn360() {
    try {
        var logo = document.getElementById("logo");
        logo.style.transform = "rotate(" + degs + "deg)";
        degs += 360;
    }
    catch (error) {
        console.error(error);
    }
}
function handleConnect() {
    window.location.href = "./views/login.html";
}
