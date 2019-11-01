var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var SEED = require('../config/constants').SEED;
var User = require('../models/user');

var app = express();

// =================================
// LOGIN
// =================================
app.post('/', (req, res) => {

    var body = req.body;

    User.findOne({ email: body.email }, (err, userDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Error al buscar usuario',
                errors: err
            });
        }

        if (!userDB ||
            !bcrypt.compareSync(body.password, userDB.password)) {
            return res.status(404).json({
                ok: false,
                message: 'Usuario o Contraseña incorrectos',
                errors: err
            });
        }

        // JWT Generation
        var token = jwt.sign(
            {user: userDB},
            SEED,
            {expiresIn: 14400} // 4hs
        );

        userDB.password = undefined;

        res.status(200).json({
            ok: true,
            user: userDB,
            token,
            id: userDB._id
        });
    });
});

module.exports = app;