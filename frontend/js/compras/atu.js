let resposta = document.getElementById('resposta')
let btn_atualizar = document.getElementById('btn_atualizar')

btn_atualizar.addEventListener('click', (e) =>{
    e.preventDefault()

    const codCompra = Number(document.getElementById('codCompra').value)
    const quantidade = Number(document.getElementById('quantidade').value)
    const statusCompra = document.getElementById('statusCompra').value

    const compraAtualizada = {
        quantidadeMovimentada: quantidade,
        statusCompra: statusCompra
    }

    fetch(`http://localhost:3000/compra/${codCompra}`,{
        method: 'PUT',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(compraAtualizada)
    })
    .then(res => res.json())
    .then(dados =>{
        resposta.innerHTML = ''

        if(!dados){
            resposta.innerHTML = `<p>Compra não encontrada!</p>`
            return
        }

        let dadosArr = [dados]

        resposta.innerHTML += `
        <table>
            ${thead()}
            ${tbody(dadosArr)}
        </table>
        `

        document.querySelector('form').reset()
    })
    .catch((err)=>{
        console.error('Erro ao atualizar compra!',err)
        resposta.innerHTML = `<p>Erro ao atualizar compra!</p>`
    })
})

function thead(){
    let cabecalho = ''
    cabecalho += `
    <thead>
        <tr>
            <th>Código</th>
            <th>Usuário</th>
            <th>Produto</th>
            <th>Tipo</th>
            <th>Quantidade</th>
            <th>Preço Final</th>
            <th>Status</th>
        </tr>
    </thead>
    `
    return cabecalho
}

function tbody(dadosArr){
    let corpo = ''
    corpo += `<tbody>`
    dadosArr.forEach(el => {
        corpo += `<tr>`
        corpo += `<td>${el.codCompra}</td>`
        corpo += `<td>${el.idUsuario}</td>`
        corpo += `<td>${el.idProduto}</td>`
        corpo += `<td>${el.tipoMovimento}</td>`
        corpo += `<td>${el.quantidadeMovimentada}</td>`
        corpo += `<td>${el.precoFinal}</td>`
        corpo += `<td>${el.statusCompra}</td>`
        corpo += `</tr>`
    })
    corpo += `</tbody>`
    return corpo
}