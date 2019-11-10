var express = require('express');
var app = express();

// Routes
app.get('/', (req, res) => {
    res.sendFile('../client/index.html', { root: __dirname });
});

module.exports = app