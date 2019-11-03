var express = require('express');
var app = express();
var mdAuth = require('../middlewares/autenticacion')
var User = require('../models/User');

var bcrypt = require('bcryptjs');

// =================================
// GET ALL USERS
// =================================
app.get('/', (req, res, next) => {

    User.find({}, 'name email role')
        .exec((err, users) => {

            if (err) {
                res.status(500).json({
                    ok: false,
                    message: 'Error al traer users',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                users
            });

        });

});

// =================================
// CREATE USER
// =================================
app.post('/', mdAuth.verifyToken, (req, res) => {

    var body = req.body;

    var user = new User({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    user.save((err, saved) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                message: 'Error al crear user',
                errors: err
            });
        }

        saved.password = undefined;

        res.status(201).json({
            ok: true,
            user: saved
        })
    });

});

// ==========================================
// UPDATE User
// ==========================================
app.put('/:id', mdAuth.verifyToken, (req, res) => {

    var id = req.params.id;
    var body = req.body;

    User.findById(id, (err, user) => {


        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Error al buscar user',
                errors: err
            });
        }

        if (!user) {
            return res.status(400).json({
                ok: false,
                message: 'El user con el id ' + id + ' no existe',
                errors: { message: 'No existe un user con ese ID' }
            });
        }


        user.nombre = body.nombre;
        user.email = body.email;
        user.role = body.role;

        user.save((err, saved) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    message: 'Error al actualizar user',
                    errors: err
                });
            }

            saved.password = ':)';

            res.status(200).json({
                ok: true,
                user: saved
            });

        });

    });

});

// ============================================
//   DELETE User
// ============================================
app.delete('/:id', mdAuth.verifyToken, (req, res) => {

    var id = req.params.id;

    User.findByIdAndRemove(id, (err, deleted) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Error borrar user',
                errors: err
            });
        }

        if (!deleted) {
            return res.status(400).json({
                ok: false,
                message: 'No existe un user con ese id',
                errors: { message: 'No existe un user con ese id' }
            });
        }

        res.status(200).json({
            ok: true,
            user: deleted
        });

    });

});

module.exports = app;