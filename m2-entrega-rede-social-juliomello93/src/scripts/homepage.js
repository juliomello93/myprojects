const main = document.querySelector("main")
const buttonPost = document.getElementById("buttonPost")
const user = localStorage.getItem("@kenzieSocial:uuid")
const body = document.querySelector("body")

export class Homepage {    
    static baseUrl = "https://m2-rede-social.herokuapp.com/api"
    static token = localStorage.getItem("@kenzieSocial:token");
    static userId = localStorage.getItem("@kenzieSocial:uuid");
    static headers = {
    "Content-Type" : "application/json",
    Authorization: `Token ${this.token}`
    }
    
    static atualizarPerfil(user){
        const imgUser = document.getElementById("imgUser")
        const nameUser = document.getElementById("nameUser")
        const work_atUser = document.getElementById("work_atUser")
        const followers = document.getElementById("followers")
        const attUser = fetch(`${this.baseUrl}/users/${user}/`,{
            method: "GET",
            headers: this.headers
        })
        .then(res => res.json())     
        .then(res => {                        
            imgUser.src = res.image
            imgUser.classList.add("imagemUser")
            nameUser.innerText = res.username            
            work_atUser.innerText = res.work_at
            followers.innerText = `${res.followers.length} seguidores`
        })
        .catch(err => console.log(err))
    }

    static sugestions(){
        const divUsers = document.getElementById("divUsersFollow")
        const usuarios = fetch(`${this.baseUrl}/users/`,{
            method:"GET",
            headers: this.headers
        })
        .then(res => res.json())
        .then(res => {
            res.results.forEach(elemento => {                                
                let img = document.createElement("img")
                img.classList.add("imagemUser")
                img.src = elemento.image
                let divUserInfos = document.createElement("div")
                divUserInfos.classList.add("userInfos")
                let divTextos = document.createElement("div")
                divTextos.classList.add("divTextos")
                let divUsuario = document.createElement("div")
                divUsuario.append(img,divTextos)
                divUsuario.classList.add("divUsuario")
                let h3 = document.createElement("h3")
                h3.innerText = elemento.username
                let p = document.createElement("p")
                p.innerText = elemento.work_at
                let divButton = document.createElement("div")
                divButton.classList.add("divButtonFollow")
                let button = document.createElement("button")                
                button.innerText = "Seguir"
                button.id = elemento.uuid
                
                
                const arrayFollowers = elemento.followers.forEach(follower => {
                    if(this.userId == follower.followers_users_id.uuid){
                        button.classList.add("following")
                        button.innerText = "Seguindo"
                    }               
                    
                })

                if(button.classList == "following"){
                    
                    let idFollow = ""
                    elemento.followers.forEach(follower => {                        
                        if(follower.followers_users_id == this.userId){
                            idFollow = follower.uuid
                        }
                    })
                    button.addEventListener("click", () => {
                        fetch(`${this.baseUrl}/users/unfollow/${idFollow}/`,{
                            method: "DELETE",
                            headers: this.headers
                        })
                        .then(res => console.log(res))
                        .then(res => {
                            button.classList.remove("following")
                            button.innerText = "Seguir"                           
                        })
                        .catch(err => console.log(err))
                    })
                }           
              
                    
                    button.addEventListener("click", (event) => {
                            Homepage.followUser(event.target.id)
                            button.classList.toggle("following")
                            button.innerText = "Seguindo"
                    })
                    
                    
                

                divTextos.append(h3,p)
                divUserInfos.append(divUsuario,divButton)
                divButton.append(button)
                divUsers.append(divUserInfos)
            })
            
        })
        .catch(err => console.log(err))
    }

    static renderPosts(){
        const posts = fetch(`${this.baseUrl}/posts/`,{
           method: "GET",
           headers: this.headers
        })
        .then(res => res.json())
        .then(res => {
            res.results.forEach(element => {                                                                                        
            let divPostagens = document.createElement("div")
            divPostagens.classList.add("divPostagens")
            let div = document.createElement("div")
            div.classList.add("boxImg")
            let img = document.createElement("img")
            img.src = element.author.image
            img.classList.add("imagemUser")
            let divUser = document.createElement("div")
            let h3 = document.createElement("h3")
            h3.innerText = element.author.username
            let p = document.createElement("p")
            p.innerText = element.author.work_at
            divUser.append(h3,p)
            div.append(img,divUser)
            let divPost = document.createElement("div")
            divPost.classList.add("divPost")
            let h2 = document.createElement("h2")
            h2.innerText = element.title
            let pDescription = document.createElement("p")
            pDescription.innerText = element.description
            divPost.append(h2,pDescription)

            let divButton = document.createElement("div")
            divButton.classList.add("divButton")
            let btnAbrirPost = document.createElement("button")
            btnAbrirPost.innerText = "Abrir Post"
            btnAbrirPost.id = element.uuid
            let imgLike = document.createElement("img")
            imgLike.id = "imgLike"
            let spanLikes = document.createElement("span")
            spanLikes.innerText = element.likes.length
            imgLike.src = "../assets/heartBlack.png"            
            

            element.likes.forEach(usuario => {                               
                if(this.userId == usuario.user.uuid){
                    imgLike.src = "../assets/heartRed.png"
                    imgLike.classList.toggle("curtida")
                }
            })


            imgLike.addEventListener("click", () => {
                Homepage.likePost(element)
                imgLike.src = "../assets/heartRed.png"
                imgLike.classList.toggle("curtida")
            })        


            divButton.append(btnAbrirPost,imgLike,spanLikes)            
            divPostagens.append(div,divPost,divButton)
            main.append(divPostagens)
            
            btnAbrirPost.addEventListener("click", () => {
                Homepage.creatModal(element)
                let modal = document.querySelector(".modal-wrapper")
                modal.classList.toggle("show-modal")              
            })
            });
            
        })
        .catch(err => console.log(err))
    }

