import { MongoClient } from 'mongodb';


const uri: string = process.env.MONGODB_URI || ""



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



