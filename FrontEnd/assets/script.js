const RESPONSE = await fetch("http://localhost:5678/api/works")
const WORKS = await RESPONSE.json()

const filtreTous = document.querySelector(".filtre-tous")
const filtreObjets = document.querySelector(".filtre-objets")
const filtreAppartements = document.querySelector(".filtre-appartements")
const filtreHr = document.querySelector(".filtre-hr")
async function getWorks(WORKS) {
    for (let i = 0; i < WORKS.length; i++) {
        const GALLERY = document.querySelector(".gallery")
        const FIGURE = document.createElement("figure")
        const IMAGE = document.createElement("img")
        const CAPTION = document.createElement("figcaption")

        IMAGE.src = WORKS[i]["imageUrl"]
        CAPTION.innerText = WORKS[i]["title"]

        GALLERY.appendChild(FIGURE)
        FIGURE.appendChild(IMAGE)
        FIGURE.appendChild(CAPTION)
    }
}

function resetSelectedFilter() {
    document.querySelectorAll(".filtre")
        .forEach(element => {
            element.classList.remove("selected")
})}

await getWorks(WORKS)
filtreTous.classList.add("selected")

async function filtrerWorks(f) {
    if (f === 0) {
        resetSelectedFilter()
        filtreTous.classList.add("selected")
        document.querySelector(".gallery").innerHTML = ""
        await getWorks(WORKS)
    } else if (f === 1) {
        resetSelectedFilter()
        filtreObjets.classList.add("selected")
        const objetsFiltre = WORKS.filter(function (WORKS) {
            return WORKS["categoryId"] === 1
        })
        document.querySelector(".gallery").innerHTML = ""
        await getWorks(objetsFiltre)
    } else if (f === 2) {
        resetSelectedFilter()
        filtreAppartements.classList.add("selected")
        const restaurantsFiltre = WORKS.filter(function (WORKS) {
            return WORKS["categoryId"] === 2
        })
        document.querySelector(".gallery").innerHTML = ""
        await getWorks(restaurantsFiltre)
    } else if (f === 3) {
        resetSelectedFilter()
        filtreHr.classList.add("selected")
        const hrFiltre = WORKS.filter(function (WORKS) {
            return WORKS["categoryId"] === 3
        })
        document.querySelector(".gallery").innerHTML = ""
        await getWorks(hrFiltre)
    }
}

filtreTous.addEventListener("click", () => filtrerWorks(0))
filtreObjets.addEventListener("click", () => filtrerWorks(1))
filtreAppartements.addEventListener("click", () => filtrerWorks(2))
filtreHr.addEventListener("click", () => filtrerWorks(3))