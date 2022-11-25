let select = document.querySelector("select")
let btnDeletar = document.getElementById("btnDeletar")

class Deletar{
    static listar(){
        fetch("https://atividade-api-clientes.herokuapp.com/clientes")
        .then(resposta => resposta.json())
        .then(resposta => {            
            resposta.forEach(cliente => {
            let option = document.createElement("option")
            option.innerText = cliente.nome
            option.value = cliente.nome
            option.id = cliente.id

            select.append(option)
            })
            btnDeletar.addEventListener("click", (event) =>{
            event.preventDefault()
            const opcoes = Array.from(select.options)
            const valores = select.value
            const idCLiente = opcoes.find(element =>         
            element.value === valores).id
            this.delete(idCLiente)          
            })
            
        })
    }
    
    static delete(id){
    const deletarCliente = fetch(`https://atividade-api-clientes.herokuapp.com/clientes/${id}`,{
    method: "DELETE"
    })
    .then(resposta => console.log("Deletou"))    
    .catch(err => console.log(err))
    }

}

Deletar.listar()