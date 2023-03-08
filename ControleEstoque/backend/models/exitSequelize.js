const Sequilize = require('sequelize');
const conexao = require("../connection/connection");
// Mapeando a tabela Exit no banco de dados
const Exit = conexao.define('exit', {
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
Exit.sync
module.exports = Exit;