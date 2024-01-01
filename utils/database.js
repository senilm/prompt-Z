import mongoose from "mongoose";

let isConnected = false

export const connectToDB = async () =>{
    mongoose.set('strictQuery',true)

    if (isConnected) {
        console.log('mongo running');
        return
    }

    try {
        await mongoose.connect(process.env.MONGO_URI,{
            dbName:'share_prompt',
        })
        isConnected= true
        console.log('db connected');
    } catch (error) {
        console.log(error);
    }
}