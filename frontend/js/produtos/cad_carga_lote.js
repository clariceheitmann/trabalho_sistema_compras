let resposta = document.getElementById('resposta')
let btn_carga_lote = document.getElementById('btn_carga_lote')

// =========================================================================
// COMPORTAMENTO 2: CADASTRO EM LOTE (BULKCREATE VIA DUMMYJSON)
// =========================================================================
btn_carga_lote.addEventListener('click', (e) => {
    e.preventDefault()
    resposta.innerHTML = '<p style="color: yellow;">Buscando catálogos de produtos na API DummyJSON...</p>'

    // 1. Consome os dados da API pública externa de produtos
    fetch('https://dummyjson.com/products')
    .then(res => res.json())
    .then(dadosExternos => {
        resposta.innerHTML = '<p style="color: cyan;">Dados recebidos com sucesso! Transmitindo lote para o back-end...</p>'
        
        // 2. Transmite a propriedade nativa array (.products) diretamente para o backend local
        return fetch('http://localhost:3000/produtos/carga-lote', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(dadosExternos.products)
        })
    })
    .then(res => res.json())
    .then(dados => {
        resposta.innerHTML = `<p style="color: lightgreen;">${dados.message || 'Carga estrutural de produtos realizada com sucesso!'}</p>`
    })
    .catch(err => {
        console.error('Erro na carga em lote de produtos:', err)
        resposta.innerHTML = '<p style="color: red;">Falha ao processar os dados da carga de produtos em lote.</p>'
    })
})