let banner = document.getElementById("edit-banner")
let spacer = document.getElementById("spacer")

if (localStorage.getItem("jwt") !== null) {
    banner.classList.remove("inactive")
    spacer.classList.remove("inactive")
}