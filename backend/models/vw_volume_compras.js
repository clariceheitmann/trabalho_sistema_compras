const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const VwVolumeCompras = db.define('VwTotalCategoria', {
    nome: {
        type: DataTypes.STRING(100),
        primaryKey: true 
    },
    quantidade_total_movimentada: {
        type: DataTypes.INTEGER
    },
    valor_financeiro_movimentado: {
        type: DataTypes.DECIMAL(10, 2)
    }
}, {
    timestamps: false,
    tableName: 'vw_volume_compras'
})

module.exports = VwVolumeCompras