const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var taskSchema = new Schema({
    description: {type: String, required: [true, 'El campo descripción es requerido']},
    status: {type: Boolean, required: [true, 'El campo estado es requerido'], default: false},
    attached: {type: String, required: false}
})


module.exports = mongoose.model('Task', taskSchema);
