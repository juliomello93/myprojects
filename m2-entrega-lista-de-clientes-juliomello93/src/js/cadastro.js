
let btnCadastrar = document.querySelector("button")
        
    let botao = btnCadastrar.addEventListener("click", (event) =>{
    event.preventDefault()
             
        
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
    
    
    let data = {
        "nome" : nome.value,
        "email" : email.value,
        "sexo" : sexo.value,
        "idade" : Number(idade.value),
        "cpf" : cpf.value,
        "endereco" : {
            "estado": estado.value,
            "cidade" : cidade.value,
            "bairro" : bairro.value,
            "numero" : numero.value,
            "rua" : rua.value,
            "cep" : cep.value,                 
        }
    }

    Cadastro.cadastrarCliente(data)
    console.log(JSON.stringify(data))
})


export class Cadastro {
    static async cadastrarCliente(data){
        console.log(data)
        const criarCliente = await fetch("https://atividade-api-clientes.herokuapp.com/clientes",{
            method : "POST",
            headers: {"Content-Type" : "application/json"},
            body : JSON.stringify(
            {
            "nome": data.nome,
            "email": data.email,
            "sexo": data.sexo,
            "idade": data.idade,
            "cpf": data.cpf,
            "endereco": {
                "estado": data.endereco.estado,
                "cidade": data.endereco.cidade,
                "bairro": data.endereco.bairro,
                "numero": data.endereco.numero,
                "rua": data.endereco.rua,
                "cep": data.endereco.cep
            }})
        })
        .then(resposta => resposta.json())
        .then(resposta => console.log(resposta))        
        .catch(err => console.log(err))

        return criarCliente
    }
}
