let resposta = document.getElementById('resposta')
let btn_carga_lote = document.getElementById('btn_carga_lote')

// =========================================================================
// COMPORTAMENTO 2: CADASTRO EM LOTE (BULKCREATE VIA DUMMYJSON)
// =========================================================================
btn_carga_lote.addEventListener('click', (e) => {
    e.preventDefault()
    resposta.innerHTML = '<p style="color: yellow;">Buscando registros na API DummyJSON (https://dummyjson.com/users)...</p>'

    // 1. Consome os dados da API pública externa de usuários
    fetch('https://dummyjson.com/users')
        .then(res => res.json())
        .then(dadosExternos => {
            resposta.innerHTML = '<p style="color: cyan;">Dados recebidos com sucesso! Transmitindo lote para o back-end...</p>'

            // 2. Repassa o array bruto (.users) diretamente ao endpoint de carga em lote
            return fetch('http://localhost:3000/usuarios/carga-lote', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dadosExternos.users)
            })
        })
        .then(res => res.json())
        .then(dados => {
            resposta.innerHTML = `<p style="color: lightgreen;">${dados.message || 'Carga em lote finalizada com sucesso!'}</p>`
        })
        .catch(err => {
            console.error('Erro na carga em lote:', err)
            resposta.innerHTML = '<p style="color: red;">Falha ao processar os dados da carga em lote no servidor local.</p>'
        })
})