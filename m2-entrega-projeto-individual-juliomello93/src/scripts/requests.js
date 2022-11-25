import { Modal } from "./index.js"
import { Toast } from "./toastify.js"

export class Requests {
    static token = localStorage.getItem("@kenzieEmpresas:token")
    static userId = localStorage.getItem("@kenzieEmpresas:uuid")
    static url = "http://localhost:6278/"
    static headers = {"Content-Type": "application/json",
    Authorization: `Bearer ${this.token}`}

    static empresas(){
        const divCards = document.getElementById("divCards")        

        const listar = fetch(`${this.url}companies`)
        .then(res => res.json())
        .then(res => {
            res.forEach(element => {                
                let div = document.createElement("div")
                div.classList.add("card")
                let h3Nome = document.createElement("h3")
                h3Nome.innerText = `Empresa: ${element.name}`
                let pDescricao = document.createElement("p")
                pDescricao.innerText = `Descrição: ${element.description}`
                div.append(h3Nome,pDescricao)
                divCards.append(div)
                
                return listar
            });
        })
        .catch(err => console.log(err))
    }

    static async login(data){
        await fetch(`${this.url}auth/login`,{
            method: "POST",
            headers:this.headers,
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(res => {
            Toast.create("Login Admin realizado com sucesso", "green")           
            localStorage.setItem("@kenzieEmpresas:token", res.token) 
            localStorage.setItem("@kenzieEmpresas:uuid", res.uuid)           
             if(res.is_admin == true){                
                setTimeout( () => 
                    window.location.replace("src/pages/admin.html"),1000)
                
            }else if(res.is_admin == false){
                localStorage.setItem("@kenzieEmpresas:token", res.token) 
                localStorage.setItem("@kenzieEmpresas:uuid", res.uuid)
                setTimeout( () =>
                 window.location.replace("src/pages/dashboard.html"),1000)
            }
           
        })
        .catch(err => console.log(err))
    }

    static async cadastro(data){
        await fetch(`${this.url}auth/register/user`,{
            method: "POST",
            headers: this.headers,
            body:JSON.stringify({
                password: data.password,
                email: data.email,
                professional_level: data.professional_level,
                username: data.username
            })
        })
        .then(res => res.json())
        .then(res => {
            Toast.create(res.error,"red")
            if(!res.error){
                Toast.create(`Cadastro realizado com sucesso, faça login usando seu e-mail`)
             const idModalCadastro = document.getElementById("modal-cadastro")
             idModalCadastro.remove()
             Modal.creatModalLogin()
             const modalLogin = document.getElementById("modal-login")
             modalLogin.classList.toggle("show-modal")
            }            

        })            
        .catch(err => console.log(err))
    }   

    static async cadastroEmpresa(data){
        await fetch(`${this.url}companies`,{
            method: "POST",
            headers: this.headers,
            body:JSON.stringify({
                name: data.name,
                opening_hours: data.opening_hours,
                description:data.description,
                sector_uuid: data.sector_uuid
            })
        })
        .then(res => res.json())
        .then(res => {
            Toast.create("Cadastro realizado com sucesso", "green")
        })
        .catch(err => {
            Toast.create(`Erro ${err}`, "red")
        })
    }
}

Requests.empresas()