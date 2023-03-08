const Sequelize = require('sequelize');

const sequelize = new Sequelize("controleestoque", "root", "1234", {
    host: "localhost",
    dialect: "mysql",
    logging: false,
});

sequelize.authenticate().then(() => {
  console.log("Server is running on http://localhost:3000");
}).catch( (erro) =>
console.log("Conexão com o banco de dados não realizado com sucesso! Erro gerado: " + erro ));

module.exports = sequelize;