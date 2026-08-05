let resposta = document.getElementById('resposta')
let btn_listar = document.getElementById('btn_listar')

btn_listar.addEventListener('click', (e) => {
    e.preventDefault()

    fetch(`http://localhost:3000/usuarios`)
        .then(res => res.json())
        .then(dados => {
            resposta.innerHTML = ''
            resposta.innerHTML += `
        <table>
            ${thead()}
            ${tbody(dados)}
        </table>
        `
        })
        .catch((err) => {
            console.error('Erro ao listar usuários!', err)
            resposta.innerHTML = `<p>Erro ao listar usuários!</p>`
        })
})

function thead() {
    let cabecalho = ''
    cabecalho += `
    <thead>
        <tr>
            <th>Código do Usuário</th>
            <th>Nome</th>
            <th>Sobrenome</th>
            <th>Idade</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Endereço</th>
            <th>Cidade</th>
            <th>Estado</th>
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