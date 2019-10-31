const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const appRoutes = require('./routes/app');
const taskRoutes = require('./routes/task');

const app = express();
const port = 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


// DB Connection
mongoose.connect('mongodb://localhost:27017/todo-list', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}, (err, res) => {
    if (err) throw err;
    console.log('database todo-list: \x1b[32m%s\x1b[0m', 'online')
});

// Routes
app.use('/tasks', taskRoutes)
app.use('/', appRoutes);

app.listen(port, () => console.log(`listening on http://localhost:${port}`));
