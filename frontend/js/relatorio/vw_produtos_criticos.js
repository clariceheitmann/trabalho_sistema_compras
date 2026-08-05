let resposta = document.getElementById('resposta')
let gerar_grafico = document.getElementById('gerar_grafico')
let meuGrafico = null

gerar_grafico.addEventListener('click', () => {
    fetch('http://localhost:3000/produtosCriticos')
        .then(res => res.json())
        .then(dados => {
            console.log("=========================================")
            console.log("DADOS DO RELATÓRIO DE PRODUTOS CRÍTICOS:")
            console.log(dados)
            console.log("=========================================")

            let dadosFiltrados = []
            for (let i = 0; i < dados.length; i++) {
                let estoque = parseInt(dados[i].quantidade_atual || 0)
                if (estoque < 10) {
                    dadosFiltrados.push(dados[i])
                }
            }

            if (dadosFiltrados.length === 0) {
                resposta.innerHTML = 'Nenhum produto crítico (estoque < 10) detectado para gerar o gráfico!'
                if (meuGrafico !== null) meuGrafico.destroy()
                return
            }

            resposta.innerHTML = `Alerta! Exibindo ${dadosFiltrados.length} itens com estoque crítico (< 10).`

            let produtos = []
            let estoques = []

            for (let i = 0; i < dadosFiltrados.length; i++) {
                produtos.push(dadosFiltrados[i].nome || "Produto Sem Nome")
                estoques.push(parseInt(dadosFiltrados[i].quantidade_atual || 0))
            }

            if (meuGrafico !== null) {
                meuGrafico.destroy()
            }

            let ctx = document.getElementById('graf').getContext('2d')

            Chart.defaults.color = '#105666'
            Chart.defaults.font.size = 12
            Chart.defaults.font.family = 'sans-serif'

            const data = {
                labels: produtos,
                datasets: [{
                    label: 'Quantidade em Estoque',
                    data: estoques,
                    backgroundColor: '#0A3323',
                    borderColor: '#839958',
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
                    layout: {
                        padding: { top: 25, bottom: 10 }
                    },
                    plugins: {
                        legend: {
                            display: true,
                            labels: { color: '#0A3323', font: { weight: 'bold' } }
                        },
                        title: {
                            display: true,
                            text: 'Estoque Físico Crítico Atual (< 10 unidades)',
                            color: '#0A3323',
                            font: { size: 15, weight: 'bold' }
                        },
                        datalabels: {
                            display: true,
                            anchor: 'end',
                            align: 'top',
                            color: '#0A3323',
                            font: { weight: 'bold', size: 12 }
                        }
                    },
                    scales: {
                        x: {
                            display: true,
                            ticks: {
                                color: '#105666',
                                maxRotation: 45,
                                minRotation: 0
                            },
                            grid: { display: false }
                        },
                        y: {
                            display: true,
                            ticks: { color: '#105666' },
                            grid: { color: 'rgba(0, 0, 0, 0.05)' },
                            suggestedMax: 12
                        }
                    }
                },
                plugins: [ChartDataLabels]
            }

            meuGrafico = new Chart(ctx, config)
        })
        .catch(err => {
            console.error('Erro ao buscar dados de criticidade:', err)
            resposta.innerHTML = 'Erro ao carregar dados do endpoint de criticidade.'
        })
})