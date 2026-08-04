let resposta = document.getElementById('resposta')
let btn_listar = document.getElementById('btn_listar')

btn_listar.addEventListener('click', (e) =>{
    e.preventDefault()

    fetch(`http://localhost:3000/produtos`)
    .then(res => res.json())
    .then(dados =>{
        resposta.innerHTML = `
        <table>
            ${thead()}
            ${tbody(dados)}
        </table>`
    })
    .catch((err)=>{
        console.error('Erro ao listar produtos!',err)
        resposta.innerHTML = `<p>Erro ao listar produtos!</p>`
    })
})

function thead(){
    return `
    <thead>
        <tr>
            <th>ID do produto</th>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Categoria</th>
            <th>Preço</th>
            <th>Desconto</th>
            <th>Quantidade em Estoque</th>
            <th>Marca</th>
            <th>Imagem</th>
        </tr>
    </thead>`
}

function tbody(dados){
    let corpo = '<tbody>'
    dados.forEach(el => {
        corpo += `
        <tr>
            <td>${el.codProduto}</td>
            <td>${el.nome}</td>
            <td>${el.descricao}</td>
            <td>${el.categoria}</td>
            <td>${el.preco}</td>
            <td>${el.desconto}</td>
            <td>${el.qtdeEstoque}</td>
            <td>${el.marca}</td>
            <td>${el.imagem}</td>
        </tr>`
    })
    corpo += '</tbody>'
    return corpo
}