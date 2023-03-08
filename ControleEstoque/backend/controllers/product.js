const express = require('express');

const Product = require('../models/productSequelize');

module.exports = (app) => {
app.use(express.json());

app.get("/renderStckpage", async (req, res) => {
    res.render('stockPage');    
   });
app.get("/products", async (req, res) => {
    await Product.findAll({
        attributes: ['id', 'product', 'price', 'brand', 'description', 'amount'],
        order: [['id', "DESC"]]
    })
    .then((products) => {
        return res.json({
            erro: false,
            products,
            id_usuario_logado: req.productId
        });
    }).catch((erro) => {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Nenhum produto encontrado!" + erro
        });
    });    
});

app.delete('delete/products/:id'), function(req, res){

    Product.destroy({
        where: {'id': req.params.id}

    }).then(() => {
        return res.json({
            erro: false,
            mensagem: "Produto deletado com sucesso!"
        });
    }).catch((erro) => {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Produto não deletado com sucesso!" + erro
        });

    });
};

app.post("/register/products", async (req, res) => {
    var dados = req.body;

    await Product.create(dados)
    .then(() => {
        res.redirect('http://127.0.0.1:5500/frontend/src/assets/pages/stockPage.html')
      //return res.json({
         // erro: false,
         // mensagem: "Produto cadastrado com sucesso!"
      //});
  }).catch((erro) => {
      return res.status(400).json({
          erro: true,
          mensagem: "Erro: Produto não cadastrado com sucesso!" + erro
      });
  });    
});
}