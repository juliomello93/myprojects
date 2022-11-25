import { Toast } from "./toastify.js"

class Dashboard {
    static url = "http://localhost:6278/"
    static token = localStorage.getItem("@kenzieEmpresas:token")
    static userId = localStorage.getItem("@kenzieEmpresas:uuid")
    static headers = {"Content-Type": "application/json",
    Authorization: `Bearer ${this.token}`}

    static sair(){
        const btnSair = document.getElementById("btnSair")
        btnSair.addEventListener("click", () =>{
            localStorage.clear()
            window.location.replace("../../index.html")
        })
    }

    static minhasInformacoes(){
        const divProfile = document.getElementById("profile")
        fetch(`${this.url}users/profile`,{
            method: "GET",
            headers: this.headers,
        })
        .then(res => res.json())
        .then(res => {
            let div = document.createElement("div")
            let pNome = document.createElement("p")
            pNome.innerText = `Nome: ${res.username}`
            let pProfessionalLevel = document.createElement("p")
            pProfessionalLevel.innerText = `Nível Profissional: ${res.professional_level}`
            let pEmail = document.createElement("p")
            pEmail.innerText = `Email: ${res.email}`

            div.append(pNome,pEmail,pProfessionalLevel)
            divProfile.append(div)
        })
    }

    static empresa(){
        const divEmpresas = document.getElementById("minhaEmpresa")
        fetch(`${this.url}users/departments`,{
            headers:this.headers,
        })
        .then(res => res.json())
        .then(res => {
            let div = document.createElement("div")
                let pNome = document.createElement("p")
                pNome.innerText = `Nome: ${res.name}`
                let pDesc = document.createElement("p")
                pDesc.innerText = `Descrição: ${res.description}`
                let pOpening = document.createElement("p")
                pOpening.innerText = `Abre as: ${res.opening_hours}`

                div.append(pNome,pDesc,pOpening)
                divEmpresas.append(div)
        })
    }

    static coWorkers(){
        const divWorkers = document.getElementById("divWorkers")
        fetch(`${this.url}users/departments/coworkers`,{
            method:"GET",
            headers: this.headers,
        })
        .then(res => res.json())
        .then(res => {            
            res.forEach(element => {
                element.users.forEach(usuario => {                    
                    let div = document.createElement("div")
                    let pNome = document.createElement("p")
                    pNome.innerText = `Nome: ${usuario.username}`
                    let pProfessionalLevel = document.createElement("p")
                    pProfessionalLevel.innerText = `Nível profissional: ${usuario.professional_level}`
                    let pEmail = document.createElement("p")
                    pEmail.innerText = `E-mail: ${usuario.email}`

                    div.append(pNome,pEmail,pProfessionalLevel)
                    divWorkers.append(div)
                })
            })
               
        })
    }

    static departamento(){
        const meuDepartamento = document.getElementById("meuDepartamento")
        fetch(`${this.url}users/departments`,{
            headers:this.headers,
        })
        .then(res => res.json())
        .then(res => {            
            res.departments.forEach(element => {                
                let div = document.createElement("div")
                let pNome = document.createElement("p")
                pNome.innerText = `Nome: ${element.name}`
                let pDesc = document.createElement("p")
                pDesc.innerText = `Descrição: ${element.description}`

                div.append(pNome,pDesc)
                meuDepartamento.append(div)
            });
            
        })
    }

    static editarInfos(){
        const body = document.querySelector("body")
        const btnEditar = document.getElementById("btnMinhasInfos")
        btnEditar.addEventListener("click", () => {
            let divModalWrapper = document.createElement("div")
            divModalWrapper.classList.add("modal-wrapper")
            let divModal = document.createElement("div")
            divModal.classList.add("modal")
            let divModalHeader = document.createElement("div")
            divModalHeader.classList.add("modal-header")
            let divModalBody = document.createElement("div")
            divModalBody.classList.add("modal-body")
            let divModalButton = document.createElement("div")
            divModalButton.classList.add("containerLoginBtn")
            //header
            let h2 = document.createElement("h2")
            h2.classList.add("modal-title")
            h2.innerText = "Atualize seu cadastro"
            let button = document.createElement("button")
            button.classList.add("modal-close")
            button.innerText = "X"
            //body
            let inputNome = document.createElement("input")
            inputNome.placeholder = "Digite seu nome"
            let inputEmail = document.createElement("input")
            inputEmail.placeholder = "Digite o novo e-mail"
            let inputSenha = document.createElement("input")
            inputSenha.type = "password"
            inputSenha.placeholder = "Digite sua nova senha"

            let btnAtualizar = document.createElement("button")
            btnAtualizar.classList.add("btnLogar")
            btnAtualizar.innerText = "Atualizar Perfil"
            btnAtualizar.id = "btnAtualizar"

            divModalButton.append(btnAtualizar)
            divModalBody.append(inputNome,inputEmail, inputSenha)
            divModalHeader.append(h2, button)
            divModal.append(divModalHeader,divModalBody,divModalButton)
            divModalWrapper.append(divModal)
            body.append(divModalWrapper)

            divModalWrapper.classList.toggle("show-modal")

            button.addEventListener("click", () => {
                divModalWrapper.remove()
            })

            btnAtualizar.addEventListener("click", () =>{
                fetch(`${this.url}users`,{
                    method:"PATCH",
                    headers:this.headers,
                    body: JSON.stringify({
                        username: inputNome.value,
                        email: inputEmail.value,
                        password: inputSenha.value
                            })
                })
                .then(res => res.json())
                .then(res => {
                    Toast.create("Usuário Atualizado", "green")
                    setTimeout(divModalWrapper.remove(),1000)
                })
                .catch(err => {
                    Toast.create(err, "red")
                })
            })
        })
    }
}

Dashboard.sair()
Dashboard.minhasInformacoes()
Dashboard.empresa()
Dashboard.coWorkers()
Dashboard.departamento()
Dashboard.editarInfos()
