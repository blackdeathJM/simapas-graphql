"use strict";
var __importDefault = (this && this.__importDefault) || function(mod)
{
    return (mod && mod.__esModule) ? mod : {"default": mod};
};
Object.defineProperty(exports, "__esModule", {value: true});
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
exports.storage = multer_1.default.diskStorage({
    destination: (req, file, cb) =>
    {
        let ruta = '../public/uploads/temp';
        let checarRuta = path_1.default.resolve(__dirname, ruta);
        if(!fs_extra_1.default.pathExistsSync(checarRuta))
        {
            fs_extra_1.default.mkdirSync(checarRuta);
        }
        cb(null, path_1.default.join(__dirname, ruta));
    },
    filename: (req, file, cb) =>
    {
        cb(null, file.originalname);
    }
});
