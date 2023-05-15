
import { requestCompanies, requestCreateDepartment, requestDeleteDepartment, requestDeleteEmployee, requestHireEmployee, requestUpdateDepartment, requestUpdateEmployee, requestCompaniesByID, requestEmployeesAll, requestEmployeesOfWork } from "./request.js"
import { employeesRegisted, departmentRender } from "./dashboardAdmin.js"
import { requestDismissEmployee } from "./request.js"
import { toast } from "./toast.js"

export async function modalCreateDepartment(token) {

    const companies = await requestCompanies()
    const dialog = document.querySelector('.dialog')
    dialog.close()

    dialog.innerHTML = ''

    const div = document.createElement('div')
    const buttonClose = document.createElement('button')
    const title = document.createElement('h1')
    const name = document.createElement('input')
    const description = document.createElement('input')
    const select = document.createElement('select')
    const buttonCreate = document.createElement('button')
    const optionDefault = document.createElement('option')

    div.classList.add('create-department__div')
    buttonClose.classList.add('create-department__close')
    title.classList.add('create-department__title')
    name.classList.add('create-department__name')
    description.classList.add('create-department__description')
    select.classList.add('create-department__select')
    buttonCreate.classList.add('create-department__button')

    name.placeholder = 'Nome do departamento'
    description.placeholder = 'Descrição'
    buttonClose.innerText = 'X'
    title.innerText = 'Criar Departamento'
    optionDefault.innerText = 'Selecionar Empresa'
    optionDefault.value = 'all'
    buttonCreate.innerText = 'Criar'

    dialog.append(div)
    select.append(optionDefault)
    div.append(buttonClose, title, name, description, select, buttonCreate)

    companies.forEach(element => {
        const option = document.createElement('option')

        option.innerText = element.name
        option.value = element.id

        select.append(option)
    });

    dialog.showModal()

    buttonClose.addEventListener('click', () => {
        dialog.close()
    })

    buttonCreate.addEventListener('click', async () => {

        if (name.value == '' || description.value == '' || select.value == 'all') {
            toast('alert', 'Preencha todos os campos!')
        } else {
            const department = await requestCreateDepartment(name.value, description.value, select.value, token)
            if (department) {
                setTimeout(() => {
                    dialog.close()
                    window.location.reload()
                }, 3000);
            }

        }
    })

}

export function modalConfirmDeleteEmployee(employee, token) {

    const dialog = document.querySelector('.dialog')
    dialog.close()

    dialog.innerHTML = ''

    const div = document.createElement('div')
    const buttonClose = document.createElement('button')
    const title = document.createElement('h1')
    const button = document.createElement('button')

    div.classList.add('confirm-delete-employee-div')
    buttonClose.classList.add('confirm-delete-employee-close')
    title.classList.add('confirm-delete-employee-title')
    button.classList.add('confirm-delete-employee-button')

    title.innerText = `Realmente deseja remover o usuario ${employee.name}?`
    button.innerText = 'Remover'
    buttonClose.innerText = 'X'

    dialog.append(div)
    div.append(buttonClose, title, button)

    dialog.showModal()

    buttonClose.addEventListener('click', () => {
        dialog.close()
    })

    button.addEventListener('click', async () => {
        if (employee.company_id != null) {
            await requestDismissEmployee(employee.id, token)
            await requestDeleteEmployee(employee.id, token)
            dialog.close()
            setTimeout(() => {
                employeesRegisted()
            }, 3000);

        } else {
            await requestDeleteEmployee(employee.id, token)
            dialog.close()
            setTimeout(() => {
                employeesRegisted()
            }, 3000);
        }
    })

}

