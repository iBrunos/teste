const Sequilize = require('sequelize');
const conexao = require("../connection/connection");
// Mapeando a tabela Stock no banco de dados
const Stock = conexao.define('stock', {
    id: {
        type: Sequilize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    product: {
        type: Sequilize.STRING,
        allowNull: false,
    },
    price: {
        type: Sequilize.DECIMAL,
        allowNull: false,
    },
    brand: {
        type: Sequilize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequilize.STRING(1234),
        allowNull: false,
    },
    amount: {
        type: Sequilize.INTEGER,
        allowNull: false,
    },
});
//Criar tabela
Stock.sync
module.exports = Stock;