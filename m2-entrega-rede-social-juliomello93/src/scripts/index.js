import { Requests } from "./api.js"

const btnModalLogin = document.getElementById("btnModalLogin")
const modalWrapperLogin = document.getElementById("modal-login")
const modalCloseLogin = document.getElementById("modal-close-login")

const modalWrapperCadastro = document.getElementById("modal-cadastro")
const btnModalCadastro = document.getElementById("btnModalCadastro")
const modalCloseCadastro = document.getElementById("modal-close-cadastro")

btnModalLogin.addEventListener("click", () => {
    modalWrapperLogin.classList.toggle("show-modal")
})

modalCloseLogin.addEventListener("click", () => {
    modalWrapperLogin.classList.toggle("show-modal")
})

btnModalCadastro.addEventListener("click", () => {
    modalWrapperCadastro.classList.toggle("show-modal")
})

modalCloseCadastro.addEventListener("click" , () => {
    modalWrapperCadastro.classList.toggle("show-modal")
})


const btnRegister = document.getElementById("btnRegister")

btnRegister.addEventListener("click", () => {
    let inputNomeRegister = document.getElementById("inputNomeRegister")
    let inputEmailRegister = document.getElementById("inputEmailRegister")
    let inputSenhaRegister = document.getElementById("inputSenhaRegister")
    let inputWorkRegister = document.getElementById("inputWorkRegister")
    let inputUrlRegister = document.getElementById("inputUrlRegister")   
    
    const data = {
        username: inputNomeRegister.value,
        email: inputEmailRegister.value,
        password: inputSenhaRegister.value,
        work_at: inputWorkRegister.value,
        image: inputUrlRegister.value
    }
    console.log(data)

    Requests.register(data)
})


const btnLogar = document.getElementById("btnLogar")

btnLogar.addEventListener("click", () => {
    let inputEmailLogin = document.getElementById("inputEmailLogin")
    let inputSenhaLogin = document.getElementById("inputSenhaLogin")

    const data = {
        email: inputEmailLogin.value,
        password: inputSenhaLogin.value
    }

    Requests.login(data)
    
})


const btnForwardCadastro = document.getElementById("btnForwardCadastro")

btnForwardCadastro.addEventListener("click" , () => {
    modalWrapperLogin.classList.toggle("show-modal")
    modalWrapperCadastro.classList.toggle("show-modal")
})

const btnForwardLogin = document.getElementById("btnForwardLogin")
btnForwardLogin.addEventListener("click", () => {
    modalWrapperCadastro.classList.toggle("show-modal")
    modalWrapperLogin.classList.toggle("show-modal")
})