export function modalUpdateEmployee(employee, token) {

    const dialog = document.querySelector('.dialog')
    dialog.close()

    dialog.innerHTML = ''

    const div = document.createElement('div')
    const container = document.createElement('div')
    const buttonClose = document.createElement('button')
    const title = document.createElement('h1')
    const inputName = document.createElement('input')
    const inputEmail = document.createElement('input')
    const button = document.createElement('button')

    div.classList.add('update-employee__div')
    container.classList.add('update-employee__container')
    buttonClose.classList.add('update-employee__close')
    title.classList.add('update-employee__title')
    inputName.classList.add('update-employee__name')
    inputEmail.classList.add('update-employee__email')
    button.classList.add('update-employee__button')

    title.innerText = 'Editar Usuário'
    inputName.placeholder = 'Nome'
    inputEmail.placeholder = 'E-mail'
    button.innerText = 'Salvar'
    buttonClose.innerText = 'X'

    dialog.append(div)
    div.append(buttonClose, title, container, button)
    container.append(inputName, inputEmail)

    dialog.showModal()

    buttonClose.addEventListener('click', () => {
        dialog.close()
    })

    button.addEventListener('click', async () => {
        if (inputName.value == '' || inputEmail.value == '') {
            toast('alert', 'Preencha todos os campos!')
        } else {
            const retorno = await requestUpdateEmployee(employee.id, inputName.value, inputEmail.value, token)
            if (retorno) {
                setTimeout(() => {
                    employeesRegisted()
                    dialog.close()
                }, 3000);
            }

        }
    })
}

export function modalConfirmDeleteDepartment(department, token) {

    const dialog = document.querySelector('.dialog')
    dialog.close()

    dialog.innerHTML = ''

    const div = document.createElement('div')
    const buttonClose = document.createElement('button')
    const title = document.createElement('h1')
    const button = document.createElement('button')

    div.classList.add('delete-department__div')
    buttonClose.classList.add('delete-department__close')
    title.classList.add('delete-department__title')
    button.classList.add('delete-department__button')

    title.innerText = `Realmente deseja remover o Departamento ${department.name} e demitir seus funcionários?`
    button.innerText = 'Remover'
    buttonClose.innerText = 'X'

    dialog.append(div)
    div.append(buttonClose, title, button)

    dialog.showModal()

    buttonClose.addEventListener('click', () => {
        dialog.close()
    })

    button.addEventListener('click', async () => {
        const employeesAll = await requestEmployeesAll(token)
        const employees = employeesAll.filter(element => { return element.department_id == department.id })
        for (let i = 0; i < employees.length; i++) {
            await requestDismissEmployee(employees[i].id, token)
        }
        await requestDeleteDepartment(department.id, token)
        const select = document.querySelector('#companies')
        setTimeout(() => {
            departmentRender(select.value)
            employeesRegisted()
            dialog.close()
        })
    }, 3000);


}

export function modalUpdateDepartment(department, token) {

    const dialog = document.querySelector('.dialog')
    dialog.close()

    dialog.innerHTML = ''

    const div = document.createElement('div')
    const buttonClose = document.createElement('button')
    const title = document.createElement('h1')
    const input = document.createElement('textarea')
    const button = document.createElement('button')

    div.classList.add('update-department__div')
    buttonClose.classList.add('update-department__close')
    title.classList.add('update-department__title')
    input.classList.add('update-department__input')
    button.classList.add('update-department__button')

    title.innerText = "Editar Departamento"
    input.value = department.description
    button.innerText = 'Salvar'
    buttonClose.innerText = 'X'

    dialog.append(div)
    div.append(buttonClose, title, input, button)

    dialog.showModal()

    buttonClose.addEventListener('click', () => {
        dialog.close()
    })

    button.addEventListener('click', async () => {
        if (input.value != '') {
            const retorno = await requestUpdateDepartment(department.id, department.name, input.value, token)
            const select = document.querySelector('#companies')
            setTimeout(() => {
                departmentRender(select.value)
                dialog.close()
            }, 3000);
        } else {
            toast('alert', 'Preencha todos os campos!')
        }
    })

}

