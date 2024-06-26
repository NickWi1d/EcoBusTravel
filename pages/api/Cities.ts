// pages/api/Cites.tsx
import { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosError } from 'axios';
import { connectToDatabase, closeDatabaseConnection, getDB } from '@/lib/mongodb'
import { Db, ObjectId } from 'mongodb';
import { BusTrip, IUser, Passenger, UserTrip } from '@/types/types';
import { v4 as uuidv4 } from 'uuid';


const handlePost = async (req: NextApiRequest, res: NextApiResponse, db: Db) => {

}
const handleGet = async (req: NextApiRequest, res: NextApiResponse, db: Db) => {
    // const { db } = await connectToDatabase();
    // const db = getDB()
    try {
        // const { name } = req.query as { name: string };
        // console.log(name);
        
        const cities = await db.collection('Cities').find({}).toArray()
        console.log(cities);
        if (cities) {
            return res.status(200).json({ message: 'CitesList was successfully got', cities });

        } else {
            return res.status(401).json({ message: 'Неверные учетные данные' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
const handleDelete = async (req: NextApiRequest, res: NextApiResponse, db: Db) => {

}
const handleUpdate = async (req: NextApiRequest, res: NextApiResponse, db: Db) => {

}

const handleRequest = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;

    try {
      const { db } = await connectToDatabase();
      switch (method) {
        case 'POST':
          await handlePost(req, res, db);
          break;
        case 'GET':
          await handleGet(req, res, db);
          break;
        case 'DELETE':
          await handleDelete(req, res, db);
          break;
        case 'PUT':
          await handleUpdate(req, res, db);
          break;
        default:
          res.setHeader('Allow', ['POST', 'GET', 'DELETE', 'PUT']);
          res.status(405).json({ message: 'Method Not Allowed' });
          break;
      }
    } catch (error) {
      console.error('Error handling request:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    } finally {
      await closeDatabaseConnection();  // Закрытие соединения
    }
};
export default handleRequest