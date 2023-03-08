const express = require('express');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { eAdmin } = require('../middlewares/auth');
const User = require('../models/userSequelize');

module.exports = (app) => {
app.use(express.json());

app.get("/users", eAdmin, async (req, res) => {
    await User.findAll({
        attributes: ['id', 'user'],
        order: [['id', "DESC"]]
    })
    .then((users) => {
        return res.json({
            erro: false,
            users,
            id_usuario_logado: req.userId
        });
    }).catch((erro) => {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Nenhum usuário encontrado!" + erro
        });
    });    
});

app.post("/users/register", async (req, res) => {
    var dados = req.body;

    dados.password = await bcrypt.hash(dados.password, 8);

    await User.create(dados)
    .then(() => {
        return res.json({
            erro: false,
            mensagem: "Usuário cadastrado com sucesso!"
        });
    }).catch((erro) => {
    }).catch(() => {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Usuário não cadastrado com sucesso!" + erro
        });
    });    
});

  app.post("/login", async (req, res) => {

    const usuario = await User.findOne({
        attributes: ['id', 'user', 'password'],
        where: {
            user: req.body.user
        }
    });

    if(usuario === null){
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Usuário ou a senha incorreta! Nenhum usuário com este e-mail"
        });
    }

    if(!(await bcrypt.compare(req.body.password, usuario.password))){
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Usuário ou a senha incorreta! Senha incorreta!"
        });
    }

    var token = jwt.sign({id: usuario.id}, "BRUNORIBEIROSEIXAS020701", {
        //expiresIn: 600 //10 min
        //expiresIn: 60 //1 min
        expiresIn: '7d' // 7 dia
    });

    return res.json({
        erro: false,
        mensagem: "Login realizado com sucesso!",
        token
    });
});
}