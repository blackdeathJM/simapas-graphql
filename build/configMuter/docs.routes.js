"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : {"default": mod};
};
Object.defineProperty(exports, "__esModule", {value: true});
const express_1 = __importDefault(require("express"));
const docs_1 = require("./docs");
const router = express_1.default.Router();
router.post('/docs', docs_1.agDocs).get('/:archivoUrl', docs_1.obDocs);
module.exports = router;
