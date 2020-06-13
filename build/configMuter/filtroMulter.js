"use strict";
var __importDefault = (this && this.__importDefault) || function(mod)
{
    return (mod && mod.__esModule) ? mod : {"default": mod};
};
Object.defineProperty(exports, "__esModule", {value: true});
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const almacenamientoMulter_1 = require("./almacenamientoMulter");
exports.subiArchivo = multer_1.default({
    storage: almacenamientoMulter_1.storage,
    limits: {fileSize: 200000000},
    fileFilter: (req, file, cb) =>
    {
        const filetypes = /jpeg|jpg|png|pdf/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path_1.default.extname(file.originalname).toLowerCase());
        if(mimetype && extname)
        {
            return cb(null, true);
        }
        cb(null, false);
    }
}).single('file');
