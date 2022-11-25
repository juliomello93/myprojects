import { Api } from "./index.js"

class LoginPage{
    static rendezirarPagina(){
        const token = localStorage.getItem("@kenzieStore:token")
        if(token){
            window.location.assign("src/pages/homePage.html")
        }

        const inputEmail = document.getElementById("inputEmail")
        const inputPassword = document.getElementById("inputPassword")
        const btnLogin = document.getElementById("btnLogin")

        btnLogin.addEventListener("click", (event) =>{
            event.preventDefault()

            const user = {
                email: inputEmail.value,
                password: inputPassword.value
            }

            Api.login(user)
        })
    }

}

LoginPage.rendezirarPagina()
