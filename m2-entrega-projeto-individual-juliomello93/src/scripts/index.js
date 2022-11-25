import { Requests } from "./requests.js"

const body = document.querySelector("body")
const btnLogin = document.getElementById("btnLogin")
const btnCadastro = document.getElementById("btnCadastro")
const inputBuscar = document.getElementById("inputBuscar")
const main = document.querySelector("main")
const divCards = document.getElementById("divCards")

export class Modal {
    static creatModalLogin(){
        let divModalWrapper = document.createElement("div")
        divModalWrapper.classList.add("modal-wrapper")
        divModalWrapper.id = "modal-login"
        let divModal = document.createElement("div")
        divModal.classList.add("modal")        

        let divModalHeader = document.createElement("div")
        divModalHeader.classList.add("modal-header")
        let h2 = document.createElement("h2")
        h2.classList.add("modal-title")
        h2.innerText = "Login"
        let button = document.createElement("button")
        button.classList.add("modal-close")        
        button.innerText = "X"

        let divModalBody = document.createElement("div")
        divModalBody.classList.add("modal-body")
        let inputEmail = document.createElement("input")
        inputEmail.placeholder = "Digite seu e-mail..."
        inputEmail.type = "Email"
        inputEmail.id = "inputEmailLogin"
        let inputSenha = document.createElement("input")
        inputSenha.placeholder = "Sua senha..."
        inputSenha.type = "password"
        inputSenha.id = "inputSenhaLogin"

        let divButtons = document.createElement("div")
        divButtons.classList.add("containerLoginBtn")
        let btnLogar = document.createElement("button")
        btnLogar.classList.add("btnLogar")
        btnLogar.innerText = "Login"
        let p = document.createElement("p")
        p.innerText = "Ainda não é registrado ?"
        let buttonForward = document.createElement("button")
        buttonForward.innerText = "Ir para cadastro"
        buttonForward.classList.add("btnForwardCadastro")


        divModalHeader.append(h2, button)
        divModalBody.append(inputEmail, inputSenha)
        divButtons.append(btnLogar,p,buttonForward)
        divModal.append(divModalHeader, divModalBody,divButtons)
        divModalWrapper.append(divModal)

        body.append(divModalWrapper)

        button.addEventListener("click" , () => {
            divModalWrapper.remove()
        })

        btnLogar.addEventListener("click", () => {
            const data = {
                password: inputSenha.value,
                email: inputEmail.value,                
            }            
            Requests.login(data)            
        })

        buttonForward.addEventListener("click", () =>{
            const modalLogin = document.getElementById("modal-login")
            modalLogin.remove()
            Modal.creatModalCadastro()        
            const modalCadastro = document.getElementById("modal-cadastro")             
            modalCadastro.classList.toggle("show-modal")
        })

    }

    static creatModalCadastro(){
        let divModalWrapper = document.createElement("div")
        divModalWrapper.classList.add("modal-wrapper")
        divModalWrapper.id = "modal-cadastro"
        let divModal = document.createElement("div")
        divModal.classList.add("modal")      

        let divModalHeader = document.createElement("div")
        divModalHeader.classList.add("modal-header")
        let h2 = document.createElement("h2")
        h2.classList.add("modal-title")
        h2.innerText = "Cadastro"
        let button = document.createElement("button")
        button.classList.add("modal-close")        
        button.innerText = "X"

        let divModalBody = document.createElement("div")
        divModalBody.classList.add("modal-body")
        let inputEmail = document.createElement("input")
        inputEmail.placeholder = "Digite seu e-mail..."
        inputEmail.type = "Email"
        inputEmail.id = "inputEmailCadastro"
        let inputSenha = document.createElement("input")
        inputSenha.placeholder = "Sua senha..."
        inputSenha.type = "password"
        inputSenha.id = "inputSenhaCadastro"
        let inputProfessional = document.createElement("input")
        inputProfessional.placeholder = "Ex: estágio, júnior, pleno, sênior"
        inputProfessional.id = "inputProfessional"
        let inputUserName = document.createElement("input")
        inputUserName.placeholder = "Digite seu nome..."
        inputUserName.id = "inputUserName"

        let divButtons = document.createElement("div")
        divButtons.classList.add("containerLoginBtn")
        let btnCadastrar = document.createElement("button")
        btnCadastrar.classList.add("btnLogar")
        btnCadastrar.innerText = "Cadastrar"
        let p = document.createElement("p")
        p.innerText = "Já é registrado ?"
        let buttonForward = document.createElement("button")
        buttonForward.innerText = "Ir para pagina de login"
        buttonForward.classList.add("btnForwardCadastro")

        divModalHeader.append(h2, button)
        divModalBody.append(inputUserName,inputEmail, inputSenha,inputProfessional)
        divButtons.append(btnCadastrar,p,buttonForward)
        divModal.append(divModalHeader, divModalBody,divButtons)
        divModalWrapper.append(divModal)

        body.append(divModalWrapper)

        button.addEventListener("click" , () => {
            divModalWrapper.remove()
        })

        btnCadastrar.addEventListener("click", () => {
            const data = {
                password: inputSenha.value,
                email: inputEmail.value,
                professional_level: inputProfessional.value,
                username: inputUserName.value
            }           
            Requests.cadastro(data)
                            
        })

        buttonForward.addEventListener("click", () =>{
            const modalCadastro = document.getElementById("modal-cadastro")             
            modalCadastro.remove()           
            Modal.creatModalLogin()
            const modalLogin = document.getElementById("modal-login")
            modalLogin.classList.toggle("show-modal")            
        }) 
    }

}

btnLogin.addEventListener("click", () => {       
    Modal.creatModalLogin()
    const modalLogin = document.getElementById("modal-login")
    modalLogin.classList.toggle("show-modal")
})

btnCadastro.addEventListener("click", () => {
    Modal.creatModalCadastro()
    const modalCadastro = document.getElementById("modal-cadastro")
    modalCadastro.classList.toggle("show-modal")
})

inputBuscar.addEventListener("input", (event) => {
    fetch("http://localhost:6278/companies")
    .then(res => res.json())
    .then(res => {
        if(event.target.value == ""){                                            
            Requests.empresas()                          
        }

        res.forEach(element => {
            if((element.name.toLowerCase()).includes((event.target.value.toLowerCase()))){
                divCards.innerHTML = ""
                let div = document.createElement("div")
                div.classList.add("card")
                let h3Nome = document.createElement("h3")
                h3Nome.innerText = `Empresa: ${element.name}`
                let pDescricao = document.createElement("p")
                pDescricao.innerText = `Descrição: ${element.description}`
                div.append(h3Nome,pDescricao)
                divCards.append(div)
            }
            
        });       
        
    })
})
