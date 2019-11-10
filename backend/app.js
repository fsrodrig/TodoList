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
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
  });

// Compiled webapp
app.use(express.static('client'));

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
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);
app.use('/api/login', loginRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/download', downloadRoutes);
app.use('/', appRoutes);

app.listen(port, () => console.log(`listening on http://localhost:${port}`));
