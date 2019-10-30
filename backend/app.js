const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');

// DB Connection
mongoose.connect('mongodb://localhost:27017/todo-list', {useNewUrlParser: true, useUnifiedTopology: true}, (err, res) => {
    if (err) throw err;
    console.log('database todo-list: \x1b[32m%s\x1b[0m', 'online')
});

// Routes
app.get('/', (req, res) => {
    res.status(200).json({
        status: 'ok'
    })
});

app.listen(port, () => console.log(`listening on http://localhost:${port}`));
