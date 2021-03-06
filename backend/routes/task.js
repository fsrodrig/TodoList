var express = require('express');
var mongoose = require('mongoose');
var Task = require('../models/Task');
var mdAuth = require('../middlewares/autenticacion');


var app = express();

// =================================
// GET ALL TASKS
// =================================
app.get('/', mdAuth.verifyToken, (req, res) => {

    Task.find({})
        .exec(
            (err, tasks) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        message: 'Error cargando tareas',
                        errors: err
                    })
                }

                Task.countDocuments({}, (err, count) => {
                    if (err) {
                        return res.status(500).json({
                            ok: false,
                            message: 'Error cargando tareas',
                            errors: err
                        })
                    }
                    res.status(200).json({
                        ok: true,
                        tasks,
                        count
                    })
                });
            })

});

// =================================
// FIND TASKS
// =================================
app.get('/search', mdAuth.verifyToken, (req, res) => {

    const query = req.query.query;
    const regex = new RegExp(query, 'i');
    const isId = mongoose.Types.ObjectId.isValid(query);
    const statusQuery = req.query.status;

    var queryParams = {
        $or: [{description: regex}, {_id: isId ? query: null}]
    };

    if (statusQuery != undefined) {
        queryParams.$and = [{status: statusQuery}];
        Task.find(queryParams)
        .exec(
            (err, tasks) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        message: 'Error cargando tareas',
                        errors: err
                    });
                }

                Task.countDocuments(queryParams, (err, count) => {
                    if (err) {
                        return res.status(500).json({
                            ok: false,
                            message: 'Error cargando tareas',
                            errors: err
                        });
                    }
                    res.status(200).json({
                        ok: true,
                        tasks,
                        count
                    });
                });
            });
    } else {
        Task.find(queryParams)
        .exec(
            (err, tasks) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        message: 'Error cargando tareas',
                        errors: err
                    });
                }

                Task.countDocuments(queryParams, (err, count) => {
                    if (err) {
                        return res.status(500).json({
                            ok: false,
                            message: 'Error cargando tareas',
                            errors: err
                        });
                    }
                    res.status(200).json({
                        ok: true,
                        tasks,
                        count
                    });
                });
            });
    }

});

// =================================
// CREATE TASKS
// =================================
app.post('/', mdAuth.verifyToken, (req, res) => {
    var body = req.body;

    var task = new Task({
        description: body.description,
        status: body.status,
        attached: body.attached
    })

    task.save((err, saved) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Error creando tareas',
                errors: err
            })
        }

        res.status(201).json({
            ok: true,
            task: saved
        })
    });
});

// =================================
// UPDATE Task
// =================================
app.put('/:id', mdAuth.verifyToken, (req, res) => {
    const id = req.params.id;
    var body = req.body;

    Task.findById(id, (err, task) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Error al buscar tareas',
                errors: err
            })
        }

        if (!task) {
            return res.status(404).json({
                ok: false,
                message: `No se encontró la tarea con id: ${id} `,
                errors: {
                    message: 'No se encontró una tarea con ese ID'
                }
            })
        }

        task.description = body.description;
        task.status = body.status;
        task.attached = body.attached;

        task.save((err, saved) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    message: 'Error actualizando tareas',
                    errors: err
                })
            }

            res.status(200).json({
                ok: true,
                task: saved
            })
        });
    });
});

// =================================
// DELETE Task
// =================================
app.delete('/:id', mdAuth.verifyToken, (req, res) => {
    const id = req.params.id;

    Task.findByIdAndRemove(id, (err, deleted) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Error eliminando tareas',
                errors: err
            })
        }

        if (!deleted) {
            return res.status(404).json({
                ok: false,
                message: `No se encontró la tarea con id: ${id} `,
                errors: {
                    message: 'No se encontró una tarea con ese ID'
                }
            })
        }

        res.status(200).json({
            ok: true,
            task: deleted
        })
    });
})

module.exports = app