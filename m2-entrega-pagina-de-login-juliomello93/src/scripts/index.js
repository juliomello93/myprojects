let btnClose = document.getElementById("btnClose")
let divModalContainer = document.getElementById("divModalContainer")
let facaCadastro = document.getElementById("facaCadastro")
let btnSenha = document.getElementById("btnSenha")

class Modais {
    static creatModal (){        
        const body = document.querySelector("body")

        let divModalContainer = document.createElement("div")
        divModalContainer.classList.add("modalContainer")
        divModalContainer.id = "divModalContainer"
        

        let spanModalBackground = document.createElement("span")
        spanModalBackground.classList.add("modalBackground")

        let divCabecalho = document.createElement("div")
        divCabecalho.classList.add("divCabecalho")
        let h3 = document.createElement("h3")
        h3.innerText = "Cadastre-se"
        let btnX = document.createElement("button")
        btnX.innerText = "X"
        btnX.id = "btnClose"

        let divInformacao = document.createElement("div")
        divInformacao.classList.add("divInformacao")

        let inputNome = document.createElement("input")
        inputNome.placeholder = "Digite seu nome completo..."
        inputNome.id = "inputNome"
        let inputEmail = document.createElement("input")
        inputEmail.type = "email"
        inputEmail.id = "inputEmail"
        inputEmail.placeholder = "Digite seu email ..."
        let inputSenha = document.createElement("input")
        inputSenha.type = "password"
        inputSenha.placeholder = "Digite sua senha..."
        let btnCadastrar = document.createElement("button")
        btnCadastrar.id = "btnCadastrar"
        btnCadastrar.innerText = "Cadastrar"

        divInformacao.append(inputNome,inputEmail,inputSenha,btnCadastrar)
        divCabecalho.append(h3,btnX)
        divModalContainer.append(spanModalBackground,divCabecalho,divInformacao)
        body.append(divModalContainer)        

        
        btnX.addEventListener("click" , () => {
            divModalContainer.remove()
        })

    }

    
    static creatModalSenha(){
        const body = document.querySelector("body")

        let divModalContainer = document.createElement("div")
        divModalContainer.classList.add("modalContainer")
        divModalContainer.id = "divModalContainer" 
        let spanModalBackground = document.createElement("span")
        spanModalBackground.classList.add("modalBackground")
        let divCabecalho = document.createElement("div")
        divCabecalho.classList.add("divCabecalho")
        let h3 = document.createElement("h3")
        h3.innerText = "Recuperar Senha ?"
        let btnX = document.createElement("button")
        btnX.innerText = "X"
        btnX.id = "btnClose"
        
        let divInformacao = document.createElement("div")
        divInformacao.classList.add("divInformacao")
        let inputEmail = document.createElement("input")
        inputEmail.type = "email"
        inputEmail.id = "inputEmail"
        inputEmail.placeholder = "Digite seu email ..."     
        let inputNome = document.createElement("input")
        inputNome.placeholder = "Digite seu nome completo..."
        inputNome.id = "inputNome"
        let btnRecuperar = document.createElement("button")
        btnRecuperar.innerText = "Recuperar"


        divCabecalho.append(h3,btnX)
        divInformacao.append(inputEmail, inputNome,btnRecuperar)
        divModalContainer.append(spanModalBackground, divCabecalho,divInformacao)
        body.append(divModalContainer)
        
        btnX.addEventListener("click" , () => {
            divModalContainer.remove()
        })

    }

    static showModal(){
        facaCadastro.addEventListener("click", () => {
            Modais.creatModal()
        })

        btnSenha.addEventListener("click", () =>{
            Modais.creatModalSenha()
        })
    }
}


Modais.showModal()
