import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://vercel-admin-user:1728394650@cluster0.rq9uxti.mongodb.net'

let client: MongoClient;

export const connectToDatabase = async () => {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }
  return client.db('EcoBusTravel');
};
export const closeDatabaseConnection = async () => {
  if (client) {
    await client.close();
  }
};