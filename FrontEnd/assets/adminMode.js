import getWorks, {addWork, invalidateWorksCache} from './store.js'
import {insertPortfolioWorks} from './homepage.js'

let bannerContainer = document.querySelector(".edit-banner_container")
let editProjectsContainer = document.querySelector(".edit-projects_container")
let spacer = document.getElementById("spacer")

if (localStorage.getItem("jwt") !== null) {
    spacer.classList.remove("inactive")
} else {
    bannerContainer.innerHTML = ""
    editProjectsContainer.innerHTML = ""

}

async function deleteWork(id) {
    let jwt = localStorage.getItem("jwt")
    await fetch("http://localhost:5678/api/works/" + id, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${jwt}`,
            "Content-Type": "application/json",
        }})

    invalidateWorksCache()
    await populateModalWorks(await getWorks())
}

const editButton = document.getElementById("edit")
const modal = document.getElementById("modal")
const modalGallery = document.querySelector(".modal-gallery")
const modalSubmitForm = document.querySelector(".modal-submit-form")
const modalGalleryContent = document.querySelector(".modal-gallery-content")
const gotoModalSubmitForm = document.querySelector(".goto-modal-submit-form")
const modalReturn = document.querySelector(".return-modal")
const closeModal = document.querySelectorAll(".close-modal")

async function populateModalWorks(WORKS) {
    modalGalleryContent.innerHTML = ""

    for (let i = 0; i < WORKS.length; i++) {
        const imageContainer = document.createElement("div")
        imageContainer.classList.add("image-container")
        const image = document.createElement("img")
        const deleteBtn = document.createElement("button")
        deleteBtn.innerHTML = `<i class="fa-solid fa-trash-can"></i>`
        deleteBtn.classList.add("deletebtn")

        deleteBtn.addEventListener("click", async () => {
            await deleteWork(WORKS[i]["id"])
            await insertPortfolioWorks(await getWorks())
        })
        image.src = WORKS[i]["imageUrl"]

        // <div data-id="..."></div>

        modalGalleryContent.appendChild(imageContainer)
        imageContainer.appendChild(image)
        imageContainer.appendChild(deleteBtn)
    }
}

editButton.addEventListener("click", async () => {
    modal.style.display = "flex"
    modalGallery.classList.remove("inactive")
    modalSubmitForm.classList.add("inactive")
    await populateModalWorks(await getWorks())
})

gotoModalSubmitForm.addEventListener("click", () => {
    modalGallery.classList.add("inactive")
    modalSubmitForm.classList.remove("inactive")
})

modalReturn.addEventListener("click", () => {
    modalSubmitForm.classList.add("inactive")
    modalGallery.classList.remove("inactive")
    checkFormCompletion(submitForm)
    resetSubmitForm()
})

for (let i = 0; i < closeModal.length; i++) {
    closeModal[i].addEventListener("click", () => {
        modal.style.display = "none"
        modalGalleryContent.innerHTML = ""
        resetSubmitForm()
    })
}

window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none"
        modalGalleryContent.innerHTML = ""
        resetSubmitForm()
    }
}

const submitForm = document.getElementById("submit-form")
function checkFormCompletion(form) {
    //const inputs = form.getElementsByTagName("input") // ici
    let valid = true

    form.querySelectorAll("input[type='file'], input[type='text'], select").forEach(input => {
        valid &= input.validity.valid
    })

    submitFormBtn.disabled = !valid
}

submitForm.addEventListener("change", () => {
    checkFormCompletion(submitForm)
})

submitForm.querySelectorAll("input[type='text']").forEach(input => {
    input.addEventListener("keyup", () => checkFormCompletion(submitForm))
})

function resetSubmitForm() {
    document.getElementById("submit-form").reset();
    uploadPreview.src = ""
    divFormFile.forEach((e) => e.style.display = "flex")
}

async function sendPhoto(formData) {
    let jwt = localStorage.getItem("jwt")

    const res = await fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {"Authorization": `Bearer ${jwt}`,},
        body: formData
    })
    const image = await res.json()
    console.log(image)
    return image
}

async function getCategories() {
    const response = await fetch("http://localhost:5678/api/categories")
    const categories = await response.json()
    const dropDownCategories = document.getElementById("category")

    for (let i = 0; i < categories.length; i++) {
        let category = document.createElement("option")
        category.value = categories[i].id
        category.innerText = categories[i].name

        dropDownCategories.appendChild(category)
    }
}

getCategories()

const inputFile = document.getElementById("photo")
const divFormFile = document.querySelectorAll("svg, .submit-form_file > label, .submit-form_file > input, .submit-form_file > p")
const uploadPreview = document.querySelector(".upload-preview")
function readImage(file) {
    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
        uploadPreview.src = event.target.result;
    });
    reader.readAsDataURL(file);
}

inputFile.addEventListener("change", () => {
    let file = document.querySelector("input[type=file]").files[0]
    divFormFile.forEach((e) => e.style.display = "none")
    clearPreview.classList.remove("inactive")
    readImage(file)
})

const clearPreview = document.querySelector(".clear-preview")
clearPreview.addEventListener("click", () => {
    clearPreview.classList.add("inactive")
    resetSubmitForm()
})

const submitFormBtn = document.getElementById("submit-photo")
submitFormBtn.disabled = true
submitForm.addEventListener("submit", async (e) => {
    e.preventDefault()
    let image = await sendPhoto(new FormData(submitForm))
    addWork(image)
    await populateModalWorks(await getWorks())
    await insertPortfolioWorks(await getWorks())
    modalSubmitForm.classList.add("inactive")
    modalGallery.classList.remove("inactive")
    checkFormCompletion(submitForm)
    clearPreview.classList.add("inactive")
    resetSubmitForm()
})
