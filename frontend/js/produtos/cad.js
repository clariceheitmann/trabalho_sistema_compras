let resposta = document.getElementById('resposta')
let btn_cadastrar = document.getElementById('btn_cadastrar')

btn_cadastrar.addEventListener('click', (e) => {
    e.preventDefault()

    const nome = document.getElementById('nome').value
    const descricao = document.getElementById('descricao').value
    const categoria = document.getElementById('categoria').value
    const preco = Number(document.getElementById('preco').value)
    const desconto = Number(document.getElementById('desconto').value)
    const qtdeEstoque = Number(document.getElementById('qtdeEstoque').value)
    const marca = document.getElementById('marca').value
    const imagem = document.getElementById('imagem').value

    const produto = {
        nome,
        descricao,
        categoria,
        preco,
        desconto,
        qtdeEstoque,
        marca,
        imagem
    }

    fetch(`http://localhost:3000/produto`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(produto)
    })
        .then(res => res.json())
        .then(dados => {
            resposta.innerHTML = `<p>${dados.message}</p>`
            document.querySelector('form').reset()
        })
        .catch((err) => {
            console.error('Erro ao cadastrar produto!', err)
            resposta.innerHTML = '<p>Erro ao cadastrar produto!</p>'
        })
})