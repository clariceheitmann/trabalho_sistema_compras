let resposta = document.getElementById('resposta')
let btn_apagar = document.getElementById('btn_apagar')

btn_apagar.addEventListener('click', (e) =>{
    e.preventDefault()

    const id = document.getElementById('codProduto').value

    fetch(`http://localhost:3000/produto/${id}`,{
        method: 'DELETE'
    })
    .then(res => res.json())
    .then(dados =>{
        resposta.innerHTML = `<p>${dados.message}</p>`
        document.querySelector('form').reset()
    })
    .catch((err)=>{
        console.error('Erro ao excluir produto!',err)
        resposta.innerHTML = `<p>Erro ao excluir produto!</p>`
    })
})