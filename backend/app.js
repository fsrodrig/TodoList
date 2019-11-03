var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var appRoutes = require('./routes/app');
var taskRoutes = require('./routes/task');
var userRoutes = require('./routes/user');
var loginRoutes = require('./routes/login')
var uploadRoutes = require('./routes/upload')
var downloadRoutes = require('./routes/download')
var app = express();
var port = 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


// DB Connection
mongoose.connect('mongodb://localhost:27017/todo-list', {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false,
    useCreateIndex: true
}, (err, res) => {
    if (err) throw err;
    console.log('database todo-list: \x1b[32m%s\x1b[0m', 'online')
});

// Routes
app.use('/tasks', taskRoutes);
app.use('/users', userRoutes);
app.use('/login', loginRoutes);
app.use('/upload', uploadRoutes);
app.use('/download', downloadRoutes);
app.use('/', appRoutes);

app.listen(port, () => console.log(`listening on http://localhost:${port}`));
