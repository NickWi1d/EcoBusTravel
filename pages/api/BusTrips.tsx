import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase, closeDatabaseConnection } from '../../lib/mongodb'
import { ObjectId } from 'mongodb';

function TransformQueryParams(queryParams:Record<string, string >){
  const params: Record<string, string | object> = {}
  let price = {$gte:0,$lte:100}
  for (const [key, value] of Object.entries(queryParams)) {
      if(key === 'from' || key === 'to' || key === 'date' || key === 'time' ){
        params[key] = value
    }
    else if(key === 'amount'){
      params['availableSeats'] = { $gte : parseInt(value, 10)}
    }
    else if(key === 'bottomPrice' ){
      price['$gte'] = Number(value)
    }else if(key === 'topPrice'){
      price['$lte'] = Number(value)
    }
  }
  params['price'] = price
  return params
}


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const db = await connectToDatabase();
  if (req.method === 'POST') {
    // try {
    //   const busTrips = await db.collection('BusTrips').find(req.body).toArray();
    //   res.status(200).json({ busTrips });
    // } catch (error) {
    //   console.error(error);
    //   res.status(500).json({ error: 'Internal Server Error' });
    // }
  }else if(req.method === 'GET'){
    const queryParams = req.query as Record<string, string>
    const params = TransformQueryParams(queryParams)
    console.log(params)
    if(queryParams){
      const busTrips = await db.collection('BusTrips').find(params).toArray();
      if(busTrips){
        res.status(200).json({ message: 'The results are found', busTrips });
      }else{
        res.status(401).json({ message: 'There are no results' });
      }
    }
    
  }
  else if (req.method === 'PUT') {
     // Обновление данных рейса
     const { _id, availableSeats} = req.body as { _id: string, availableSeats: number};
     if (_id) {
      try {
        const updateUser = await db.collection('BusTrips').updateOne({ _id: new ObjectId(_id) }, { $set: { availableSeats:availableSeats } });
        if (updateUser.modifiedCount === 1) {
          res.status(200).json({ message: 'TripInfo successfully updated' });
        } else if (updateUser.matchedCount === 0) {
          res.status(404).json({ message: 'Trip not found' });
        } else {
          res.status(200).json({ message: 'No changes made to the user' });
        }
      } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    } else {
      res.status(400).json({ message: 'Invalid or missing user tripID' });
    }
    // try {
    //   const collection = db.collection('BusTrips'); // Choose a name for your collection
    //   await collection.insertOne(req.body);
    //   res.status(201).json({ message: 'Data saved successfully!' });
    // } catch (error) {
    //   res.status(500).json({ message: 'Something went wrong!' });
    // } 
  }

}