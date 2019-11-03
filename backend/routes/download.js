var express = require('express');

var app = express();

const path = require('path');
const fs = require('fs');

app.get('/:folder/:attached', (req, res) => {
    
    const folder = req.params.folder;
    const attached = req.params.attached;

    var filePath = path.resolve(__dirname, `../uploads/${folder}/${attached}`);

    if(fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        return res.status(404).json({
            ok: false,
            message: 'No se encontró el archivo',
            errors: {
                message: `No existe el archivo: ${filePath}`
            }
        });
    }

});

module.exports = app