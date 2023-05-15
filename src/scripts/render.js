import { requestCompaniesByID, requestDepartamentsByID } from "./request.js"

export function renderOptions(element) {

    const option = document.createElement('option')

    option.value = element.id
    option.innerText = element.name

    return option

}

export function renderCompaniesHome(element, category) {

    const container = document.createElement('li')
    const name = document.createElement('span')
    const sector = document.createElement('p')

    container.classList.add('section__li')
    name.classList.add('li__name')
    sector.classList.add('li__sector')

    container.append(name, sector)

    name.innerText = element.name
    sector.innerText = category

    return container
}

export function renderDepartmentsAdmin(companie, department) {

    const li = document.createElement('li')
    const containerData = document.createElement('div')
    const containerButton = document.createElement('div')
    const nameDepartment = document.createElement('p')
    const description = document.createElement('p')
    const nameCompanie = document.createElement('p')
    const buttonView = document.createElement('img')
    const buttonEdit = document.createElement('img')
    const buttonDelete = document.createElement('img')

    li.append(containerData, containerButton)
    containerData.append(nameDepartment, description, nameCompanie)
    containerButton.append(buttonView, buttonEdit, buttonDelete)

    li.classList.add('section__li')
    containerButton.classList.add('section__container-button')
    containerData.classList.add('section__container-data')
    nameDepartment.classList.add('section__name-department')
    nameCompanie.classList.add('section__name-companie')
    description.classList.add('section__department-description')
    buttonEdit.classList.add('section__department-edit')
    buttonDelete.classList.add('section__department-delete')
    buttonView.classList.add('section__department-view')

    nameDepartment.innerText = department.name
    description.innerText = department.description
    nameCompanie.innerText = companie.name

    buttonDelete.src = "../assets/trash.svg"
    buttonDelete.dataset.id = department.id
    buttonEdit.src = "../assets/pencil.svg"
    buttonEdit.dataset.id = department.id
    buttonView.src = "../assets/view.svg"
    buttonView.dataset.id = department.id

    return li
}

export function renderEmployeesAdmin(companie, user) {

    const li = document.createElement('li')
    const containerData = document.createElement('div')
    const containerButton = document.createElement('div')
    const nameProfile = document.createElement('p')
    const nameCompanie = document.createElement('p')
    const buttonDelete = document.createElement('img')
    const buttonEdit = document.createElement('img')

    li.append(containerData, containerButton)
    containerData.append(nameProfile, nameCompanie)
    containerButton.append(buttonEdit, buttonDelete)


    li.classList.add('section__li-users')
    containerButton.classList.add('section__container-button')
    containerData.classList.add('section__container-data')
    nameProfile.classList.add('section__name-users')
    nameCompanie.classList.add('section__name-companie')
    buttonEdit.classList.add('section__users-edit')
    buttonDelete.classList.add('section__users-delete')

    if (companie == null) {
        nameCompanie.innerText = "Não contratado"
    } else {
        nameCompanie.innerText = companie.name
    }
    nameProfile.innerText = user.name

    buttonDelete.src = "../assets/trash.svg"
    buttonEdit.src = "../assets/pencil.svg"
    buttonEdit.dataset.id = user.id
    buttonDelete.dataset.id = user.id

    return li
}

export function renderDataUser(profile){

    const name = document.querySelector('.section__user-name')
    const email = document.querySelector('.section__email')

    name.innerText = profile.name
    email.innerText = profile.email
}

export async function renderDashboardUser(profile, token){

    const department = await requestDepartamentsByID(profile.department_id, token)
    const companie = await requestCompaniesByID(profile.company_id, token)
    const employees = companie.employees
    const companieName = document.querySelector('.section__companie-name')
    const departmentName = document.querySelector('.section__sector-name')
    const ul = document.querySelector('.section__ul')

    companieName.innerText = companie.name
    departmentName.innerText = department.name

    employees.forEach(employee => {
        const li = document.createElement('li')
        const name = document.createElement('p')

        li.classList.add('section__li')
        name.classList.add('section__li-name')

        ul.append(li)
        li.append(name)

        name.innerText = employee.name
    });


}