let select = document.querySelector("select")
let btnBuscar = document.getElementById("btnBuscar")

let btnAtualizar = document.getElementById("atualizarCliente")

function clienteNovo(idCLiente){
    btnAtualizar.addEventListener("click", (event) =>{
        event.preventDefault()
        SelecionarCliente.atualizarCliente(idCLiente)
    })
}



class SelecionarCliente {
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

        btnBuscar.addEventListener("click", (event) =>{
        event.preventDefault()
        const opcoes = Array.from(select.options)
        const valores = select.value
        const idCLiente = opcoes.find(element =>         
        element.value === valores
        ).id
        this.buscarCliente(idCLiente)
        clienteNovo(idCLiente)
        })
    })        
    }

    static buscarCliente(id){
        fetch(`https://atividade-api-clientes.herokuapp.com/clientes/${id}`)
        .then(resposta => resposta.json())
        .then(resposta => {
        let inputNome = document.getElementById("inputNome")
        inputNome.value = resposta.nome
        let inputEmail = document.getElementById("inputEmail")
        inputEmail.value = resposta.email
        let inputIdade = document.getElementById("inputIdade")
        inputIdade.value = resposta.idade
        let inputCpf = document.getElementById("inputCpf")
        inputCpf.value = resposta.cpf
        let inputSexo = document.getElementById("inputSexo")
        inputSexo.value = resposta.sexo
        let inputCep = document.getElementById("inputCep")
        inputCep.value = resposta.endereco.cep
        let inputRua = document.getElementById("inputRua")
        inputRua.value = resposta.endereco.rua
        let inputNumero = document.getElementById("inputNumero")
        inputNumero.value = resposta.endereco.numero
        let inputBairro = document.getElementById("inputBairro")
        inputBairro.value = resposta.endereco.bairro
        let inputCidade = document.getElementById("inputCidade")
        inputCidade.value = resposta.endereco.inputCidade
        let inputEstado = document.getElementById("inputEstado")
        inputEstado.value = resposta.endereco.estado

        })
        .catch(err => console.log(err))
    }

    static atualizarCliente(id){
        console.log(id)
        let nome = document.getElementById("inputNome")
        let email = document.getElementById("inputEmail")
        let idade = document.getElementById("inputIdade")
        let cpf = document.getElementById("inputCpf")
        let sexo = document.getElementById("inputSexo")   
        let estado = document.getElementById("inputEstado")
        let cidade = document.getElementById("inputCidade")
        let bairro = document.getElementById("inputBairro")
        let numero = document.getElementById("inputNumero")
        let rua = document.getElementById("inputRua")
        let cep = document.getElementById("inputCep")
        
        console.log(nome.value)
        const novosDados = fetch(`https://atividade-api-clientes.herokuapp.com/clientes/${id}`,{
            method: "PATCH",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({
                "nome": nome.value,
                "email": email.value,
                "idade": idade.value,
                "cpf": cpf.value,
                "sexo": sexo.value,
                "endereco":{
                    "estado": estado.value,
                    "cidade": cidade.value,
                    "bairro": bairro.value,
                    "numero": numero.value,
                    "rua": rua.value,
                    "cep": cep.value,
                }
                
            })
        })
        .then(resp => console.log(resp))        
        .catch(err => console.log(err))
    }
}
SelecionarCliente.listar()
