const express = require('express');
const mongoose = require('mongoose');
const app = express();

const Task = require('../models/Task');

// GET Tasks
app.get('/', (req, res) => {

    var page = req.query.page || 0;
    var per_page = req.query.per_page || 5;
    page = Number(page);
    per_page = Number(per_page);

    if (isNaN(page) || isNaN(per_page)) {
        return res.status(400).json({
            ok: false,
            msg: 'Error de paginado',
            errors: err
        })
    }

    Task.find({})
        .skip(page)
        .limit(per_page)
        .exec(
            (err, tasks) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        msg: 'Error cargando tareas',
                        errors: err
                    })
                }

                Task.countDocuments({}, (err, count) => {
                    if (err) {
                        return res.status(500).json({
                            ok: false,
                            msg: 'Error cargando tareas',
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

// FIND Task
app.get('/search/:query?', (req, res) => {

    const query = req.params.query;
    const regex = new RegExp(query, 'i');
    const isId = mongoose.Types.ObjectId.isValid(query);
    const statusQuery = req.body.status;

    var queryParams = {
        $or: [{description: regex}, {_id: isId ? query: null}]
    };

    var page = req.query.page || 0;
    var per_page = req.query.per_page || 5;
    page = Number(page);
    per_page = Number(per_page);

    if (isNaN(page) || isNaN(per_page)) {
        return res.status(400).json({
            ok: false,
            msg: 'Error de paginado',
            errors: err
        })
    }

    if (statusQuery !== undefined) {
        queryParams.$and = [{status: statusQuery}];
        Task.find(queryParams)
        .skip(page)
        .limit(per_page)
        .exec(
            (err, tasks) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        msg: 'Error cargando tareas',
                        errors: err
                    });
                }

                Task.countDocuments(queryParams, (err, count) => {
                    if (err) {
                        return res.status(500).json({
                            ok: false,
                            msg: 'Error cargando tareas',
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
        .skip(page)
        .limit(per_page)
        .exec(
            (err, tasks) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        msg: 'Error cargando tareas',
                        errors: err
                    });
                }

                Task.countDocuments(queryParams, (err, count) => {
                    if (err) {
                        return res.status(500).json({
                            ok: false,
                            msg: 'Error cargando tareas',
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

// CREATE Task
app.post('/', (req, res) => {
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
                msg: 'Error creando tareas',
                errors: err
            })
        }

        res.status(201).json({
            ok: true,
            saved
        })
    });
});

// UPDATE Tasks
app.put('/:id', (req, res) => {
    const id = req.params.id;
    var body = req.body;

    Task.findById(id, (err, task) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                msg: 'Error al buscar tareas',
                errors: err
            })
        }

        if (!task) {
            return res.status(404).json({
                ok: false,
                msg: `No se encontró la tarea con id: ${id} `,
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
                    msg: 'Error actualizando tareas',
                    errors: err
                })
            }

            res.status(200).json({
                ok: true,
                saved
            })
        });
    });
});

// DELETE Task
app.delete('/:id', (req, res) => {
    const id = req.params.id;

    Task.findByIdAndRemove(id, (err, deleted) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                msg: 'Error actualizando tareas',
                errors: err
            })
        }

        if (!deleted) {
            return res.status(404).json({
                ok: false,
                msg: `No se encontró la tarea con id: ${id} `,
                errors: {
                    message: 'No se encontró una tarea con ese ID'
                }
            })
        }

        res.status(200).json({
            ok: true,
            deleted
        })
    });
})

module.exports = app