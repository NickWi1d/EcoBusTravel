import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase, closeDatabaseConnection } from '../../lib/mongodb'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('BusTrips');
    
    const busTrips = await collection.find({}).toArray();

    res.status(200).json({ busTrips });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }finally{
    closeDatabaseConnection()
  }
};
