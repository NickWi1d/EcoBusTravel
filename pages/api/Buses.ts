import { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosError } from 'axios';
import bcrypt from 'bcrypt'
import { connectToDatabase, closeDatabaseConnection, getDB } from '@/lib/mongodb'
import { ObjectId } from 'mongodb';
import { BusTrip, IUser, Passenger, UserTrip, typeOfBus } from '@/types/types';
import { v4 as uuidv4 } from 'uuid';



const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
    const { db } = await connectToDatabase();
    try {
        const { type, amountOfSeats, plateNumber } = req.body as { type: string, amountOfSeats: number, plateNumber: string }

        const checkBusNum = await db.collection('Buses').findOne({ plateNumber })
        if (!checkBusNum) {
            console.log(type, amountOfSeats, plateNumber)
            const addBus = await db.collection('Buses').insertOne({ type: type, amountOfSeat: amountOfSeats, plateNumber: plateNumber });
            if (addBus.acknowledged === true) {
                return res.status(200).json({ message: 'Add new bus is successful', addBus });
            } else {
                return res.status(404).json({ message: 'Something went wrongd' })
            }

        } else if (checkBusNum) {
            console.log('Автобус с таким номерным знаком уже существует')
            return res.status(401).json({ message: 'Автобус с таким номерным знаком уже существует' });
        }
    } catch (error) {
        console.error('Error during registration:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
    const { db } = await connectToDatabase();
    try {
        const buses = await db.collection('Buses').find({}).toArray();
        if (buses) {
            return res.status(200).json({ message: 'Getting data is successfull', buses });
        } else {
            return res.status(401).json({ message: 'Somesing went wrong' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
const handleDelete = async (req: NextApiRequest, res: NextApiResponse) => {
    // const { db } = await connectToDatabase();
    // // const db = getDB()
    // try {
    //     const { uid } = req.query as { uid: string }
    //     if (uid && typeof uid === 'string') {

    //         const uidObj = new ObjectId(uid)
    //         const deleteUser = await db.collection('Users').deleteOne({ "_id": uidObj });
    //         if (deleteUser.deletedCount === 1) {
    //             return res.status(200).json({ message: 'User successfully deleted' });
    //         } else {
    //             return res.status(404).json({ message: 'User not found or already deleted' });
    //         }

    //     } else {
    //         console.error(`There isn't such a user`);
    //     }
    // } catch (error) {
    //     console.error('Error during deletion:', error);
    //     return res.status(500).json({ message: 'Internal server error' });
    // }
}
const handleUpdate = async (req: NextApiRequest, res: NextApiResponse) => {
    const { db } = await connectToDatabase();
    try {
        const { uid } = req.body as { uid: string }
        if (uid) {
            const { typeOfBus} = req.body as { typeOfBus: typeOfBus }
            const updateBusInfo = await db.collection('Buses').updateOne({ _id: new ObjectId(uid) }, { $set: { type: typeOfBus} });
            if (updateBusInfo.modifiedCount === 1) {
                return res.status(200).json({ message: 'Bus info successfully updated' })
            } else if (updateBusInfo.matchedCount === 0) {
                return res.status(404).json({ message: 'Bus was not found' })
            } else {
                return res.status(200).json({ message: 'No changes made to the user' })
            }
        } else {
            return res.status(400).json({ message: 'Invalid or missing user ID' });
        }
    } catch (error) {
        console.error('Error during deletion:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
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

export default handleRequest;