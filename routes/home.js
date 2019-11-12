var express = require('express');
var router = express.Router();
var app = express();
var home = require('../controller/home');

router.get('/', (req, res, next) => home(app).index(req, res));
router.post('/', (req, res, next) => home(app).login(req, res));
router.get('/sair', (req, res, next) => home(app).logout(req, res));

module.exports = router;