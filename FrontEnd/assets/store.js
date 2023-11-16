let works = undefined

export default async function getWorks() {
    if (works !== undefined) {
        return works
    }

    const response = await fetch("http://localhost:5678/api/works")
    works = await response.json()

    return works
}

export function invalidateWorksCache() {
    works = undefined
}

export function addWork(work) {
    works.push(work)
}

// export async function getCategories() {
//     const response = await fetch("http://localhost:5678/api/categories")
//     const categories = await response.json()
//     console.log(categories)
// }

export async function deleteWork(id) {
}
