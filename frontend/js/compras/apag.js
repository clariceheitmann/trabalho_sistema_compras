let resposta = document.getElementById('resposta')
let btn_apagar = document.getElementById('btn_apagar')

btn_apagar.addEventListener('click', (e) => {
    e.preventDefault()

    const id = document.getElementById('codCompra').value

    fetch(`http://localhost:3000/compra/${id}`, {
        method: 'DELETE'
    })
    .then(res => res.json())
    .then(dados => {
        resposta.innerHTML = `<p>${dados.message}</p>`
    })
    .catch(err => {
        console.error(err)
        resposta.innerHTML = `<p>Erro ao excluir compra!</p>`
    })
})