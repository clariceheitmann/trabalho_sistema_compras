let resposta = document.getElementById('resposta')
let btn_listar = document.getElementById('btn_listar')

btn_listar.addEventListener('click', (e) => {
    e.preventDefault()

    fetch('http://localhost:3000/compras')
    .then(res => res.json())
    .then(dados => {
        resposta.innerHTML = `
        <table>
            ${thead()}
            ${tbody(dados)}
        </table>`
    })
    .catch(err => {
        console.error(err)
        resposta.innerHTML = `<p>Erro ao listar compras!</p>`
    })
})

function thead(){
    return `
    <thead>
        <tr>
            <th>ID</th>
            <th>Usuário</th>
            <th>Produto</th>
            <th>Tipo</th>
            <th>Quantidade</th>
            <th>Preço Final</th>
            <th>Status</th>
        </tr>
    </thead>`
}

function tbody(dados){
    let linhas = `<tbody>`
    dados.forEach(el => {
        linhas += `
        <tr>
            <td>${el.codCompra}</td>
            <td>${el.idUsuario}</td>
            <td>${el.idProduto}</td>
            <td>${el.tipoMovimento}</td>
            <td>${el.quantidadeMovimentada}</td>
            <td>${el.precoFinal}</td>
            <td>${el.statusCompra}</td>
        </tr>`
    })
    linhas += `</tbody>`
    return linhas
}