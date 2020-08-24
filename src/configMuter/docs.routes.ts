import express from 'express';
import {agDocs, obDocs} from './docs';

export const router = express.Router().post('/docs', agDocs).get('/:archivoUrl', obDocs);
// module.exports = router;
