var express = require('express');
var app = express();

// Routes
app.get('/', (req, res) => {
    res.status(200).json({
        ok: true,
        message: 'Conection Success'
    })
});

module.exports = app