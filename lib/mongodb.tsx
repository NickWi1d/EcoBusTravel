import { MongoClient, Db, MongoClientOptions } from 'mongodb';


const uri: string = process.env.MONGODB_URI || ""
const dbName = 'EcoBusTravel';


// let client: MongoClient;
let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export const connectToDatabase = async (): Promise<{ client: MongoClient; db: Db }> => {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    cachedClient = client;
    cachedDb = db;
    return { client, db };
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    throw error;
  }

  // if (!client) {
  //   client = new MongoClient(uri);
  //   await client.connect();
  // }
  // return client.db('EcoBusTravel');

};

export function getDB(): Db {
  if (!cachedClient) {
    throw new Error('No MongoDB client available');
  }
  const db = cachedClient.db(dbName);
  return db;
}
export const closeDatabaseConnection = async (): Promise<void> => {
  // if (client) {
  //   await client.close();
  // }
  if (cachedClient) {
    await cachedClient.close();
    cachedClient = null;
    cachedDb = null;
  }
};



