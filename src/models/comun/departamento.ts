import {model, Schema} from 'mongoose';


let departamentoSchema = new Schema({
    nombre: {type: String, unique: true, required: [true, 'El departamento es un campo requerido']}
});

export default model('Departamento', departamentoSchema);
