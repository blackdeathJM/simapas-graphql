"use strict";
var __awaiter = (this && this.__awaiter) || function(thisArg, _arguments, P, generator)
{
    function adopt(value) { return value instanceof P ? value : new P(function(resolve) { resolve(value); }); }

    return new (P || (P = Promise))(function(resolve, reject)
    {
        function fulfilled(value)
        {
            try
            {
                step(generator.next(value));
            } catch(e)
            {
                reject(e);
            }
        }

        function rejected(value)
        {
            try
            {
                step(generator["throw"](value));
            } catch(e)
            {
                reject(e);
            }
        }

        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }

        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", {value: true});
const constants_1 = require("../../config/constants");
const bson_1 = require("bson");
const mutationDeptos = {
    Mutation: {
        registroDepto(_, {departamento}, {db})
        {
            return __awaiter(this, void 0, void 0, function* ()
            {
                return yield db.collection(constants_1.COLECCIONES.DEPARTAMENTOS).insertOne(departamento).then((departamento) => __awaiter(this, void 0, void 0, function* ()
                {
                    return {
                        estatus: true,
                        mensaje: 'Departamento insertado satisfactoriamente',
                        departamento: departamento.value
                    };
                })).catch((error) => __awaiter(this, void 0, void 0, function* ()
                {
                    return {
                        estatus: false,
                        mensaje: 'Ocurrio un error al tratar de registrar el departamento', error,
                        departamento: null
                    };
                }));
            });
        },
        actualizarDepto(_, {deptoInput}, {db})
        {
            return __awaiter(this, void 0, void 0, function* ()
            {
                return yield db.collection(constants_1.COLECCIONES.DEPARTAMENTOS).findOneAndUpdate({_id: new bson_1.ObjectId(deptoInput._id)}, {$set: {nombre: deptoInput.nombre}}).then((departamento) => __awaiter(this, void 0, void 0, function* ()
                {
                    return {
                        estatus: true,
                        mensaje: 'Departamento actualizado correctamente',
                        departamento: departamento.value
                    };
                })).catch((error) => __awaiter(this, void 0, void 0, function* ()
                {
                    return {
                        estatus: false,
                        mensaje: 'Error al intentar actualizar el departamento', error,
                        departamento: null
                    };
                }));
            });
        },
    }
};
exports.default = mutationDeptos;
