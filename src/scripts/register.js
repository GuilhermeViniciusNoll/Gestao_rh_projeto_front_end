
import { requestCreateEmployees, requestProfile } from "./request.js"
import { toast } from "./toast.js"

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
        buttonsEvent()
    }
}

function buttonsEvent() {

    const buttonHome = document.querySelector(".header__button--home")
    const buttonLogin = document.querySelector(".header__button--login")
    const buttonReturn = document.querySelector('.section__button--return')
    const buttonRegister = document.querySelector(".section__button--register-now")

    const inputs = document.querySelectorAll(".section__input")
    const inputName = document.querySelector('.section__input--name')
    const inputEmail = document.querySelector('.section__input--email')
    const inputPassword = document.querySelector('.section__input--password')


    buttonHome.addEventListener('click', () => {
        window.location.replace("../pages/home.html")
    })

    buttonLogin.addEventListener('click', () => {
        window.location.replace("../../")
    })

    buttonReturn.addEventListener('click', () => {
        window.location.replace("../../")
    })

    buttonRegister.addEventListener('click', async () => {
        let whiteSpace = 0

        inputs.forEach(element => {
            if (element.value == '') {
                whiteSpace++
            }
        })

        if (whiteSpace > 0) {
            toast('alert', "Preencha todos os campos!")
        } else {
            const res = await requestCreateEmployees(inputName.value, inputEmail.value, inputPassword.value)
            setTimeout(() => {
                if (res) {
                    window.location.replace("../../")
                }
            }, 3000);
        }
    })

}


authentication()
