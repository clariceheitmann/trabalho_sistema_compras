const Usuario = require('../models/usuarios')

const cadastrar = async (req, res) => {
    const valores = req.body

    if (!valores.nome || !valores.sobrenome || !valores.idade || !valores.email) {
        return res.status(400).json({ message: 'Os campos obrigatórios: nome, sobrenome, idade e email devem ser preenchidos!' })
    }

    try {
        await Usuario.create(valores)
        res.status(201).json({ message: 'Usuário cadastrado com sucesso!' })
    } catch (err) {
        console.error('Erro ao cadastrar usuário!', err)
        res.status(500).json({ message: 'Erro ao cadastrar usuário!' })
    }
}

const listar = async (req, res) => {

    try {
        const dados = await Usuario.findAll()
        res.status(200).json(dados)
    } catch (err) {
        console.error('Erro ao listar usuários!', err)
        res.status(500).json({ message: 'Erro ao listar usuários!' })
    }
}

const consultar = async (req, res) => {
    const id = req.params.id

    try {
        const dados = await Usuario.findByPk(id)
        if (!dados) {
            res.status(404).json({ message: 'Usuário não encontrado!' })
        } else {
            res.status(200).json(dados)
        }
    } catch (err) {
        console.error('Erro ao consultar usuário!', err)
        res.status(500).json({ message: 'Erro ao consultar usuário!' })
    }
}

const excluir = async (req, res) => {
    const id = req.params.id

    try {
        const dados = await Usuario.findByPk(id)
        if (!dados) {
            res.status(404).json({ message: 'Usuário não encontrado!' })
        } else {
            await Usuario.destroy({ where: { codUsuario: id } })
            res.status(200).json({ message: 'Usuário excluído com sucesso!' })
        }
    } catch (err) {
        console.error('Erro ao excluir usuário!', err)
        res.status(500).json({ message: 'Erro ao excluir usuário!' })
    }
}

const atualizar = async (req, res) => {
    const valores = req.body
    const id = req.params.id

    try {
        let dados = await Usuario.findByPk(id)
        if (!dados) {
            res.status(404).json({ message: 'Usuário não encontrado!' })
        } else {
            await Usuario.update(valores, { where: { codUsuario: id } })
            dados = await Usuario.findByPk(id)
            res.status(200).json(dados)
        }
    } catch (err) {
        console.error('Erro ao atualizar usuário!', err)
        res.status(500).json({ message: 'Erro ao atualizar usuário!' })
    }
}

// Operação de Carga Inicial em Lote 
const cargaLote = (req, res) => {
    const listaUsuarios = req.body

    if (!listaUsuarios || listaUsuarios.length === 0) {
        return res.status(400).json({ message: 'Nenhum dado válido foi enviado para a carga em lote de usuários!' })
    }

    const usuariosMapeados = []

    for (let i = 0; i < listaUsuarios.length; i++) {
        const item = listaUsuarios[i]

        usuariosMapeados.push({
            nome: item.firstName,
            sobrenome: item.lastName,
            idade: item.age,
            email: item.email,
            telefone: item.phone,
            endereco: item.address?.address,
            cidade: item.address?.city,
            estado: item.address?.state
        })
    }

    Usuario.bulkCreate(usuariosMapeados)
        .then(() => {
            res.status(201).json({ message: 'Carga em lote de usuários realizada com sucesso no banco!' })
        })
        .catch((err) => {
            console.error('Erro no bulkCreate de usuários:', err)
            res.status(500).json({ message: 'Erro ao salvar os usuários em lote no banco de dados' })
        })
}

const fetchUsuarios = async (req, res) => {
    try {
        const resposta = await fetch('https://dummyjson.com/users')
        const dados = await resposta.json()

        const lista = dados.users

        const usuariosMapeados = lista.map(item => ({
            nome: item.firstName,
            sobrenome: item.lastName,
            idade: item.age,
            email: item.email,
            telefone: item.phone,
            endereco: item.address?.address || '',
            cidade: item.address?.city || '',
            estado: item.address?.state || ''
        }))

        await Usuario.bulkCreate(usuariosMapeados)

        res.status(201).json({ message: 'Usuários importados com sucesso!' })

    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Erro ao importar usuários' })
    }
}

module.exports = { cadastrar, listar, consultar, excluir, atualizar, cargaLote, fetchUsuarios }