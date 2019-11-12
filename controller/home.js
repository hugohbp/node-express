module.exports = function (app) {
    //var Usuario = app.models.usuario;
    var HomeController = {
        index: function (req, res) {
            res.render('home/index');
        },
        login: function (req, res) {
            // console.log(req.body);
            var email = req.body.usuario.email,
                nome = req.body.usuario.nome;
            if (email && nome) {
                console.log('email e nome');
                var usuario = req.body.usuario;
                usuario['contatos'] = [];
                console.log('session:  ', req.session);
                req.session['usuario'] = usuario;
                res.redirect('/contatos');
            } else {
                console.log('redireciona');
                res.redirect('/');
            }
        },
        logout: function (req, res) {
            req.session.destroy();
            res.redirect('/');
        }
    };
    return HomeController;
};