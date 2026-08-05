let resposta = document.getElementById('resposta')
let btn_atualizar = document.getElementById('btn_atualizar')

btn_atualizar.addEventListener('click', (e) => {
    e.preventDefault()

    const codUsuario = Number(document.getElementById('codUsuario').value)
    const nome = document.getElementById('nome').value
    const sobrenome = document.getElementById('sobrenome').value
    const idade = Number(document.getElementById('idade').value)
    const email = document.getElementById('email').value
    const telefone = document.getElementById('telefone').value
    const endereco = document.getElementById('endereco').value
    const cidade = document.getElementById('cidade').value
    const estado = document.getElementById('estado').value

    const usuarioAtualizado = {
        nome: nome,
        sobrenome: sobrenome,
        idade: idade,
        email: email,
        telefone: telefone,
        endereco: endereco,
        cidade: cidade,
        estado: estado,
    }

    fetch(`http://localhost:3000/usuario/${codUsuario}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuarioAtualizado)
    })
        .then(res => res.json())
        .then(dados => {
            resposta.innerHTML = ''

            if (!dados) {
                resposta.innerHTML = `<p>Usuário não encontrado!</p>`
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
        .catch((err) => {
            console.error('Erro ao atualizar usuário!', err)
            resposta.innerHTML = `<p>Erro ao atualizar usuário!</p>`
        })
})

function thead() {
    let cabecalho = ''
    cabecalho += `
    <thead>
        <tr>
            <th>Código do Usuário</th>
            <th>Novo Nome</th>
            <th>Novo Sobrenome</th>
            <th>Nova Idade</th>
            <th>Novo Email</th>
            <th>Novo Telefone</th>
            <th>Novo Endereço</th>
            <th>Nova Cidade</th>
            <th>Novo Estado</th>
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
        corpo += `<td>${el.codUsuario}</td>`
        corpo += `<td>${el.nome}</td>`
        corpo += `<td>${el.sobrenome}</td>`
        corpo += `<td>${el.idade}</td>`
        corpo += `<td>${el.email}</td>`
        corpo += `<td>${el.telefone}</td>`
        corpo += `<td>${el.endereco}</td>`
        corpo += `<td>${el.cidade}</td>`
        corpo += `<td>${el.estado}</td>`
        corpo += `</tr>`
    })
    corpo += `</tbody>`
    return corpo
}