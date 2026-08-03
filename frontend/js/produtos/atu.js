let resposta = document.getElementById('resposta')
let btn_atualizar = document.getElementById('btn_atualizar')

btn_atualizar.addEventListener('click', (e) =>{
    e.preventDefault()

    const id = Number(document.getElementById('codProduto').value)

    const produtoAtualizado = {
        nome: document.getElementById('nome').value,
        descricao: document.getElementById('descricao').value,
        categoria: document.getElementById('categoria').value,
        preco: Number(document.getElementById('preco').value),
        desconto: Number(document.getElementById('desconto').value),
        qtdeEstoque: Number(document.getElementById('qtdeEstoque').value),
        marca: document.getElementById('marca').value,
        imagem: document.getElementById('imagem').value
    }

    fetch(`http://localhost:3000/produto/${id}`,{
        method: 'PUT',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(produtoAtualizado)
    })
    .then(res => res.json())
    .then(dados =>{
        if(dados.message){
            resposta.innerHTML = `<p>Produto não encontrado</p>`
            return
        }

        resposta.innerHTML = `
        <table>
            ${thead()}
            ${tbody([dados])}
        </table>`

        resposta.innerHTML = `<p>Produto atualizado com sucesso!</p>`
        document.querySelector('form').reset()
    })
    .catch((err)=>{
        console.error('Erro ao atualizar produto!',err)
        resposta.innerHTML = `<p>Erro ao atualizar produto!</p>`
    })
})

function thead(){
    return `
    <thead>
        <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Categoria</th>
            <th>Preço</th>
            <th>Estoque</th>
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
            <td>${el.categoria}</td>
            <td>${el.preco}</td>
            <td>${el.qtdeEstoque}</td>
        </tr>`
    })
    corpo += '</tbody>'
    return corpo
}