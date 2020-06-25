import express from 'express';
import {agDocs, obDocs} from './docs';

const router = express.Router();

router.post('/docs', agDocs).get('/:archivoUrl', obDocs);

module.exports = router;
