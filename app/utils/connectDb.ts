
import mongoose from "mongoose";
export default async function connectDb():Promise<void> {
   
    await mongoose.connect(`${process.env.MONGOL_URL}`);    
}