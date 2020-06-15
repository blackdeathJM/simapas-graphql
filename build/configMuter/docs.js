"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function (resolve) {
            resolve(value);
        });
    }

    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }

        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }

        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }

        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : {"default": mod};
};
Object.defineProperty(exports, "__esModule", {value: true});
const filtroMulter_1 = require("./filtroMulter");
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));

function agDocs(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        filtroMulter_1.subiArchivo(req, res, function (error) {
            if (error) {
                return res.status(501).json({'Ocurrio un error': error});
            }
            if (req.file.filename) {
                const obPrefijo = req.file.filename.split('-', 1).shift();
                let checarRuta = path_1.default.resolve(__dirname, `../public/uploads/${obPrefijo}`);
                if (!fs_extra_1.default.pathExistsSync(checarRuta)) {
                    fs_extra_1.default.mkdirsSync(checarRuta);
                }
                let nvoRuta = path_1.default.resolve(__dirname, `../public/uploads/${obPrefijo}/` + req.file.filename);
                if (obPrefijo === 'deu') {
                    if (fs_extra_1.default.existsSync(nvoRuta)) {
                        fs_extra_1.default.removeSync(nvoRuta);
                    }
                }
                fs_extra_1.default.moveSync(req.file.path, nvoRuta);
                return res.json({nombreOriginal: req.file.originalname, nombreSubido: req.file.filename});
            } else {
                return res.json({mensaje: 'Error al intentar agregar el archivo'});
            }
        });
    });
}
exports.agDocs = agDocs;

function obDocs(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let archivoUrl = req.query.archivoUrl;
        let carpeta = req.params.archivoUrl;
        return res.sendFile(path_1.default.resolve(__dirname, `../public/uploads/${carpeta}/${archivoUrl}`));
    });
}
exports.obDocs = obDocs;
