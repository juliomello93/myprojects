let body = document.querySelector("body")
let ul = document.querySelector(".listaDeProdutos")

class News{
    static ApiRequests() {
        const baseDeDados = fetch("https://kenzie-news-api.herokuapp.com/api/news")
         
        .then((response) => response.json())
        
        .then((response) => {
            console.log(response)
            response.forEach(noticia => {
            
            let li = document.createElement("li")
            
            let divImagem = document.createElement("div")
            divImagem.classList.add("divImagem")
            
            let img = document.createElement("img")
            img.src = noticia.imagem

            let divInformacoes = document.createElement("div")
            divInformacoes.classList.add("divInfomacoes")

            let button = document.createElement("button")
            button.innerText = noticia.categoria
            button.classList.add("btnCategoria")

            let titulo = document.createElement("h1")
            titulo.innerText = noticia.titulo

            let resumo = document.createElement("p")
            resumo.innerText = noticia.resumo

            let span = document.createElement("span")
            span.innerText = `Fonte: ${noticia.fonte}`

            
            divImagem.append(img)
            divInformacoes.append(button, titulo,resumo,span)
            li.append(divImagem, divInformacoes)
            ul.append(li)

            });
        })

        .catch(error => console.log(error))        
        
    }
}

News.ApiRequests()


// CRIAR DIV INFORMAÇÕES / DIV IMAGEM 

// DIV PARA NOTICIA EM DESTAQUE
// ATRIBUIR ESSA CLASSE A NOTICIA CLICADA! JS