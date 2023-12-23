import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase, closeDatabaseConnection } from '../../lib/mongodb'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    try {
      const db = await connectToDatabase();
      const collection = db.collection('BusTrips'); // Choose a name for your collection
      await collection.insertOne(req.body);
      res.status(201).json({ message: 'Data saved successfully!' });
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong!' });
    } 
    // finally {
    //   closeDatabaseConnection()
    // }
  }
  if (req.method === 'POST') {
    try {
      const db = await connectToDatabase();
      
      const busTrips = await db.collection('BusTrips').find(req.body).toArray();
      
      res.status(200).json({ busTrips });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
    // finally {
    //   closeDatabaseConnection()
    // }
  }

}