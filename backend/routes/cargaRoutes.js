const express = require('express')
const router = express.Router()

const usuariosController = require('../controller/usuarios.controller')
const produtosController = require('../controller/produtos.controller')

router.get('/carga/usuarios', usuariosController.fetchUsuarios)
router.get('/carga/produtos', produtosController.fetchProdutos)

module.exports = router