const express = require('express');
const app = express();

// Routes
app.get('/', (req, res) => {
    res.status(200).json({
        ok: true,
        msg: 'Get App'
    })
});

module.exports = app