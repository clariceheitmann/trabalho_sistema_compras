const express = require('express')
const app = express()
const cors = require('cors')
const cargaRoutes = require('./routes/cargaRoutes')

const conn = require('./db/conn')
const usuariosController = require('./controller/usuarios.controller')
const produtosController = require('./controller/produtos.controller')
const comprasController = require('./controller/compras.controller')
const relatorioVWController = require('./controller/relatorioVW.controller')
const hostname = 'localhost'
const PORT = 3000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use(cargaRoutes)

// Usuários
app.post('/usuario', usuariosController.cadastrar)
app.get('/usuarios', usuariosController.listar)
app.get('/usuario/:id', usuariosController.consultar)
app.delete('/usuario/:id', usuariosController.excluir)
app.put('/usuario/:id', usuariosController.atualizar)
app.post('/usuarios/carga-lote', usuariosController.cargaLote)

// Produtos
app.post('/produto', produtosController.cadastrar)
app.get('/produtos', produtosController.listar)
app.get('/produto/:id', produtosController.consultar)
app.delete('/produto/:id', produtosController.excluir)
app.put('/produto/:id', produtosController.atualizar)
app.post('/produtos/carga-lote', produtosController.cargaLote)

// Compras
app.post('/compra', comprasController.cadastrar)
app.get('/compras', comprasController.listar)
app.get('/compra/:id', comprasController.consultar)
app.delete('/compra/:id', comprasController.excluir)
app.put('/compra/:id', comprasController.atualizar)

// Relatórios VW
app.get('/volumeCompras', relatorioVWController.listarVolumeCompras)
app.get('/produtosCriticos', relatorioVWController.listarProdutosCriticos)

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Aplicação rodando!' })
})

conn.sync()
    .then(() => {
        app.listen(PORT, hostname, () => {
            console.log(`Aplicação rodando em: http://${hostname}:${PORT}`)
        })
    })
    .catch((err) => {
        console.error('Erro ao se conectar com o banco de dados!', err)
    })