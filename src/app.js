import express from "express";
import cors from "cors";
import moment from 'moment';
import cron from 'node-cron';
import axios from 'axios';
import { Crypto } from "./models/crypto.model";

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))


//routes import
import cryptoRouter from './routes/crypto.route'
import historyRouter from './routes/crypto.route'

//routes declaration
app.use("/api/v1/crypto", cryptoRouter)
// Endpoint to get historical price data
app.use('/api/v1/historical', historyRouter);

// Background job to update cryptocurrency list every hour
cron.schedule('0 * * * *', async () => {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/list');
    const cryptoNames = response.data.map((crypto) => ({ name: crypto.name }));
    
    await Crypto.deleteMany(); // Clear existing data
    await Crypto.insertMany(cryptoNames); // Insert new data

    console.log('Cryptocurrency list updated successfully');
  } catch (error) {
    console.error('Error updating cryptocurrency list:', error.message);
  }
});

export { app }

