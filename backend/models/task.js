var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var taskSchema = new Schema({
    description: {type: String, required: [true, 'La descripción es obligatoria']},
    status: {type: Boolean, required: [true, 'El estado es obligatorio'], default: false},
    attached: {type: String, required: false}
})


module.exports = mongoose.model('Task', taskSchema);