export async function modalView(department, token) {

    const dialog = document.querySelector('.dialog')
    dialog.close()

    dialog.innerHTML = ''

    const employeesAll = await requestEmployeesAll(token)
    const employees = employeesAll.filter(element => { return element.department_id == department.id })
    const usersOfWork = await requestEmployeesOfWork(token)
    const companie = await requestCompaniesByID(department.company_id, token)

    const div = document.createElement('div')
    const buttonClose = document.createElement('button')
    const title = document.createElement('h1')
    const description = document.createElement('p')
    const companiy = document.createElement('p')
    const container = document.createElement('div')
    const select = document.createElement('select')
    const optionDefault = document.createElement('option')
    const button = document.createElement('button')
    const containerEmpty = document.createElement('div')
    const titleEmpty = document.createElement('h1')
    const ul = document.createElement('ul')

    div.classList.add('modal-view__div')
    buttonClose.classList.add('modal-view__close')
    title.classList.add('modal-view__title')
    description.classList.add('modal-view__description')
    companiy.classList.add('modal-view__company')
    container.classList.add('modal-view__container')
    select.classList.add('modal-view__select')
    button.classList.add('modal-view__hire')
    titleEmpty.classList.add('modal-view__title-empty')
    containerEmpty.classList.add('dialog__empty-employees')
    ul.classList.add('dialog__ul-employees')

    buttonClose.innerText = 'X'
    title.innerText = department.name
    description.innerText = department.description
    companiy.innerText = companie.name
    optionDefault.innerHTML = 'Selecionar usuário'
    optionDefault.value = 'all'
    optionDefault.disabled = select
    optionDefault.selected = select
    button.innerText = 'Contratar'
    titleEmpty.innerText = 'Este departamento não possui empregados'

    usersOfWork.forEach(user => {
        const option = document.createElement('option')

        option.value = user.id
        option.innerText = user.name

        select.append(option)
    })

    dialog.append(div)
    div.append(buttonClose, title, description, companiy, container, containerEmpty, ul)
    container.append(select, button)
    containerEmpty.append(titleEmpty)
    select.append(optionDefault)

    ul.innerHTML = ''

    employees.forEach(employee => {
        const li = document.createElement('li')
        const nameUser = document.createElement('p')
        const nameCompanie = document.createElement('p')
        const button = document.createElement('button')

        li.classList.add('modal-view-users__li')
        nameUser.classList.add('modal-view-users__name')
        nameCompanie.classList.add('modal-view-users__company')
        button.classList.add('modal-view-users__button')

        nameUser.innerText = employee.name
        nameCompanie.innerText = companie.name
        button.innerText = 'Desligar'
        button.dataset.id = employee.id


        ul.append(li)
        li.append(nameUser, nameCompanie, button)

        button.addEventListener('click', async (event) => {
            await requestDismissEmployee(event.target.dataset.id, token)
            setTimeout(() => {
                modalView(department, token)
                employeesRegisted()
                employeesEmpty(department, token)
            }, 3000);
        })

    })

    employeesEmpty(department, token)

    if (!dialog.open) {
        dialog.showModal()
    }

    buttonClose.addEventListener('click', () => {
        dialog.close()
    })

    button.addEventListener('click', async () => {
        if (select.value != 'all') {
            const retorno = await requestHireEmployee(select.value, department.id, token)
            setTimeout(() => {
                employeesRegisted()
                employeesEmpty(department, token)
                modalView(department, token)
            }, 3000);
        } else {
            toast('alert', 'Selecione o usuário!')
        }
    })

}


async function employeesEmpty(department, token) {
    const containerEmpty = document.querySelector('.dialog__empty-employees')
    const containerData = document.querySelector('.dialog__ul-employees')
    const employeesAll = await requestEmployeesAll(token)
    const employees = employeesAll.filter(element => { return element.department_id == department.id })
    if (employees.length == 0) {
        containerEmpty.classList.remove('dialog__empty-employees--hidden')
        containerData.classList.add('dialog__ul-employees--hidden')
    } else {
        containerEmpty.classList.add('dialog__empty-employees--hidden')
        containerData.classList.remove('dialog__ul-employees--hidden')
    }

}
