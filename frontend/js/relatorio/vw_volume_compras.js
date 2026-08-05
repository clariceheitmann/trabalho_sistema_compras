let resposta = document.getElementById('resposta')
let gerar_grafico = document.getElementById('gerar_grafico')
let meuGrafico = null

gerar_grafico.addEventListener('click', () => {
    fetch('http://localhost:3000/volumeCompras')
    .then(res => res.json())
    .then(dados => {
        console.log("=========================================")
        console.log("DADOS DO RELATÓRIO DE CATEGORIAS RECEBIDOS:")
        console.log(dados)
        console.log("=========================================")

        if (dados.length === 0) {
            resposta.innerHTML = 'Nenhum dado de compras encontrado para processar o gráfico.'
            return
        }

        resposta.innerHTML = 'Sucesso! Gráfico gerado com os dados consolidados.'
        
        dados.sort((a, b) => {
            let valorA = parseFloat(a.valor_financeiro_movimentado || 0)
            let valorB = parseFloat(b.valor_financeiro_movimentado || 0)
            return valorB - valorA
        })

        let produtos = []
        let valores = []

        let limite = dados.length > 5 ? 5 : dados.length
        for (let i = 0; i < limite; i++) {
            produtos.push(dados[i].nome || `Item ${i+1}`)
            valores.push(parseFloat(dados[i].valor_financeiro_movimentado || 0))
        }

        if (meuGrafico !== null) {
            meuGrafico.destroy()
        }

        let ctx = document.getElementById('graf').getContext('2d')

        // CONFIGURAÇÕES GERAIS DE CORES E FONTE
        Chart.defaults.color = '#105666'
        Chart.defaults.font.size = 12
        Chart.defaults.font.family = 'sans-serif'

        const data = {
            labels: produtos,
            datasets: [{
                label: 'Volume Financeiro (R$)',  
                data: valores,
                backgroundColor: '#0A3323', // Verde escuro para as barras
                borderColor: '#839958',     // Borda verde suave
                borderWidth: 1.5,
                borderRadius: 4
            }]
        }

        const config = {
            type: 'bar',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y', // Gráfico Horizontal
                layout: {
                    padding: { right: 80 } // Espaço à direita para o valor R$ não cortar
                },
                plugins: {
                    legend: {
                        display: true,
                        labels: { color: '#0A3323', font: { weight: 'bold' } }
                    },
                    title: {
                        display: true,
                        text: 'Top 5 - Volume Financeiro de Compras por Mercadoria',
                        color: '#0A3323',
                        font: { size: 15, weight: 'bold' }
                    },
                    datalabels: {
                        display: true,
                        anchor: 'end',
                        align: 'right',
                        color: '#0A3323', // Cor do valor em R$ do lado da barra
                        font: { weight: 'bold', size: 11 },
                        formatter: (val) => 'R$ ' + val.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                    }
                },
                scales: {
                    x: {
                        display: true,
                        title: { display: true, text: 'Valor Financeiro Movimentado (R$)', color: '#0A3323' },
                        ticks: { color: '#105666' },
                        grid: { color: 'rgba(0, 0, 0, 0.05)' }
                    },
                    y: {
                        display: true,
                        title: { display: true, text: 'Produto / Categoria', color: '#0A3323' },
                        ticks: { color: '#105666' },
                        grid: { display: false }
                    }
                }
            },
            plugins: [ChartDataLabels]
        }

        meuGrafico = new Chart(ctx, config)
    })
    .catch(err => {
        console.error('Erro ao buscar dados do relatório gráfico:', err)
        resposta.innerHTML = 'Erro ao carregar dados do endpoint do banco.'
    })
})