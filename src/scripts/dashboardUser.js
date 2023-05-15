import { renderDashboardUser, renderDataUser } from "./render.js"
import { requestProfile } from "./request.js"

async function Authorization() {

    const token = JSON.parse(localStorage.getItem('@KE:token'))

    if (token) {
        const profile = await requestProfile(token)
        if (profile.is_admin) {
            window.location.replace("../pages/dashboardAdmin.html")
        } else {
            buttonEvent()
            selectData()
        }
    } else {
        window.location.replace("../pages/home.html")
    }
}

function buttonEvent() {

    const buttonLogout = document.querySelector('.header__button--logout')

    buttonLogout.addEventListener('click', () => {
        localStorage.clear()
        window.location.replace("../index.html")
    })
}

async function selectData() {

    const token = JSON.parse(localStorage.getItem('@KE:token'))
    const profile = await requestProfile(token)
    renderDataUser(profile)
    checkHired(profile, token)

}

function checkHired(profile, token) {

    const empty = document.querySelector('.section__container-empty')
    const data = document.querySelector('.section__container-secound')

    if (profile.company_id == null) {
        empty.classList.remove('section__container-empty--hidden')
        data.classList.add('section__container-secound--hidden')
    } else {
        empty.classList.add('section__container-empty--hidden')
        data.classList.remove('section__container-secound--hidden')
        renderDashboardUser(profile, token)
    }

}

Authorization()