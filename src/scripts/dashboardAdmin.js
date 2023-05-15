
import { modalConfirmDeleteDepartment, modalConfirmDeleteEmployee, modalCreateDepartment, modalUpdateDepartment, modalUpdateEmployee, modalView } from "./modal.js"
import { renderDepartmentsAdmin, renderEmployeesAdmin, renderOptions } from "./render.js"
import { requestCompanies, requestCompaniesByID, requestProfile, requestDepartamentsByCompany, requestDepartamentsByID, requestEmployeesAll } from "./request.js"

async function Authorization() {

    const token = JSON.parse(localStorage.getItem('@KE:token'))

    if (token) {
        const profile = await requestProfile(token)
        if (!profile.is_admin) {
            window.location.replace("../pages/dashboardUser.html")
        } else {
            selectCompanie()
            employeesRegisted()
            buttonEvent()
        }
    } else {
        window.location.replace("../pages/home.html")
    }
}

function buttonEvent() {

    const buttonLogout = document.querySelector('.header__button--logout')
    const buttonCreateDepartment = document.querySelector('.section__buttons-add')

    buttonLogout.addEventListener('click', () => {
        localStorage.clear()
        window.location.replace("../../")
    })

    buttonCreateDepartment.addEventListener('click', () => {
        const token = JSON.parse(localStorage.getItem('@KE:token'))
        modalCreateDepartment(token)

    })

}

function eventEmployees() {

    const token = JSON.parse(localStorage.getItem('@KE:token'))
    const buttonDelete = document.querySelectorAll('.section__users-delete')
    const buttonEdit = document.querySelectorAll('.section__users-edit')

    buttonEdit.forEach(button => {
        button.addEventListener('click', async (event) => {
            const employees = await requestEmployeesAll(token)
            const employee = employees.find(element => { return element.id == event.target.dataset.id })
            modalUpdateEmployee(employee, token)
        })
    })

    buttonDelete.forEach(button => {
        button.addEventListener('click', async (event) => {
            const employees = await requestEmployeesAll(token)
            const employee = employees.find(element => { return element.id == event.target.dataset.id })
            modalConfirmDeleteEmployee(employee, token)
        })
    })
}

function eventDepartments() {

    const view = document.querySelectorAll('.section__department-view')
    const edit = document.querySelectorAll('.section__department-edit')
    const del = document.querySelectorAll('.section__department-delete')
    const token = JSON.parse(localStorage.getItem('@KE:token'))

    del.forEach(button => {
        button.addEventListener('click', async (event) => {
            const departament = await requestDepartamentsByID(event.target.dataset.id, token)
            modalConfirmDeleteDepartment(departament, token)
        })
    })

    edit.forEach(button => {
        button.addEventListener('click', async (event) => {
            const departament = await requestDepartamentsByID(event.target.dataset.id, token)
            modalUpdateDepartment(departament, token)
        })
    })

    view.forEach(button => {
        button.addEventListener('click', async (event) => {
            const departament = await requestDepartamentsByID(event.target.dataset.id, token)
            modalView(departament, token)
        })
    })

}

function departmentsEmpty(binary) {
    const containerEmpty = document.querySelector('.section__container-empty-departments')
    const containerData = document.querySelector('.section__container-departments')

    if (binary) {
        containerEmpty.classList.remove('section__container-empty-users--hidden')
        containerData.classList.add('section__container-departments--hidden')
    } else {
        containerEmpty.classList.add('section__container-empty-users--hidden')
        containerData.classList.remove('section__container-departments--hidden')
    }

}

function employeesEmpty(binary) {
    const containerEmpty = document.querySelector('.section__container-empty-users')
    const containerData = document.querySelector('.section__container-users')

    if (binary) {
        containerEmpty.classList.remove('section__container-empty-users--hidden')
        containerData.classList.add('section__container-departments--hidden')
    } else {
        containerEmpty.classList.add('section__container-empty-users--hidden')
        containerData.classList.remove('section__container-departments--hidden')
    }

}

export async function employeesRegisted() {

    const token = JSON.parse(localStorage.getItem('@KE:token'))
    const employeesAll = await requestEmployeesAll(token)
    const ul = document.querySelector('.section__ul-users')

    ul.innerHTML = ''

    if (employeesAll.length > 0) {
        employeesEmpty(false)
        employeesAll.forEach(async employee => {
            if (employee.company_id == null) {
                const li = renderEmployeesAdmin(null, employee)
                ul.appendChild(li)
                eventEmployees()
            } else {
                const companie = await requestCompaniesByID(employee.company_id, token)
                const li = renderEmployeesAdmin(companie, employee)
                ul.appendChild(li)
                eventEmployees()
            }
        })
    } else {
        employeesEmpty(true)
    }

}

async function selectCompanie() {

    const select = document.querySelector('#companies')

    const companies = await requestCompanies()
    
    departmentsEmpty(true)

    companies.forEach(element => {
        const option = renderOptions(element)
        select.appendChild(option)
    });

    select.addEventListener('change', async (event) => {
        departmentRender(event.target.value)
    })

}

export async function departmentRender(value) {

    const token = JSON.parse(localStorage.getItem('@KE:token'))
    const array = await requestDepartamentsByCompany(value, token)
    const companie = await requestCompaniesByID(value, token)
    const ul = document.querySelector('.section__ul-departments')

    ul.innerHTML = ''

    if (array.length > 0) {
        departmentsEmpty(false)
        array.forEach(element => {
            const li = renderDepartmentsAdmin(companie, element)
            ul.appendChild(li)
        })
        eventDepartments()
    } else {
        departmentsEmpty(true)
    }

}


Authorization()