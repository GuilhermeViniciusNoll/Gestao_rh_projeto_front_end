
import { toast } from "./toast.js"

const baseURL = 'http://localhost:3333'

export async function requestCategories() {
    const promise = await fetch(`${baseURL}/categories/readAll`, {
        method: "GET"
    }).then(async (res) => {
        if (res.ok) {
            const response = await res.json()
            return response
        }
    })
    return promise
}

export async function requestCompanies() {
    const promise = await fetch(`${baseURL}/companies/readALL`, {
        method: "GET"
    }).then(async (res) => {
        if (res.ok) {
            const response = await res.json()
            return response
        }
    })

    return promise
}

export async function requestCreateEmployees(name, email, password) {
    const promise = await fetch(`${baseURL}/employees/create`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'name': name,
            'email': email,
            'password': password
        })
    }).then(async (res) => {
        if (res.ok) {
            const response = await res.json()
            toast('pass', "Cadastro Feito com sucesso")
            return true
        } else {
            toast('fail', "Usuario já cadastrado")
            return false
        }
    })
    return promise
}

export async function requestLogin(email, password) {
    const promise = await fetch(`${baseURL}/auth/login`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'email': email,
            'password': password
        })
    }).then(async (res) => {
        if (res.ok) {
            toast('pass', "Login Realizado")
            const response = await res.json()
            return response
        } else {
            toast('fail', "Email ou senha inválidos")
            return false
        }
    })
    return promise
}

export async function requestProfile(token) {
    const promise = await fetch(`${baseURL}/employees/profile`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then(async (res) => {
        if (res.ok) {
            const response = await res.json()
            return response
        } else {
            return null
        }
    })
    return promise
}

export async function requestDepartamentsByCompany(company_id, token) {
    const promise = await fetch(`${baseURL}/departments/readByCompany/${company_id}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then(async (res) => {
        if (res.ok) {
            const response = await res.json()
            return response
        } else {
            return null
        }
    })
    return promise
}

export async function requestEmployeesAll(token) {
    const promise = await fetch(`${baseURL}/employees/readAll`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then(async (res) => {
        if (res.ok) {
            const response = await res.json()
            return response
        } else {
            return null
        }
    })
    return promise
}

export async function requestCreateDepartment(name, description, company_id, token) {
    const promise = await fetch(`${baseURL}/departments/create`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            'name': name,
            'description': description,
            'company_id': company_id
        })
    }).then(async (res) => {
        if (res.ok) {
            const response = await res.json()
            toast('pass','Departamento Criado!')
            return true
        } else {
            toast('fail','Falha, o departamento ja existe!')
            return false
        }
    })
    return promise
}

export async function requestDeleteEmployee(employee_id, token) {
    const promise = await fetch(`${baseURL}/employees/deleteEmployee/${employee_id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then(async (res) => {
        if (res.ok) {
            const response = await res.json()
            toast('pass','Sucesso, usuário deletado!')
            return true
        } else {
            toast('fail','Falha!')
            return false
        }
    })
    return promise
}

export async function requestUpdateEmployee(employee_id, name, email, token) {
    const promise = await fetch(`${baseURL}/employees/updateEmployee/${employee_id}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            'name': name,
            'email': email,
        })
    }).then(async (res) => {
        if (res.ok) {
            const response = await res.json()
            toast('pass','Sucesso, Dados alterados!')
            return true
        } else {
            toast('fail','Nome ou email ja cadastrado!')
            return false
        }
    })
    return promise
}

export async function requestDeleteDepartment(department_id, token) {
    const promise = await fetch(`${baseURL}/departments/delete/${department_id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then(async (res) => {
        if (res.ok) {
            const response = await res.json()
            toast('pass','Sucesso, departamento deletado!')
            return true
        } else {
            toast('fail','Falha!')
            return false
        }
    })
    return promise
}

export async function requestDepartamentsAll(token) {
    const promise = await fetch(`${baseURL}/departments/readAll`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then(async (res) => {
        if (res.ok) {
            const response = await res.json()
            return response
        } else {
            return null
        }
    })
    return promise
}

export async function requestUpdateDepartment(department_id, name, description, token) {
    const promise = await fetch(`${baseURL}/departments/update/${department_id}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            'name': name,
            'description': description,
        })
    }).then(async (res) => {
        if (res.ok) {
            const response = await res.json()
            toast('pass','Sucesso, Dados alterados!')
            return true
        } else {
            toast('fail','Falha')
            return false
        }
    })
    return promise
}

export async function requestCompaniesByID(company_id, token) {
    const promise = await fetch(`${baseURL}/companies/readById/${company_id}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then(async (res) => {
        if (res.ok) {
            const response = await res.json()
            return response
        } else {
            console.log(res.statusText)
            return false
        }
    })
    return promise
}

export async function requestDepartamentsByID(department_id, token) {
    const promise = await fetch(`${baseURL}/departments/readById/${department_id}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then(async (res) => {
        if (res.ok) {
            const response = await res.json()
            return response
        } else {
            return null
        }
    })
    return promise
}

export async function requestHireEmployee(employee_id, department_id, token) {
    const promise = await fetch(`${baseURL}/employees/hireEmployee/${employee_id}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            'department_id': department_id
        })
    }).then(async (res) => {
        if (res.ok) {
            const response = await res.json()
            toast('pass','Funcionário contratado!')
            return true
        } else {
            toast('fail','Falha')
            return false
        }
    })
    return promise
}

export async function requestDismissEmployee(employee_id, token) {
    const promise = await fetch(`${baseURL}/employees/dismissEmployee/${employee_id}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    }).then(async (res) => {
        if (res.ok) {
            const response = await res.json()
            toast('pass','Sucesso, funcionário demitido!')
            return true
        } else {
            toast('fail','Falha')
            return false
        }
    })
    return promise
}

export async function requestEmployeesOfWork(token) {
    const promise = await fetch(`${baseURL}/employees/outOfWork`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    }).then(async (res) => {
        if (res.ok) {
            const response = await res.json()
            return response
        } else {
            console.log(res.statusText)
            return false
        }
    })
    return promise
}