    static postagem(data){
        console.log(data)
        const postar = fetch(`${this.baseUrl}/posts/`, {
            method: "POST",
            headers:this.headers,
            body:JSON.stringify(data)
         })
         .then(res => res.json())
         .then(res => console.log(res))
         .catch(err => console.log(err))           
    }

    static creatModal(post){
        console.log(post)          
        let divUser = document.createElement("div")
        let divFlex = document.createElement("div")
        divFlex.classList.add("divFlex")
        let img = document.createElement("img")
        img.src = post.author.image
        img.classList.add("imagemUser")
        let divTextos = document.createElement("div")
        divTextos.classList.add("divTextos")
        let h3User = document.createElement("h3")
        h3User.innerText = post.author.username
        let pWork = document.createElement("p")
        pWork.innerText = post.author.work_at
        divTextos.append(h3User,pWork)
        

        let div =  document.createElement("div")
        div.classList.add("modal-wrapper")
        let divModal = document.createElement("div")
        divModal.classList.add("modal")
        let divHeader = document.createElement("div")
        divHeader.classList.add("modal-header")
        let h3 = document.createElement("h3")
        h3.classList.add("modal-title")
        h3.innerText = post.title
        let button = document.createElement("button")
        button.innerText = "X"
        button.classList.add("modal-close")
        button.id = "modal-close-Post"
        let divModalBody = document.createElement("div")
        divModalBody.classList.add("modal-body")
        let p = document.createElement("p")
        p.innerText = post.description

        divFlex.append(img,divTextos, button)
        divHeader.append(h3)
        divUser.append(divFlex)
        divModal.append(divUser, divHeader,p)
        div.append(divModal)
        body.append(div)

        button.addEventListener("click", () => {
            let modal = document.querySelector(".modal-wrapper")
            modal.remove()
        })
    }

    static followUser(idFollow){
        const btnFollow = document.getElementById("btnFollow")
        const follow = fetch(`${this.baseUrl}/users/follow/`,{
            method: "POST",
            headers: this.headers,
            body: JSON.stringify({
                following_users_uuid : idFollow 
            })
        })
        .then(res => console.log(res))                      
        .catch(err => console.log(err))
        return follow
    }

    static unFollow(id){
        const btnUnfollow = document.querySelector(".following")
        const unFollow = fetch(`${this.baseUrl}/users/unfollow/${id}/`,{
            method: "DELETE",
            headers: this.headers
        })
    }

    static likePost(post) {
        const imgLike = document.getElementById("imgLike")
        if(imgLike.classList == "curtida"){          
            let idLike = ""
            post.likes.forEach(elemento => {                
            if(elemento.user.uuid == this.userId){
                idLike = elemento.uuid
            }            
            })

            const deslike = fetch(`${this.baseUrl}/likes/${idLike}/`,{
                method: "DELETE",
                headers: this.headers
            })
            .then(res => console.log(res))
            .then(res => {
                imgLike.classList.toggle("curtida")
                imgLike.src = "../assets/heartBlack.png"
            })
            .catch(err => console.log(err))
            return deslike            
        }

        const like = fetch (`${this.baseUrl}/likes/`,{
            method: "POST",
            headers:this.headers,
            body:JSON.stringify({
                post_uuid: post.uuid
            })
        })
        .then(res => console.log(res))        
        .catch(err => console.log(err))
        return like
    }    
        
}
    


Homepage.renderPosts()
Homepage.atualizarPerfil(user)
Homepage.sugestions()


buttonPost.addEventListener("click", () => {
    const inputPostTitle = document.getElementById("inputPostTitle")
    const inputPostDescription = document.getElementById("inputPostDescription")
    
    let data = {
        title : inputPostTitle.value,
        description: inputPostDescription.value
        }
        
    Homepage.postagem(data)    
})

const buttonLeave = document.getElementById("buttonLeave")
buttonLeave.addEventListener("click", () => {
    localStorage.clear()
    window.location.replace("/index.html")
})

