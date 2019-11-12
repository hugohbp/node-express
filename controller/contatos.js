module.exports = function (app) {

    var ContatoController = {
        index: function (req, res) {
            var usuario = req.session.usuario,
                contatos = usuario.contatos,
                params = {
                    usuario: usuario,
                    contatos: contatos
                };
            //  console.log('dentro do get');

            res.render('../contatos/index', params);
        },
        create: function (req, res) {
            console.log('dentro do create');
            var contato = req.body.contato,
                usuario = req.session.usuario;
            usuario.contatos.push(contato);

            res.redirect('/contatos');
        },
        show: (req, res) => {
            console.log('dentro do show');
            var id = req.params.id,
                contato = req.session.usuario.contatos[id],
                params = {
                    contato: contato,
                    id: id
                };
            res.render('../contatos/show', params);
        },
        edit: (req, res) => {
            console.log('dentro do edit');
            var id = req.params.id,
                usuario = req.session.usuario,
                contato = usuario.contatos[id],
                params = {
                    usuario: usuario,
                    contato: contato,
                    id: id
                };
            res.render('../contatos/edit', params);
        },
        update: (req, res) => {
            console.log('dentro do update');
            let contato = req.body.contato,
                usuario = req.session.usuario;
            usuario.contatos[req.params.id] = contato;
            res.redirect('/contatos');
        },
        destroy: (req, res) => {
            console.log('dentro do destroy');
            let usuario = req.session.usuario,
                id = req.params.id;
            usuario.contatos.splice(id, 1);
            res.redirect('/contatos');
        }
    }
    return ContatoController;

};