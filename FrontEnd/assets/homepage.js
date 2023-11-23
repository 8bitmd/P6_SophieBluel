import getWorks from './store.js'
const WORKS = await getWorks()

const filterAll = document.querySelector(".filter-all")

export function insertPortfolioWorks(WORKS) {
    for (let i = 0; i < WORKS.length; i++) {
        const gallery = document.querySelector(".gallery")
        const figure = document.createElement("figure")
        const image = document.createElement("img")
        const caption = document.createElement("figcaption")

        image.src = WORKS[i]["imageUrl"]
        caption.innerText = WORKS[i]["title"]

        gallery.appendChild(figure)
        figure.appendChild(image)
        figure.appendChild(caption)
    }
}

function resetSelectedFilter() {
    document.querySelectorAll(".filter")
        .forEach(element => {
            element.classList.remove("selected")
})}

insertPortfolioWorks(WORKS)
filterAll.classList.add("selected")

filterAll.addEventListener("click", () => {
    resetSelectedFilter()
    filterAll.classList.add("selected")
    document.querySelector(".gallery").innerHTML = ""
    insertPortfolioWorks(WORKS)
})

const filters = document.querySelector(".filtres")
async function getCategories() {
    const response = await fetch("http://localhost:5678/api/categories")
    const categories = await response.json()

    function filterWorks(f) {
        resetSelectedFilter()
        document.querySelector(".gallery").innerHTML = ""
        const filtered = WORKS.filter(function (WORKS) {
            return WORKS["categoryId"] === f
        })
        insertPortfolioWorks(filtered)
    }

    for (let i = 0; i < categories.length; i++) {
        const filter = document.createElement("button")
        filter.innerText = categories[i].name
        filter.classList.add("filter", "filter" + [i])
        filters.appendChild(filter)

        filter.addEventListener("click", async () => {
            filterWorks(categories[i].id)
            filter.classList.add("selected")

        })
    }
}
getCategories()

