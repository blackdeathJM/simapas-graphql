import express from 'express';
import {agFolio, obFolio} from "./folio";
import {agDocExt, obDocExt} from "./docsExt";

const router = express.Router();

router.post('/folio', agFolio).get('/:archivoUrl', obFolio);
router.post('/docExt', agDocExt).get('/:archivoUrl', obDocExt);
module.exports = router;
