let resposta = document.getElementById('resposta')
let btn_cadastrar = document.getElementById('btn_cadastrar')

btn_cadastrar.addEventListener('click', (e) => {
    e.preventDefault()

    const compra = {
        idUsuario: Number(document.getElementById('idUsuario').value),
        idProduto: Number(document.getElementById('idProduto').value),
        tipoMovimento: document.getElementById('tipoMovimento').value,
        quantidadeMovimentada: Number(document.getElementById('quantidadeMovimentada').value),
        formaPagamento: document.getElementById('formaPagamento').value,
        statusCompra: document.getElementById('statusCompra').value,
        dataCompra: document.getElementById('dataCompra').value
    }

    fetch('http://localhost:3000/compra', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(compra)
    })
    .then(res => res.json())
    .then(dados => {
        resposta.innerHTML = `<p>Compra registrada com sucesso!</p>`
        document.querySelector('form').reset()
    })
    .catch(err => {
        console.error(err)
        resposta.innerHTML = `<p>Erro ao registrar compra!</p>`
    })
})