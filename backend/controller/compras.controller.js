const Usuario = require('../models/usuarios')
const Produto = require('../models/produtos')
const Compra = require('../models/compras')

const cadastrar = async (req, res) => {
    const valores = req.body

    // Validação estrita usando os campos do enunciado
    if (!valores.idUsuario || !valores.idProduto || !valores.tipoMovimento || 
        !valores.quantidadeMovimentada || !valores.formaPagamento || 
        !valores.statusCompra || !valores.dataCompra) {
        return res.status(400).json({ message: 'Todos os campos obrigatórios devem ser preenchidos!' })
    }

    try {
        // 1 - Verificar se o produto existe no banco
        const produto = await Produto.findByPk(valores.idProduto)        
        if (!produto) {
            return res.status(404).json({ message: "Produto não encontrado!" })
        }

        // 2 - Verificar se o usuário existe no banco
        const usuario = await Usuario.findByPk(valores.idUsuario)        
        if (!usuario) {
            return res.status(404).json({ message: "Usuário não encontrado!" })
        }
        
        let novaQuantidade = produto.qtdeEstoque
        const precoUnit = produto.preco // Recupera o preço atual direto do cadastro do produto

        // Lógica de movimentação baseada no estoque atualizado
        if (valores.tipoMovimento === 'ENTRADA') {
            novaQuantidade += valores.quantidadeMovimentada
        } 
        else if (valores.tipoMovimento === 'SAIDA') {
            if (produto.qtdeEstoque < valores.quantidadeMovimentada) {
                return res.status(400).json({ message: "Quantidade insuficiente no estoque!" })
            }
            novaQuantidade -= valores.quantidadeMovimentada
        } 
        else {
            return res.status(400).json({ message: "Tipo de Movimentação Inválida! Use ENTRADA ou SAIDA." })
        }

        // Cálculo do preço final aplicando o desconto percentual enviado (ou o padrão do banco)
        const desconto = valores.descontoAplicado || 0.00
        const valorBruto = valores.quantidadeMovimentada * precoUnit
        const valorDesconto = valorBruto * (desconto / 100)
        const precoFinalCalculado = valorBruto - valorDesconto

        // 3 - Atualiza o estoque do produto com a nova quantidade calculada
        await produto.update({ qtdeEstoque: novaQuantidade })
        
        // 4 - Registra a compra na tabela intermediária injetando os valores calculados
        const compra = await Compra.create({
            idUsuario: valores.idUsuario,
            idProduto: valores.idProduto,
            tipoMovimento: valores.tipoMovimento,
            quantidadeMovimentada: valores.quantidadeMovimentada,
            precoUnitario: precoUnit,
            descontoAplicado: desconto,
            precoFinal: precoFinalCalculado,
            formaPagamento: valores.formaPagamento,
            statusCompra: valores.statusCompra,
            dataCompra: valores.dataCompra
        })

        res.status(201).json(compra)        
        
    } catch (err) {
        console.error('Erro ao registrar compra:', err)
        res.status(500).json({ message: "Erro ao registrar compra" })
    }    
}

// READ ALL
const listar = async (req, res) => {
    try {
        const dados = await Compra.findAll()
        res.status(200).json(dados)
    } catch (err) {
        console.error('Erro ao listar compras!', err)
        res.status(500).json({ message: 'Erro ao listar compras!' })
    }
}

// READ BY ID
const consultar = async (req, res) => {
    const id = req.params.id

    try {
        const dados = await Compra.findByPk(id)

        if (!dados) {
            return res.status(404).json({ message: 'Compra não encontrada!' })
        }

        res.status(200).json(dados)
    } catch (err) {
        console.error('Erro ao consultar compra!', err)
        res.status(500).json({ message: 'Erro ao consultar compra!' })
    }
}

// DELETE
const excluir = async (req, res) => {
    const id = req.params.id

    try {
        const dados = await Compra.findByPk(id)

        if (!dados) {
            return res.status(404).json({ message: 'Compra não encontrada!' })
        }

        await Compra.destroy({ where: { codCompra: id } })

        res.status(200).json({ message: 'Compra excluída com sucesso!' })
    } catch (err) {
        console.error('Erro ao excluir compra!', err)
        res.status(500).json({ message: 'Erro ao excluir compra!' })
    }
}

// UPDATE
const atualizar = async (req, res) => {
    const id = req.params.id
    const valores = req.body

    try {
        let dados = await Compra.findByPk(id)

        if (!dados) {
            return res.status(404).json({ message: 'Compra não encontrada!' })
        }

        await Compra.update(valores, { where: { codCompra: id } })

        dados = await Compra.findByPk(id)

        res.status(200).json(dados)
    } catch (err) {
        console.error('Erro ao atualizar compra!', err)
        res.status(500).json({ message: 'Erro ao atualizar compra!' })
    }
}


module.exports = {cadastrar, listar, consultar, excluir, atualizar}