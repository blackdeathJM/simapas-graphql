import express from 'express';
import {agFolio, obFolio} from "./folio";

const router = express.Router();

router.route('/folio').post(agFolio).get(obFolio);

module.exports = router;
