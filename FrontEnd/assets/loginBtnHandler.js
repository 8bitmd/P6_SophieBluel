let logInOut = document.querySelector(".toggleLogin")

if (localStorage.getItem("jwt") === null) {
    logInOut.innerText = "login"
} else {
    logInOut.innerText = "logout"
}

logInOut.addEventListener("click", () => {
    if (logInOut.innerText === "logout") {
        localStorage.removeItem("jwt")
    }
})
