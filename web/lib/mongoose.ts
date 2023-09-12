import mongoose from 'mongoose';

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  if (!process.env.MONGODB_URL) return console.log('MONGODB_URL not found!!');
  if (isConnected) return console.log('Already connected to Mongo DB');

  try {
    await mongoose.connect(process.env.MONGODB_URL);

    isConnected = true;
    console.log('Connected to Mongo DB!');
  } catch (error) {
    console.log('Error from connection of Mongo DB ==>:', error);
  }
};