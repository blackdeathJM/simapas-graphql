import mongoose from 'mongoose';

const archivosSubirSchema = new mongoose.Schema({
    _id: {type: String, required: 'El id es requerido'},
    archivoUrl: {type: String}
});
module.exports = mongoose.model('Archivos', archivosSubirSchema);
