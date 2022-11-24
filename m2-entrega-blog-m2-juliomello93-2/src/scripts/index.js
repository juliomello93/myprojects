


export class Api {
    static urlBase = "https://blog-m2.herokuapp.com"
    static token = localStorage.getItem("@blogKenzie:token") || ""
    static headers = {
        "Content-Type":"application/json",
        Authorization: `Bearer${this.token}`
    }
    
    static async login(user) {
        const userLogin = await fetch(`${this.urlBase}/users/login`,{
            method: "POST",
            headers: this.headers,
            body:JSON.stringify(user)
        })
        .then(resposta => resposta.json())
        .then(resposta => {           
            localStorage.setItem("@blogKenzie:token", resposta.token)
            localStorage.setItem("@blogKenzie:userId", resposta.userId)            
            window.location.assign("src/pages/homePage.html")
        })
        .catch(erro => console.log(erro))
        return userLogin
    }

    static async createUser(body){
        const novoUsuario = await fetch(`${this.urlBase}/users/register`,{
            method:"POST",
            headers:this.headers,
            body:JSON.stringify(body)
        })
        .then(resposta => resposta.json())
        .then(resposta => {                       
            //window.location.assign("../../index.html")
         return resposta
        })
        .catch(erro => console.log(erro))
    }
    
}

