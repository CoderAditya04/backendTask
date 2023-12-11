import { Crypto } from "../models/crypto.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const getCrypto = asyncHandler( async (req, res) => {
    try {
        const cryptos = await Crypto.find();
        res.json(cryptos);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
} )


export {
    getCrypto,
}