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
            <th>ID da compra</th>
            <th>ID do usuário</th>
            <th>ID do produto</th>
            <th>Tipo de movimento</th>
            <th>Quantidade movimentada</th>
            <th>Preço unitário</th>
            <th>Desconto aplicado</th>
            <th>Preço final</th>
            <th>Forma de pagamento</th>
            <th>Status da compra</th>
            <th>Data da compra</th>
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
            <td>${el.precoUnitario}</td>
            <td>${el.descontoAplicado}</td>
            <td>${el.precoFinal}</td>
            <td>${el.formaPagamento}</td>
            <td>${el.statusCompra}</td>
            <td>${el.dataCompra}</td>
        </tr>`
    })
    linhas += `</tbody>`
    return linhas
}