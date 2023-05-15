
import { requestLogin, requestProfile } from "./request.js"
import { toast } from "./toast.js"

async function authentication() {
    const token = JSON.parse(localStorage.getItem('@KE:token'))

    if (token) {
        const profile = await requestProfile(token)

        if (profile.is_admin) {
            window.location.replace("./pages/dashboardAdmin.html")
        } else {
            window.location.replace("./pages/dashboardUser.html")
        }
    } else {
        buttonsEvent()
    }
}

function buttonsEvent() {

    const buttonHome = document.querySelector(".header__button--home")
    const buttonRegister = document.querySelector(".header__button--register")
    const buttonRegisterSecound = document.querySelector(".section__button--register")
    const buttonLogin = document.querySelector(".section__button--login")

    const inputs = document.querySelectorAll(".section__input")
    const inputEmail = document.querySelector(".section__input--email")
    const inputPassword = document.querySelector(".section__input--password")

    buttonHome.addEventListener('click', () => {
        window.location.replace("./pages/home.html")
    })

    buttonRegister.addEventListener('click', () => {
        window.location.replace("./pages/register.html")
    })

    buttonRegisterSecound.addEventListener('click', () => {
        window.location.replace("./pages/register.html")
    })

    buttonLogin.addEventListener('click', async () => {

        let whiteSpace = 0
        inputs.forEach(element => {
            if (element.value == '') {
                whiteSpace++
            }
        })

        if (whiteSpace > 0) {
            toast('alert','Preencha todos os campos!')
        } else {
            const auth = await requestLogin(inputEmail.value, inputPassword.value)

            if (auth != false) {
                localStorage.setItem('@KE:token', JSON.stringify(auth.authToken))

                if (auth.isAdm) {
                    setTimeout(() => {
                        window.location.replace("./pages/dashboardAdmin.html")
                    }, 3000);
                } else {
                    setTimeout(() => {
                        window.location.replace("./pages/dashboardUser.html")
                    }, 3000);
                }
            }

        }
    })

}

authentication()
