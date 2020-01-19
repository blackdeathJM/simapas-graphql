import express from 'express';
import {agFolio, obFolio} from "./folio";

const router = express.Router();

router.post('/folio', agFolio).get('/:archivoUrl', obFolio);

module.exports = router;
