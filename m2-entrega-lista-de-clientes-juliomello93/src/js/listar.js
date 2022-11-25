let ul = document.querySelector(".container")


export class Api {
  
    static async listarClientes(){
        const baseDeDados = await fetch("https://atividade-api-clientes.herokuapp.com/clientes")
        .then((resposta) => resposta.json())

        .then((resposta) => {

        resposta.forEach(element => {
        
        let li = document.createElement("li")
        li.classList.add("card")
        let h2 = document.createElement("h2")
        h2.innerText = element.nome

        let divDados = document.createElement("div")        
        let h3 = document.createElement("h3")
        h3.innerText = "Dados Pessoais"
        let email = document.createElement("p")
        email.innerText = element.email
        let pIdade = document.createElement("p")
        pIdade.innerText = element.idade
        let pCpf = document.createElement("p")
        pCpf.innerText = element.cpf

        let divEndereco = document.createElement("div")
        let h3Endereco = document.createElement("h3")
        h3Endereco.innerText = "Endereço"
        let pCep = document.createElement("p")
        pCep.innerText = element.endereco.cep
        let pEstado = document.createElement("p")
        pEstado.innerText = element.endereco.estado
        let pCidade = document.createElement("p")
        pCidade.innerText = element.endereco.cidade
        let pBairro = document.createElement("p")
        pBairro.innerText = element.endereco.bairro
        let pRua = document.createElement("p")
        pRua.innerText = element.endereco.rua
        let pNumero = document.createElement("p")
        pNumero.innerText = element.endereco.numero

        divDados.append(h3,email,pIdade,pCpf)  
        divEndereco.append(pCep,pRua,pNumero,pBairro,pCidade,pEstado)
        li.append(divDados,divEndereco)
        ul.append(li)

        });
        })
        .catch(err => console.log(err))
        
    }
     
    

}


Api.listarClientes()

