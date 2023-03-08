const Sequilize = require('sequelize');
const conexao = require("../connection/connection");

// Mapeando a tabela User no banco de dados
const User = conexao.define('users', {
    id: {
        type: Sequilize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    user: {
        type: Sequilize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequilize.STRING,
        allowNull: false,
    },
});

//Criar tabela
User.sync

module.exports = User;
