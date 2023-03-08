const Sequilize = require('sequelize');
const conexao = require("../connection/connection");

// Mapeando a tabela User no banco de dados
const Product = conexao.define('product', {
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
        type: Sequilize.STRING,
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
Product.sync

module.exports = Product;
