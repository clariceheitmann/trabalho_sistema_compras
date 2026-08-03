let resposta = document.getElementById('resposta')
let btn_apagar = document.getElementById('btn_apagar')

btn_apagar.addEventListener('click', (e) =>{
    e.preventDefault()

    const codUsuario = document.getElementById('codUsuario').value

    fetch(`http://localhost:3000/usuario/${codUsuario}`,{
        method: 'DELETE'
    })
    .then(res => res.json())
    .then(dados =>{
        resposta.innerHTML = ''
        resposta.innerHTML += `<p>${dados.message}</p>`

        document.querySelector('form').reset()
    })
    .catch((err)=>{
        console.error('Erro ao excluir usuário!',err)
        resposta.innerHTML = `<p>Erro ao excluir usuário!</p>`
    })
})