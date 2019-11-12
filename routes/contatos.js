var express = require('express');
var router = express.Router();
var app = express();
var contatos = require('../controller/contatos');
var autenticar = require('../autenticador/autenticador');

router.use((req, res, next) => {
    autenticar(req, res, next);
});

router.route('/')
    .get((req, res) => contatos(app).index(req, res))
    .post((req, res) => contatos(app).create(req, res));

router.route('/:id')
    .get((req, res) => contatos(app).show(req, res))
    .delete((req, res) => contatos(app).destroy(req, res))
    .put((req, res) => contatos(app).update(req, res));

router.route('/:id/editar').get((req, res) => contatos(app).edit(req, res));

module.exports = router;