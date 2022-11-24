import { Api } from "./index.js"

class CadastroUsuario {
    static criarNovoUsuario(){
        const inputNome = document.getElementById("inputNome")
        const inputCadastroEmail = document.getElementById("inputCadastroEmail")
        const inputFoto = document.getElementById("inputFoto")
        const inputCadastroPassword = document.getElementById("inputCadastroPassword")
        const btnCadastro = document.getElementById("btnCadastro")

        btnCadastro.addEventListener("click", async (event) => {
            event.preventDefault()
            const data = {
                username: inputNome.value,
                email: inputCadastroEmail.value,
                avatarUrl: inputFoto.value,
                password: inputCadastroPassword.value
            }
            console.log(data)
            
            await Api.createUser(data)
        })

    }
    
}

CadastroUsuario.criarNovoUsuario()
