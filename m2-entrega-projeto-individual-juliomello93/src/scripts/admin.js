import { Toast } from "./toastify.js"

const body = document.querySelector("body")

class Admin {
    static token = localStorage.getItem("@kenzieEmpresas:token")
    static userId = localStorage.getItem("@kenzieEmpresas:uuid")
    static url = "http://localhost:6278/"
    static headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${this.token}`
        }

    static listarEmpresas(){
        const divEmpresas = document.getElementById("cardEmpresas")
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
                let pOpening = document.createElement("p")
                pOpening.classList.add("horarioAbertura")
                pOpening.innerText = `Abre as: ${element.opening_hours}`

                
                //let divBotoes = document.createElement("div")
                let btnInfos = document.createElement("button")
                btnInfos.innerText = "+ Informações"                
                btnInfos.id = element.uuid               

                //divBotoes.append(btnInfos)
                //div.append(divBotoes)
                div.append(h3Nome,pDescricao,pOpening,btnInfos)
                divEmpresas.append(div)
                
                btnInfos.addEventListener("click", () => {
                    let divModalWrapper = document.createElement("div")
                    divModalWrapper.classList.add("modal-wrapper")
                    let divModal = document.createElement("div")
                    divModal.classList.add("modal")
                    let divModalHeader = document.createElement("div")
                    divModalHeader.classList.add("modal-header")
                    let divModalBody = document.createElement("div")
                    divModalBody.classList.add("modal-body")
                    let divModalButton = document.createElement("div")
                    divModalButton.classList.add("containerLoginBtn")

                    let h2 = document.createElement("h2")
                    h2.classList.add("modal-title")
                    h2.innerText = "Departamentos"
                    let button = document.createElement("button")
                    button.classList.add("modal-close")
                    button.innerText = "X"

                    divModalHeader.append(h2, button)
                    divModal.append(divModalHeader,divModalBody,divModalButton)
                    divModalWrapper.append(divModal)

                    body.append(divModalWrapper)
                    divModalWrapper.classList.toggle("show-modal")
                    
                    button.addEventListener("click", () => {
                        divModalWrapper.remove()
                    })

                    fetch(`${this.url}departments/${btnInfos.id}`,{
                        method: "GET",
                        headers: this.headers
                    })
                    .then(res => res.json())
                    .then(res => {
                        if(res == ""){
                            let h2 = document.createElement("h2")
                            h2.innerText = "Empresa sem departamentos"
                            h2.classList.add("vazio")
                            divModalBody.append(h2)                            
                        }                   
                        res.forEach(departamento => {
                        let div = document.createElement("div")
                        div.classList.add("divDepartamentos")
                        let pNome = document.createElement("p")
                        let pDesc = document.createElement("p")
                        pNome.innerText = `Departamento: ${departamento.name}`
                        pDesc.innerText = `Descrição: ${departamento.description}`

                        div.append(pNome, pDesc)
                        divModalBody.append(div)
                        })
                    })
                    .catch(err => console.log(err))
                    })
                    

            });
            return listar
        })        
        .catch(err => console.log(err))
    }

    static departamentos(){
        fetch(`${this.url}departments`, {
            method: "GET",
            headers: this.headers
        })
        .then(res => res.json())
        .then(res => {            
            const divDepartamentos = document.getElementById("departamentos")
            res.forEach(departamento => {
                let div = document.createElement("div")
                div.classList.add("divDepartamentosHome")
                let pNome = document.createElement("p")
                pNome.classList.add("pValue")
                let pDesc = document.createElement("p")
                pDesc.classList.add("pValue")
                pNome.innerText = `Departamento: ${departamento.name}`
                pDesc.innerText = `Descrição: ${departamento.description}`
                let divBotao = document.createElement("div")
                let botaoFuncionarios = document.createElement("button")
                botaoFuncionarios.classList.add("btnInfos")
                botaoFuncionarios.innerText = "Funcionarios"
                botaoFuncionarios.id = departamento.uuid

                divBotao.append(botaoFuncionarios)
                div.append(pNome, pDesc,divBotao)
                divDepartamentos.append(div)
            })
        })
    }

    static criarDepartamento(){
        const buttonCriar = document.getElementById("criarDepartamento")
        buttonCriar.addEventListener("click", () => {
            let divModalWrapper = document.createElement("div")
            divModalWrapper.classList.add("modal-wrapper")
            let divModal = document.createElement("div")
            divModal.classList.add("modal")
            let divModalHeader = document.createElement("div")
            divModalHeader.classList.add("modal-header")
            let divModalBody = document.createElement("div")
            divModalBody.classList.add("modal-body")
            let divModalButton = document.createElement("div")
            divModalButton.classList.add("containerLoginBtn")
            //header
            let h2 = document.createElement("h2")
            h2.classList.add("modal-title")
            h2.innerText = "Novo Departamento"
            let button = document.createElement("button")
            button.classList.add("modal-close")
            button.innerText = "X"
            
            //body
            let inputNome = document.createElement("input")
            inputNome.placeholder = "Nome do departamento"
            let inputDescription = document.createElement("input")
            inputDescription.placeholder = "Descrição ..."
            let select = document.createElement("select")
            let option0 = document.createElement("option")
            option0.innerText = "Escolha a empresa"
            select.append(option0)
            fetch(`${this.url}companies`)
            .then(res => res.json())
            .then(res => {
                res.forEach(element => {
                    let option = document.createElement("option")
                    option.innerText = element.name
                    option.value = element.uuid

                    select.append(option)
                })
            })
        
            //botoes
            let btnConfirmar = document.createElement("button")
            btnConfirmar.classList.add("btnLogar")
            btnConfirmar.innerText = "Confirmar"
            btnConfirmar.id = "btnConfirmar"

            divModalButton.append(btnConfirmar)
            divModalBody.append(inputNome,inputDescription,select)
            divModalHeader.append(h2, button)
            divModal.append(divModalHeader,divModalBody,divModalButton)
            divModalWrapper.append(divModal)
            body.append(divModalWrapper)

            divModalWrapper.classList.toggle("show-modal")

            button.addEventListener("click", () => {
                divModalWrapper.remove()
            })

            btnConfirmar.addEventListener("click", () => {
                fetch(`${this.url}departments`,{
                    method:"POST",
                    headers:this.headers,
                    body: JSON.stringify({
                        name: inputNome.value,
                        description: inputDescription.value,
                        company_uuid: select.value
                    })
                })
                .then(res => res.json())
                .then(res => {
                    Toast.create("Departamento criado com sucesso", "green")
                    setTimeout(divModalWrapper.remove(),1000)
                })
                .catch(err => {
                    Toast.create(err, "red")
                })
            })
        })
    }

    static editarDepartamento(){
        const buttonEditar = document.getElementById("editarDepartamento")
        buttonEditar.addEventListener("click", () => {
            let divModalWrapper = document.createElement("div")
            divModalWrapper.classList.add("modal-wrapper")
            let divModal = document.createElement("div")
            divModal.classList.add("modal")
            let divModalHeader = document.createElement("div")
            divModalHeader.classList.add("modal-header")
            let divModalBody = document.createElement("div")
            divModalBody.classList.add("modal-body")
            let divModalButton = document.createElement("div")
            divModalButton.classList.add("containerLoginBtn")
            //header
            let h2 = document.createElement("h2")
            h2.classList.add("modal-title")
            h2.innerText = "Editar Departamento"
            let button = document.createElement("button")
            button.classList.add("modal-close")
            button.innerText = "X"            
            //body
            let inputDesc = document.createElement("input")
            inputDesc.placeholder = "Nova Descrição"            
            let select = document.createElement("select")
            let option0 = document.createElement("option")
            option0.innerText = "Escolha o departamento"
            select.append(option0)
            fetch(`${this.url}departments`,{
                method: "GET",
                headers: this.headers
            })
            .then(res => res.json())
            .then(res => {                
                res.forEach(element => {
                    let option = document.createElement("option")
                    option.innerText = element.name
                    option.value = element.uuid

                    select.append(option)
                })
            })
        
            //botoes
            let btnEditar = document.createElement("button")
            btnEditar.classList.add("btnLogar")
            btnEditar.innerText = "Editar"
            btnEditar.id = "btnConfirmar"

            divModalButton.append(btnEditar)
            divModalBody.append(inputDesc,select)
            divModalHeader.append(h2, button)
            divModal.append(divModalHeader,divModalBody,divModalButton)
            divModalWrapper.append(divModal)
            body.append(divModalWrapper)

            divModalWrapper.classList.toggle("show-modal")

            button.addEventListener("click", () => {
                divModalWrapper.remove()
            })
            
            btnEditar.addEventListener("click", () => {                
                fetch(`${this.url}departments/${select.value}`,{
                    method: "PATCH",
                    headers: this.headers,
                    body: JSON.stringify({
                        description: inputDesc.value
                    })
                })              
                .then(res =>{
                    Toast.create("Edição completa", "green")
                    setTimeout(divModalWrapper.remove(),1500)                    
                })
                .catch(err => {
                    Toast.create(`Erro ${err} ao tentar editar`)
                })
            })
            
        })
    }

    static excluirDepartamento(){
        const buttonExcluir = document.getElementById("excluirDepartamento")
        buttonExcluir.addEventListener("click", () => {
            let divModalWrapper = document.createElement("div")
            divModalWrapper.classList.add("modal-wrapper")
            let divModal = document.createElement("div")
            divModal.classList.add("modal")
            let divModalHeader = document.createElement("div")
            divModalHeader.classList.add("modal-header")
            let divModalBody = document.createElement("div")
            divModalBody.classList.add("modal-body")
            let divModalButton = document.createElement("div")
            divModalButton.classList.add("containerLoginBtn")
            //header
            let h2 = document.createElement("h2")
            h2.classList.add("modal-title")
            h2.innerText = "Excluir departamento"
            let button = document.createElement("button")
            button.classList.add("modal-close")
            button.innerText = "X"            
            //body            
            let select = document.createElement("select")
            let option0 = document.createElement("option")
            option0.innerText = "Escolha o departamento"
            select.append(option0)
            fetch(`${this.url}departments`,{
                method: "GET",
                headers: this.headers
            })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                res.forEach(element => {
                    let option = document.createElement("option")
                    option.innerText = element.name
                    option.value = element.uuid

                    select.append(option)
                })
            })
        
            //botoes
            let btnConfirmar = document.createElement("button")
            btnConfirmar.classList.add("btnLogar")
            btnConfirmar.innerText = "Confirmar"
            btnConfirmar.id = "btnConfirmar"

            divModalButton.append(btnConfirmar)
            divModalBody.append(select)
            divModalHeader.append(h2, button)
            divModal.append(divModalHeader,divModalBody,divModalButton)
            divModalWrapper.append(divModal)
            body.append(divModalWrapper)

            divModalWrapper.classList.toggle("show-modal")

            button.addEventListener("click", () => {
                divModalWrapper.remove()
            })
            
            btnConfirmar.addEventListener("click", () => {                
                fetch(`${this.url}departments/${select.value}`,{
                    method: "DELETE",
                    headers: this.headers
                })                
                .then(res =>{
                    Toast.create("Departamento Excluido", "green")
                    setTimeout(divModalWrapper.remove(),1500)
                    window.location.reload()
                })
                .catch(err => {
                    Toast.create(`Erro ${err} ao tentar excluir`)
                })
            })
            
        })
    }

    static setores(){
        fetch(`${this.url}sectors`,{
            method:"GET",
            headers:this.headers
        })
        .then(res => res.json())
        .then(res => {
            const setores = document.getElementById("setores")
            res.forEach(setor =>{
                let div = document.createElement("div")
                let pDesc = document.createElement("p")
                pDesc.innerText = setor.description
                div.append(pDesc)
                setores.append(div)
            })
        })
    }

    static filtros(){
        const btnAlimenticio = document.getElementById("filtroAlimenticio")
        const btnAutomotiva = document.getElementById("filtroAutomotiva")
        const btnTi = document.getElementById("filtroTi")
        const btnTodas = document.getElementById("filtroTodas")
        const divEmpresas = document.getElementById("cardEmpresas")

        btnAlimenticio.addEventListener("click", () => {            
            fetch(`${this.url}companies/Alimenticio`)
            .then(res => res.json())
            .then(res => {
                divEmpresas.innerHTML = ""
                res.forEach(element => {
                    let div = document.createElement("div")
                    div.classList.add("card")
                    let h3Nome = document.createElement("h3")
                    h3Nome.innerText = `Empresa: ${element.name}`
                    let pDescricao = document.createElement("p")
                    pDescricao.innerText = `Descrição: ${element.description}`
                    div.append(h3Nome,pDescricao)
                
                    divEmpresas.append(div)
            });
        })
        .catch(err => console.log(err)) 
        })
    
        btnAutomotiva.addEventListener("click", () =>{
        fetch(`${this.url}companies/Automotiva`)
        .then(res => res.json())
        .then(res => {
            divEmpresas.innerHTML = ""
            res.forEach(element => {
                let div = document.createElement("div")
                div.classList.add("card")
                let h3Nome = document.createElement("h3")
                h3Nome.innerText = `Empresa: ${element.name}`
                let pDescricao = document.createElement("p")
                pDescricao.innerText = `Descrição: ${element.description}`
                div.append(h3Nome,pDescricao)
            
                divEmpresas.append(div)
            });
        })
        .catch(err => console.log(err))            
        })
        
        btnTi.addEventListener("click", () => {
            fetch(`${this.url}companies/TI`)
            .then(res => res.json())
            .then(res => {
                divEmpresas.innerHTML = ""
                res.forEach(element => {
                    let div = document.createElement("div")
                    div.classList.add("card")
                    let h3Nome = document.createElement("h3")
                    h3Nome.innerText = `Empresa: ${element.name}`
                    let pDescricao = document.createElement("p")
                    pDescricao.innerText = `Descrição: ${element.description}`
                    div.append(h3Nome,pDescricao)
                
                    divEmpresas.append(div)
            });
        })
        .catch(err => console.log(err))
        })

        btnTodas.addEventListener("click", () => {
            divEmpresas.innerHTML = ""
            this.listarEmpresas()
        })
    }

    static listarFuncionarios(){
        const divFuncionarios = document.getElementById("cardFuncionarios")
        fetch(`${this.url}users`,{
            method: "GET",
            headers: this.headers
        })
        .then(res => res.json())
        .then(res => {
            res.forEach(user => {                              
                let div = document.createElement("div")
                div.classList.add("card")
                let h3Nome = document.createElement("h3")
                h3Nome.innerText = user.username
                let pEmail = document.createElement("p")
                pEmail.innerText = user.email
                let pLevel = document.createElement("p")
                pLevel.innerText = user.professional_level
                let pWork = document.createElement("p")
                pWork.innerText = user.kind_of_work
                div.append(h3Nome, pEmail,pLevel,pWork)

                if(user.is_admin == false){
                    let divBotoes = document.createElement("div")
                    divBotoes.classList.add("divBotoes")
                    let btnDemitir = document.createElement("button")
                    btnDemitir.innerText = "Demitir"
                    btnDemitir.classList.add("btnDemitir")
                    btnDemitir.id = user.uuid
                    let btnEditar = document.createElement("button")
                    btnEditar.innerText = "Editar"                    
                    btnEditar.classList.add("btnEditar")
                    let btnDeletar = document.createElement("button")
                    btnDeletar.innerText = "Excluir"
                    btnDeletar.classList.add("btnDeletar")

                    btnDeletar.addEventListener("click", () =>{
                        fetch(`${this.url}admin/delete_user/${user.uuid}`,{
                            method: "DELETE",
                            headers: this.headers                            
                        })
                        .then(res => {
                            Toast.create("Usuario deletado")
                        })
                    })

                    btnEditar.addEventListener("click", () => {
                        let divModalWrapper = document.createElement("div")
                        divModalWrapper.classList.add("modal-wrapper")
                        let divModal = document.createElement("div")
                        divModal.classList.add("modal")
                        let divModalHeader = document.createElement("div")
                        divModalHeader.classList.add("modal-header")
                        let divModalBody = document.createElement("div")
                        divModalBody.classList.add("modal-body")
                        let divModalButton = document.createElement("div")
                        divModalButton.classList.add("containerLoginBtn")
                        //header
                        let h2 = document.createElement("h2")
                        h2.classList.add("modal-title")
                        h2.innerText = "Editar Fucionário"
                        let button = document.createElement("button")
                        button.classList.add("modal-close")
                        button.innerText = "X"
                        //body
                        let select1 = document.createElement("select")
                        let option0 = document.createElement("option")
                        option0.innerText = "Escolher o Nivel de Profissão"
                        let option1 = document.createElement("option")
                        option1.innerText = "Júnior"
                        option1.value = "júnior"
                        let option2 = document.createElement("option")
                        option2.innerText = "Sênior"
                        option2.value = "sênior"
                        let option3 = document.createElement("option")
                        option3.innerText = "Pleno"
                        option3.value = "pleno"
                        let option4 = document.createElement("option")
                        option4.innerText = "Estagiario"
                        option4.value = "estagiario"
                        select1.append(option0,option1,option2,option3,option4)

                        let select2 = document.createElement("select")
                        let option5 = document.createElement("option")
                        option5.innerText = "Escolha o tipo de Trabalho"
                        let option6 = document.createElement("option")
                        option6.innerText = "Presencial"
                        option6.value = "presencial"
                        let option7 = document.createElement("option")
                        option7.innerText = "Home Office"
                        option7.value = "home office"
                        let option8 = document.createElement("option")
                        option8.innerText = "Hibrido"
                        option8.value = "hibrido"

                        select2.append(option5,option6,option7,option8)

                        let btnEdit = document.createElement("button")
                        btnEdit.classList.add("btnLogar")
                        btnEdit.innerText = "Atualizar!"
                        btnEdit.id = "btnEdit"

                        divModalButton.append(btnEdit)
                        divModalBody.append(select1,select2)
                        divModalHeader.append(h2, button)
                        divModal.append(divModalHeader,divModalBody,divModalButton)
                        divModalWrapper.append(divModal)
                        body.append(divModalWrapper)

                        divModalWrapper.classList.toggle("show-modal")

                        button.addEventListener("click", () => {
                            divModalWrapper.remove()
                        })

                        btnEdit.addEventListener("click", () =>{
                            fetch(`${this.url}admin/update_user/${user.uuid}`,{
                                method:"PATCH",
                                headers:this.headers,
                                body:JSON.stringify({
                                    kind_of_work: select2.value,
                                    professional_level: select1.value
                                })
                            })
                            .then(res => res.json())
                            .then(res => {
                                Toast.create("Usuario atualizado", "green")
                                setTimeout(divModalWrapper.remove(),1000)
                            })
                        })

                    })

                    divBotoes.append(btnEditar,btnDemitir, btnDeletar)
                    div.append(divBotoes)
                    btnDemitir.addEventListener("click", () => {                       
                        Admin.demitir(btnDemitir.id)
                    })
                }

                divFuncionarios.append(div)
                
            })
        })
        .catch(err => console.log(err))        
    }

    static sair(){
        const btnSair = document.getElementById("btnSair")
        btnSair.addEventListener("click", () => {
            localStorage.clear()
            window.location.replace("../../index.html")
        })
    }

    static novaEmpresa(){
        const btnNovaEmpresa = document.getElementById("btnNovaEmpresa")
        btnNovaEmpresa.addEventListener("click", () => {
            let divModalWrapper = document.createElement("div")
            divModalWrapper.classList.add("modal-wrapper")
            let divModal = document.createElement("div")
            divModal.classList.add("modal")
            let divModalHeader = document.createElement("div")
            divModalHeader.classList.add("modal-header")
            let divModalBody = document.createElement("div")
            divModalBody.classList.add("modal-body")
            let divModalButton = document.createElement("div")
            divModalButton.classList.add("containerLoginBtn")
            //header
            let h2 = document.createElement("h2")
            h2.classList.add("modal-title")
            h2.innerText = "Nova Empresa"
            let button = document.createElement("button")
            button.classList.add("modal-close")
            button.innerText = "X"
            //body
            let inputNome = document.createElement("input")
            inputNome.placeholder = "Nome da Empresa"
            let inputOpening = document.createElement("input")
            inputOpening.placeholder = "Horario de abertura, EX: 08:00"
            let inputDescription = document.createElement("input")
            inputDescription.placeholder = "Descrição da empresa"
            let select = document.createElement("select")           
            let option0 = document.createElement("option")
            option0.innerText = "Escolha o setor da empresa"            
            let option1 = document.createElement("option")
            option1.innerText = "Alimenticio"
            option1.value = "d4b1fd03-129f-4509-ab8b-b8f39cae2659"
            let option2 = document.createElement("option")
            option2.innerText = "Varejo"
            option2.value = "1172d803-4c98-4868-ab84-7e7e7a2b4fc0"
            let option3 = document.createElement("option")
            option3.innerText = "Textil"
            option3.value = "41a712b1-1b2f-4072-b9e7-eaeacfdd6b58"
            let option4 = document.createElement("option")
            option4.innerText = "Manufatura"
            option4.value = "8a429b61-6f80-4af8-a746-1081deb971bb"
            let option5 = document.createElement("option")
            option5.innerText = "Aeroespacial"
            option5.value = "69f15c0f-c597-4770-b428-7cfa0ba8dbd9"
            let option6 = document.createElement("option")
            option6.innerText = "Automotiva"
            option6.value = "539392d1-b1ff-4dfc-947c-3486a703cb4c"
            let option7 = document.createElement("option")
            option7.innerText = "TI"
            option7.value = "f06c0cdb-d82c-4242-ab28-01de368c81ea"
            let option8 = document.createElement("option")
            option8.innerText = "Atacado"
            option8.value = "49ad6958-ec00-4b84-a5db-cedf66880981"

            select.append(option0,option1,option2,option3,option4,option5,option6,option7,option8)
                      

            //botoes
            let btnCadastro = document.createElement("button")
            btnCadastro.classList.add("btnLogar")
            btnCadastro.innerText = "Cadastro!"
            btnCadastro.id = "btnCadastroEmpresa"

            divModalButton.append(btnCadastro)
            divModalBody.append(inputNome,inputOpening,inputDescription,select)
            divModalHeader.append(h2, button)
            divModal.append(divModalHeader,divModalBody,divModalButton)
            divModalWrapper.append(divModal)
            body.append(divModalWrapper)

            divModalWrapper.classList.toggle("show-modal")

            button.addEventListener("click", () => {
                divModalWrapper.remove()
            })

            btnCadastro.addEventListener("click", () => {
                let data = {
                    name: inputNome.value,
                    opening_hours: inputOpening.value,
                    description: inputDescription.value,
                    sector_uuid: select.value
                }                
                Admin.cadastroEmpresa(data)
                setTimeout(divModalWrapper.remove(),1000)                
            })
        })
    }

    static cadastroEmpresa(data){
        console.log(data)
        fetch(`${this.url}companies`,{            
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
    
    static fucionarioSemEmprego(){
        fetch(`${this.url}admin/out_of_work`,{
            method:"GET",
            headers: this.headers
        })
        .then(res => res.json())
        .then(res => {
            const cardEmpregados = document.getElementById("cardEmpregados")
            res.forEach(empregado => {                
                let div = document.createElement("div")
                div.classList.add("card")
                let h3Nome = document.createElement("h3")
                h3Nome.innerText = empregado.username
                let pEmail = document.createElement("p")
                pEmail.innerText = empregado.email
                let pLevel = document.createElement("p")
                pLevel.innerText = empregado.professional_level
                let pWork = document.createElement("p")
                pWork.innerText = empregado.kind_of_work
                let divBotoes = document.createElement("div")
                divBotoes.classList.add("divBotoes")
                let btnContratar = document.createElement("button")
                btnContratar.innerText = "Contratar"
                btnContratar.id = empregado.uuid
                btnContratar.classList.add("btnContratar")
                // let btnDemitir = document.createElement("button")
                // btnDemitir.innerText = "Demitir"
                // btnDemitir.classList.add("btnDemitir")
                
                divBotoes.append(btnContratar)
                div.append(h3Nome, pEmail,pLevel,pWork,divBotoes)
                cardEmpregados.append(div)

                btnContratar.addEventListener("click", () =>{
                    let divModalWrapper = document.createElement("div")
                    divModalWrapper.classList.add("modal-wrapper")
                    let divModal = document.createElement("div")
                    divModal.classList.add("modal")
                    let divModalHeader = document.createElement("div")
                    divModalHeader.classList.add("modal-header")
                    let divModalBody = document.createElement("div")
                    divModalBody.classList.add("modal-body")
                    let divModalButton = document.createElement("div")
                    divModalButton.classList.add("containerLoginBtn")

                    let h2 = document.createElement("h2")
                    h2.classList.add("modal-title")
                    h2.innerText = "Nova Empresa"
                    let button = document.createElement("button")
                    button.classList.add("modal-close")
                    button.innerText = "X"
                    
                    let select = document.createElement("select")
                    let option0 = document.createElement("option")
                    option0.innerText = "Escolha o departamento do funcionario"
                    select.append(option0)
                        fetch(`${this.url}departments`,{
                        method:"GET",
                        headers: this.headers
                        })
                        .then(res => res.json())
                        .then(res => {
                            res.forEach(elemento => {
                                let option1 = document.createElement("option")
                                option1.innerText = elemento.name
                                option1.value = elemento.uuid

                                select.append(option1)
                            })
                        })
                    let btnContrata = document.createElement("button")
                    btnContrata.classList.add("btnContratar")
                    btnContrata.innerText = "Contratar"
                    btnContrata.id = "btnContratar"

                    divModalButton.append(btnContrata)
                    divModalBody.append(select)
                    divModalHeader.append(h2, button)
                    divModal.append(divModalHeader,divModalBody,divModalButton)
                    divModalWrapper.append(divModal)
                    body.append(divModalWrapper)

                    divModalWrapper.classList.toggle("show-modal")
                    button.addEventListener("click", () => {
                        divModalWrapper.remove()
                    })
                     
                    btnContrata.addEventListener("click", () => {                                               
                        fetch(`${this.url}departments/hire/`,{
                            method: "PATCH",
                            headers:this.headers,
                            body:JSON.stringify(
                                {
                                user_uuid: btnContratar.id,
                                department_uuid: select.value,
                                })                                                                                                
                            }).then(res => res.json())
                            .then(res => {
                                Toast.create("Funcionario contratado", "green")
                                setTimeout(divModalWrapper.remove(), 1000)
                            })
                    })
                })
            })
        })
    }

    static demitir(ID){
        fetch(`${this.url}departments/dismiss/${ID}`,{
            method: "PATCH",
            headers:this.headers,            
        })
        .then(res => res.json())
        .then(res => {            
            Toast.create("Funcionário demitido","green")
        })
        .catch(err => {
            Toast.create(`Erro ${err} ao demitir este funcionário`)
        })
    }

}

Admin.listarEmpresas()
Admin.filtros()
Admin.listarFuncionarios()
Admin.sair()
Admin.novaEmpresa()
Admin.departamentos()
Admin.fucionarioSemEmprego()
Admin.setores()
Admin.criarDepartamento()
Admin.excluirDepartamento()
Admin.editarDepartamento()
