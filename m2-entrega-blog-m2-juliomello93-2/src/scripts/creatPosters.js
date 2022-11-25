import { Api } from "./index.js"

const main = document.querySelector("main")
const body = document.querySelector("body")
const meuId = localStorage.getItem("@blogKenzie:userId")



class Posts {
    static urlBase = "https://blog-m2.herokuapp.com"
    static token = localStorage.getItem("@blogKenzie:token") || ""
    static headers = {
        "Content-Type":"application/json",
        Authorization: `Bearer ${this.token}`
        }

    static renderCards(){        
        const cards = fetch(`${this.urlBase}/posts?page=1`, {
            method:"GET",
            headers: this.headers        
        })
        .then(resposta => resposta.json())
        .then(resposta => {            
            resposta.data.forEach(card => { 
                let div = document.createElement("div")
                div.classList.add("containerPosts")                          
                let img = document.createElement("img")
                img.src = card.user.avatarUrl
                let h3 = document.createElement("h3")
                h3 = card.user.username
                let pContent = document.createElement("p")
                pContent.innerText = card.content
                let pData = document.createElement("p")
                let diaDaCriacao = new Date(card.createdAt)
                pData.innerText = `${diaDaCriacao.getDay()}/${diaDaCriacao.getMonth()}/${diaDaCriacao.getFullYear()}`
                let divBotoes = document.createElement("div")
                divBotoes.classList.add("containerBotoes")
                let buttonEdit = document.createElement("button")
                let imgEdit = document.createElement("img")
                imgEdit.src = "../img/edit 1.png"
                let buttonDelete = document.createElement("button")
                buttonDelete.id = "btnDelete"
                let imgDelete = document.createElement("img")
                imgDelete.src = "../img/trash-bin 1.png"


                buttonDelete.addEventListener("click", () => {
                let divContainerModalDelete = document.createElement("div")
                divContainerModalDelete.classList.add("divContainerModal")
                let divInformacao = document.createElement("div")
                divInformacao.classList.add("divInformacao")
                let h2Modal = document.createElement("h2")
                h2Modal.innerText = "Deseja deletar esse post ?"
                let btnDeletar = document.createElement("button")
                btnDeletar.id = "btnDeletar"
                btnDeletar.innerText = "Deletar"

                divInformacao.append(h2Modal,btnDeletar)
                divContainerModalDelete.append(divInformacao)
                body.append(divContainerModalDelete)

                btnDeletar.addEventListener("click", () => {
                    Posts.deletePost(card.id)
                })
                })

                
                div.append(img,h3,pContent,pData)

                if(card.user.id == meuId){                    
                    buttonEdit.append(imgEdit)
                    buttonDelete.append(imgDelete)
                    divBotoes.append(buttonEdit, buttonDelete)
                    div.append(divBotoes)  
                }               
                
                buttonEdit.addEventListener("click", (event) =>{
                    event.preventDefault()

                    let divContainerModal = document.createElement("div")
                    divContainerModal.classList.add("divContainerModal")
                    let divModal = document.createElement("div")
                    divModal.classList.add("divModal")
                    let h2Modal = document.createElement("h2")
                    h2Modal.innerText = "Editar"
                    let inputModal = document.createElement("input")
                    inputModal.placeholder = "Digite seu texto..."
                    inputModal.id = "inputModal"
                    let btnEnviar = document.createElement("button")
                    btnEnviar.innerText = "Enviar"
                    
                    
                    divModal.append(h2Modal,inputModal,btnEnviar)
                    divContainerModal.append(divModal)
                    body.append(divContainerModal)
                    

                    btnEnviar.addEventListener("click", () => {
                        Posts.editPost(card.id)
                        divModal.style.display = "none"
                        divContainerModal.style.display= "none"                        
                    })
                    


                })

                main.append(div)
            });
            
        })
        
    }

    static creatPost(){
        const btnPost = document.getElementById("btnPost")
        const inputPost = document.getElementById("inputPost")
        btnPost.addEventListener("click", async () =>{           
            const novoPost = await fetch(`${this.urlBase}/posts`,{
                method: "POST",
                headers: this.headers,
                body:JSON.stringify({
                    content: inputPost.value
                })
            })
            .then(resposta => resposta.json())
            .then(resposta => window.location.reload())
            .catch(err => console.log(err))
        })
    }
    

    static editPost(id){
        const inputValue = document.getElementById("inputModal")
        console.log(id)              
        const meuPost = fetch(`${this.urlBase}/posts/${id}`,{
            method: "PATCH",
            headers: this.headers,
            body:JSON.stringify({
                content: inputValue.value
            })
        })
        .then(res => res.json())
        .then(res => window.location.reload())
        .catch(err => console.log(err))
        return meuPost
    }

    static deletePost(id){        
        const deletarPost = fetch(`${this.urlBase}/posts/${id}`,{
           method: "DELETE",
           headers: this.headers                      
        })
        .then(resposta => console.log(resposta))
        .then(resposta => {
            window.location.reload()  
        })        
        .catch(err => console.log(err))
            
    }
}


Posts.renderCards()
Posts.creatPost()
