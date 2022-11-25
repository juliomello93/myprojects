

export class Requests {
    static baseUrl = "https://m2-rede-social.herokuapp.com/api"
    static token = localStorage.getItem("@kenzieSocial:token");
    static userId = localStorage.getItem("@kenzieSocial:uuid");
    static headers = {
    "Content-Type" : "application/json",
    Authorization: `Token ${this.token}`
    }

    static register(data){        
        const newUser = fetch(`${this.baseUrl}/users/`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify(data)
        })
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }

    static async login(data){
        const login = await fetch(`${this.baseUrl}/users/login/`,{
            method: "POST",
            headers: this.headers,
            body:JSON.stringify(data)
        })
        .then(res => res.json())
        .then(res => {            
            localStorage.setItem("@kenzieSocial:token", res.token);
            localStorage.setItem("@kenzieSocial:uuid", res.user_uuid);            
            window.location.replace("src/pages/homepage.html")
        })
    }
}

// Colocar Toast
// Verificar se tem TOKEN!!!!!
// UNFOLLOW
//ASIDE FIXO
