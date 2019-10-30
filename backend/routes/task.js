const express = require('express');
const app = express();

const Task = require('../models/Task');

// GET Tasks
app.get('/', (req, res) => {
    
    Task.find({}, (err, tasks) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                msg: 'Error cargando tareas',
                errors: err
            })
        }

        res.status(200).json({
            ok: true,
            tasks
        })
    })
    
});

// POST Task
app.post('/', (req, res) => {
    var body = req.body;

    var task = new Task({
        description: body.description,
        status: body.status,
        attached: body.attached
    })

    task.save( (err, saved) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                msg: 'Error creando tareas',
                errors: err
            })
        }

        res.status(200).json({
            ok: true,
            saved
        })
    });
});

module.exports = app