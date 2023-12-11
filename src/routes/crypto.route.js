import { Router } from "express";
import { getCrypto } from '../controllers/crypto.controller.js'
import { getHistory} from '../controllers/history.controller.js';

const router = Router()

router.route("/cryptos").post(getCrypto)
router.route('/histories').get(getHistory)


export default router