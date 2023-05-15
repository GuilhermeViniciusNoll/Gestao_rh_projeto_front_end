
import { requestCategories, requestCompanies, requestProfile } from "./request.js"
import { renderOptions, renderCompaniesHome } from "./render.js"

async function authentication() {
    const token = JSON.parse(localStorage.getItem('@KE:token'))

    if (token) {
        const profile = await requestProfile(token)

        if (profile.is_admin) {
            window.location.replace("../pages/dashboardAdmin.html")
        } else {
            window.location.replace("../pages/dashboardUser.html")
        }
    } else {
        headerRedirection()
        handleCategories()
    }
}

function headerRedirection() {

    const buttonLogin = document.querySelector(".header__button--login")
    const buttonRegister = document.querySelector(".header__button--register")

    buttonRegister.addEventListener('click', () => {
        window.location.replace("./register.html")
    })

    buttonLogin.addEventListener('click', () => {
        window.location.replace("../../")
    })
}

async function companies(array) {

    const ul = document.querySelector('.section__ul')
    const categories = await requestCategories()

    ul.innerHTML = ''

    array.forEach(element => {
        let category = categories.find(category => {
            return element.category_id == category.id
        })

        const li = renderCompaniesHome(element, category.name)
        ul.appendChild(li)
    })
}


async function handleCategories() {

    const select = document.querySelector(".section__select")
    const categories = await requestCategories()
    const AllCompanies = await requestCompanies()

    categories.forEach(element => {
        const option = renderOptions(element)
        select.appendChild(option)
    });

    companies(AllCompanies)

    select.addEventListener('change', (event) => {
        if (event.target.value == 'all') {
            companies(AllCompanies)
        } else {
            let array = AllCompanies.filter(companie => { return companie.category_id == event.target.value })
            companies(array)
        }
    })
}

authentication()

