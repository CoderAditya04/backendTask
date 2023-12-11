import { Crypto } from "../models/crypto.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
  
  
const getHistory = asyncHandler( async (req, res) => {
    const { fromCurrency, toCurrency, date } = req.body;

    try {
      // Get Coingecko IDs for the specified currencies
      const fromCrypto = await Crypto.findOne({ name: fromCurrency });
      const toCrypto = await Crypto.findOne({ name: toCurrency });
  
      // Check if cryptocurrencies exist
      if (!fromCrypto || !toCrypto) {
        return res.status(404).json({ error: 'One or both of the specified cryptocurrencies not found.' });
      }
  
      // Format the date
      const formattedDate = moment(date, 'DD-MM-YYYY').format('DD-MM-YYYY');
  
      // Fetch historical price data from Coingecko API
      const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${fromCrypto.id}/history`, {
        params: {
          date: formattedDate,
        },
      });
  
      const historicalData = response.data.market_data;
  
      // Extract the price in terms of the target currency
      const priceInToCurrency = historicalData.current_price[toCrypto.name.toLowerCase()];
  
      res.json({
        fromCurrency,
        toCurrency,
        date: formattedDate,
        price: priceInToCurrency,
      });
    } catch (error) {
      console.error('Error fetching historical price data:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
})
  
  
export {
    getHistory,
}