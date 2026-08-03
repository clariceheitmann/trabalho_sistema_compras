const VwProdutosCriticos = require('../models/vw_produtos_criticos.js')
const VwVolumeCompras = require('../models/vw_volume_compras.js')

const listarVolumeCompras = async (req, res) => {
    try {
        const dados = await VwVolumeCompras.findAll()
        res.status(200).json(dados)
    } catch (err) {
        console.error('Não foi possível listar o volume de compras!', err)
        res.status(500).json({ message: 'Não foi possível listar o volume de compras!' })
    }
}

const listarProdutosCriticos = async (req, res) => {
    try {
        const dados = await VwProdutosCriticos.findAll()
        res.status(200).json(dados)
    } catch (err) {
        console.error('Não foi possível listar os produtos críticos!', err)
        res.status(500).json({ message: 'Não foi possível listar os produtos críticos!' })
    }
}

module.exports = { listarVolumeCompras, listarProdutosCriticos }