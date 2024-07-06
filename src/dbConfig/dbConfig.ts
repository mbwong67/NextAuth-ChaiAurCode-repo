import mongoose from "mongoose";

export async function connect(){
    try{    
        mongoose.connect(process.env.MONGODB_URL!);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log("DB Connected Successfully");
        })

        connection.on('erorr', (err) => {
            console.log("MongoDB connection error, please make sure DB is up and running !!" + err);
        })
    } catch(err){
        console.log("Something went wrong while connecting to DB");
        console.log(err);
    }
}