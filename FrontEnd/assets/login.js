let emailField = document.getElementById("email")
let passwordField = document.getElementById("password")
let login = document.getElementById("login-form")
let erreur = document.getElementById("login-error")

function reset() {
    emailField.classList.remove("incorrect")
    passwordField.classList.remove("incorrect")
}
function verifyLogin(email, password) {
    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            "email": email,
            "password": password,
        })
    })
        .then(async (response) => {
            if (response.status === 200) {
                console.log("OK")
                erreur.classList.add("inactive")
                let data = await response.json();
                localStorage.setItem("jwt", data.token)
                window.location.href = "/FrontEnd/index.html"
            } else {
                console.log("ERROR")
                emailField.classList.add("incorrect")
                passwordField.classList.add("incorrect")
                erreur.classList.remove("inactive")
            }
        })
}

login.addEventListener("submit", (event) => {
    event.preventDefault()
    reset()
    verifyLogin(emailField.value, passwordField.value)
})