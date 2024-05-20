// pages/api/Cites.tsx
import { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosError } from 'axios';
import { connectToDatabase, closeDatabaseConnection, getDB } from '@/lib/mongodb'
import { ObjectId } from 'mongodb';
import { BusTrip, IUser, Passenger, UserTrip } from '@/types/types';
import { v4 as uuidv4 } from 'uuid';


const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {

}
const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
    const { db } = await connectToDatabase();
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
const handleDelete = async (req: NextApiRequest, res: NextApiResponse) => {

}
const handleUpdate = async (req: NextApiRequest, res: NextApiResponse) => {

}

const handleRequest = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;
    switch (method) {
        case 'POST':
            return handlePost(req, res);
        case 'GET':
            return handleGet(req, res);
        case 'DELETE':
            return handleDelete(req, res);
        case 'PUT':
            return handleUpdate(req, res);
        default:
            return res.status(405).json({ message: 'Method Not Allowed' });
    }
};
export default handleRequest