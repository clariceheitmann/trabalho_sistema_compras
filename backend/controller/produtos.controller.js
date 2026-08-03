const Produto = require('../models/produtos')

// CREATE
const cadastrar = async (req, res) => {
    const valores = req.body

    if (!valores.nome || !valores.categoria || !valores.preco || !valores.qtdeEstoque) {
        return res.status(400).json({ message: 'Os campos obrigatórios: nome, categoria, preço e quantidade no estoque devem ser preenchidos!' })
    }

    try {
        await Produto.create(valores)
        res.status(201).json({ message: 'Produto cadastrado com sucesso!' })
    } catch (err) {
        console.error('Erro ao cadastrar produto!', err)
        res.status(500).json({ message: 'Erro ao cadastrar produto!' })
    }
}

// READ ALL
const listar = async (req, res) => {
    try {
        const dados = await Produto.findAll()
        res.status(200).json(dados)
    } catch (err) {
        console.error('Erro ao listar produto!', err)
        res.status(500).json({ message: 'Erro ao listar produto!' })
    }
}

// READ BY ID
const consultar = async (req, res) => {
    const id = req.params.id

    try {
        const dados = await Produto.findByPk(id)

        if (!dados) {
            return res.status(404).json({ message: 'Produto não encontrado!' })
        }

        res.status(200).json(dados)
    } catch (err) {
        console.error('Erro ao consultar produto!', err)
        res.status(500).json({ message: 'Erro ao consultar produto!' })
    }
}

// DELETE
const excluir = async (req, res) => {
    const id = req.params.id

    try {
        const dados = await Produto.findByPk(id)

        if (!dados) {
            return res.status(404).json({ message: 'Produto não encontrado!' })
        }

        await Produto.destroy({ where: { codProduto: id } })

        res.status(200).json({ message: 'Produto excluído com sucesso!' })
    } catch (err) {
        console.error('Erro ao excluir produto!', err)
        res.status(500).json({ message: 'Erro ao excluir produto!' })
    }
}

// UPDATE
const atualizar = async (req, res) => {
    const id = req.params.id
    const valores = req.body

    try {
        let dados = await Produto.findByPk(id)

        if (!dados) {
            return res.status(404).json({ message: 'Produto não encontrado!' })
        }

        await Produto.update(valores, { where: { codProduto: id } })

        dados = await Produto.findByPk(id)

        res.status(200).json(dados)
    } catch (err) {
        console.error('Erro ao atualizar produto!', err)
        res.status(500).json({ message: 'Erro ao atualizar produto!' })
    }
}

// CARGA EM LOTE
const cargaLote = async (req, res) => {
    const listaProdutos = req.body

    if (!listaProdutos || listaProdutos.length === 0) {
        return res.status(400).json({ message: 'Nenhum dado válido foi enviado!' })
    }

    const produtosMapeados = listaProdutos.map(item => ({
        nome: item.nome || item.title,
        descricao: item.descricao || item.description,
        categoria: item.categoria || item.category,
        preco: item.preco || item.price,
        desconto: item.desconto || item.discountPercentage,
        qtdeEstoque: item.qtdeEstoque || item.stock,
        marca: item.marca || item.brand,
        imagem: item.imagem || item.thumbnail
    }))

    try {
        await Produto.bulkCreate(produtosMapeados)
        res.status(201).json({ message: 'Carga em lote realizada com sucesso!' })
    } catch (err) {
        console.error('Erro no bulkCreate:', err)
        res.status(500).json({ message: 'Erro ao salvar produtos' })
    }
}

const fetchProdutos = async (req, res) => {
    try {
        const resposta = await fetch('https://dummyjson.com/products')
        const dados = await resposta.json()

        const lista = dados.products

        const produtosMapeados = lista.map(item => ({
            nome: item.title,
            descricao: item.description,
            categoria: item.category,
            preco: item.price,
            desconto: item.discountPercentage,
            qtdeEstoque: item.stock,
            marca: item.brand,
            imagem: item.thumbnail
        }))

        await Produto.bulkCreate(produtosMapeados)

        res.status(201).json({ message: 'Produtos importados com sucesso!' })

    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Erro ao importar produtos' })
    }
}

module.exports = {cadastrar, listar, consultar, excluir, atualizar, cargaLote, fetchProdutos}