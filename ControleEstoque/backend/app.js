const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser")
const moment = require('moment')
const consign = require("consign");

const user = require("./models/userSequelize");
const product = require("./models/productSequelize");
const entry = require("./models/entrySequelize");
const exit = require("./models/exitSequelize");
const stock = require("./models/stockSequelize");

consign()
    .include("controllers")
    .into(app);

// Criando tabelas do banco
user.sync();
product.sync();
entry.sync();
exit.sync();
stock.sync();

app.engine('handlebars', handlebars({
    defaultLayout: 'main',
    helpers: {
        formatDate: (date) => {
            return moment(date).format('DD/MM/YYYY')
        }
    }
}))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.listen(3000);
