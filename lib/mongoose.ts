
import mongoose from 'mongoose';

let isConnected = false; 

export const dbConnection = async() => {
   mongoose.set('strictQuery', true);

   if(!process.env.MONDODB_URI) return 'No MONGODB URI FOUND!';

   if(isConnected) return 'CONNECTION ALREADY FOUND!';

   try{
    await mongoose.connect(process.env.MONGODB_URI as string);
    isConnected = true;
    console.log('DATABASE CONNECTION SUCCEEDED!');
     
   } catch (err:any) {
     console.log(err?.message);
   }
}



export const mongooseConnect = async() => {
    if(mongoose.connection.readyState === 1){
      return mongoose.connection.asPromise();
    } else{
       return mongoose.connect(process.env.MONGODB_URI as string);
    }
}