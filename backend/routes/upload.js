var express = require('express');
var fileUpload = require('express-fileupload');
var mdAuth = require('../middlewares/autenticacion');

var app = express();

var Task = require('../models/Task');
var os = process.platform;
var fs = require('fs');

// default options
app.use(fileUpload())

app.put('/:folder/:id', mdAuth.verifyToken, (req, res, next) => {

    const id = req.params.id;
    const folder = req.params.folder;
    var path;

    // Allowed folders
    const validFolder = ['tasks'];
    if (validFolder.indexOf(folder) < 0) {
        return res.status(400).json({
            ok: false,
            message: 'La carpeta en la que intenta guardar no es válida',
            errors: {
                message: `No existe la carpeta: ${folder}`
            }
        });
    }

    if (!req.files) {
        return res.status(400).json({
            ok: false,
            message: 'No se encontraron archivos',
            errors: {
                message: 'No se encontraron archivos'
            }
        });
    }

    // Get file name
    var file = req.files.attached;
    var fileName = file.name.split('.');
    var fileExt = fileName[fileName.length - 1];

    // Accepted file extensions
    var validExt = ['jpg', 'jpeg', 'png', 'gif', 'doc', 'docx', 'pdf', 'txt'];

    if (validExt.indexOf(fileExt) < 0) {
        return res.status(400).json({
            ok: false,
            message: 'Extensión no válida',
            errors: {
                message: 'Los tipos de archivo permitidos son: ' + validExt.join(', ')
            }
        });
    }

    // File name
    const storageName = `${id}-${ new Date().getMilliseconds()}.${fileExt}`;
    // Save file
    if (os === 'win32') {
        path = `.\\uploads\\${folder}\\${storageName}`;
    } else {
        path = `./uploads/${folder}/${storageName}`;
    }
    file.mv(path, err => {
        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Error al guardar archivo',
                errors: err
            });
        }

        saveAttached(storageName, id, res)

    });

});

function saveAttached(storageName, id, res) {

    Task.findById(id, (err, task) => {
        if (err) {
            deleteFile(storageName);
            return res.status(404).json({
                ok: false,
                message: 'Tarea no encontrada',
                errors: err
            })
        }

        // Si ya existia una imagen o documento para esta tarea la borro.
        deleteFile(task.attached);

        task.attached = storageName;

        task.save((err, saved) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    message: 'Error al guardar la tarea',
                    errors: err
                });
            }

            return res.status(200).json({
                ok: true,
                message: 'Archivo guardado',
                fileName: saved
            });
        })
    });
}

function deleteFile(fileName) {

    var path;
    if (os === 'win32') {
        path = `.\\uploads\\tasks\\${fileName}`;
    } else {
        path = `./uploads/tasks/${fileName}`;
    }

    if (fs.existsSync(path)) {
        fs.unlinkSync(path);
    }
}


module.exports = app