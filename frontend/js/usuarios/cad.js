let resposta = document.getElementById('resposta')
let btn_cadastrar = document.getElementById('btn_cadastrar')

btn_cadastrar.addEventListener('click', (e) =>{
    e.preventDefault()

    const nome = document.getElementById('nome').value
    const sobrenome = document.getElementById('sobrenome').value
    const idade = Number(document.getElementById('idade').value)
    const email = document.getElementById('email').value

    const usuario = {
        nome: nome,
        sobrenome: sobrenome,
        idade: idade,
        email: email,
    }

    fetch(`http://localhost:3000/usuario`,{
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(usuario)
    })
    .then(res => res.json())
    .then(dados =>{
        resposta.innerHTML = ''
        resposta.innerHTML = `<p>${dados.message}</p>`
       
        document.querySelector('form').reset()
    })
    .catch((err)=>{
        console.error('Erro ao cadastrar usuário!',err)
        resposta.innerHTML = '<p>Erro ao cadastrar usuário!</p>'
    })
})

