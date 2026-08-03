let resposta = document.getElementById('resposta')
let btn_consultar = document.getElementById('btn_consultar')

btn_consultar.addEventListener('click', (e) =>{
    e.preventDefault()

    const codUsuario = document.getElementById('codUsuario').value

    fetch(`http://localhost:3000/usuario/${codUsuario}`)
    .then(res => res.json())
    .then(dados =>{
        resposta.innerHTML = ''

        if(dados.message){
            resposta.innerHTML += `<p>Usuário não encontrado</p>`
            return
        }

        let dadosArr = [dados]

        resposta.innerHTML += `
        <table>
            ${thead()}
            ${tbody(dadosArr)}
        </table>`
    })
    .catch((err)=>{
        console.error('Erro ao consultar usuário!',err)
        resposta.innerHTML = `<p>Erro ao consultar produto!</p>`
    })
})

function thead(){
    let cabecalho = ''
    cabecalho += `
    <thead>
        <tr>
            <th>Código do Usuário</th>
            <th>Novo Nome</th>
            <th>Novo Sobrenome</th>
            <th>Nova Idade</th>
            <th>Novo Email</th>
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
        corpo += `<td>${el.codUsuario}</td>`
        corpo += `<td>${el.nome}</td>`
        corpo += `<td>${el.sobrenome}</td>`
        corpo += `<td>${el.idade}</td>`
        corpo += `<td>${el.email}</td>`
        corpo += `</tr>`
    })
    corpo += `</tbody>`
    return corpo
}