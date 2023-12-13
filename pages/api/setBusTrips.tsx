import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase, closeDatabaseConnection } from '../../lib/mongodb'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const db = await connectToDatabase();
    try {
      const collection = db.collection('BusTrips'); // Choose a name for your collection
      await collection.insertOne(req.body);
      res.status(201).json({ message: 'Data saved successfully!' });
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong!' });
    } finally {
      closeDatabaseConnection()
    }
  } else {
    res.status(405).json({ message: 'Method not allowed!' });
  }

}