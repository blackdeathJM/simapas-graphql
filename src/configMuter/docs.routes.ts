import express from 'express';
import {obDocs} from './docs';

export const router = express.Router().get('/:archivoUrl', obDocs);
