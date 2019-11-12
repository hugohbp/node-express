var express = require('express');
var router = express.Router();

// /* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'teste'
  });
});



//module.exports = router;

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('a user connected!');
  });

  return router;
};