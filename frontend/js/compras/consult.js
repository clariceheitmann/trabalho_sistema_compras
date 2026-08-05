let resposta = document.getElementById('resposta')
let btn_consultar = document.getElementById('btn_consultar')

btn_consultar.addEventListener('click', (e) => {
    e.preventDefault()

    const codCompra = document.getElementById('codCompra').value

    fetch(`http://localhost:3000/compra/${codCompra}`)
        .then(res => res.json())
        .then(dados => {
            resposta.innerHTML = ''

            if (dados.message) {
                resposta.innerHTML += `<p>Compra não encontrada</p>`
                return
            }

            let dadosArr = [dados]

            resposta.innerHTML += `
        <table>
            ${thead()}
            ${tbody(dadosArr)}
        </table>`
        })
        .catch((err) => {
            console.error('Erro ao consultar compra!', err)
            resposta.innerHTML = `<p>Erro ao consultar compra!</p>`
        })
})

function thead() {
    let cabecalho = ''
    cabecalho += `
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
    </thead>
    `
    return cabecalho
}

function tbody(dadosArr) {
    let corpo = ''
    corpo += `<tbody>`
    dadosArr.forEach(el => {
        corpo += `<tr>`
        corpo += `<td>${el.codCompra}</td>`
        corpo += `<td>${el.idUsuario}</td>`
        corpo += `<td>${el.idProduto}</td>`
        corpo += `<td>${el.tipoMovimento}</td>`
        corpo += `<td>${el.quantidadeMovimentada}</td>`
        corpo += `<td>${el.precoUnitario}</td>`
        corpo += `<td>${el.descontoAplicado}</td>`
        corpo += `<td>${el.precoFinal}</td>`
        corpo += `<td>${el.formaPagamento}</td>`
        corpo += `<td>${el.statusCompra}</td>`
        corpo += `<td>${el.dataCompra}</td>`
        corpo += `</tr>`
    })
    corpo += `</tbody>`
    return corpo
}