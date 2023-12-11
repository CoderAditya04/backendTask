import mongoose, {Schema} from "mongoose";

const cryptoSchema = new Schema({
    name: String,
  },{timestamps: true});
  
export const Crypto = mongoose.model('Crypto', cryptoSchema);