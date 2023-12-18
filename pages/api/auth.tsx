// pages/api/auth.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt'
import {connectToDatabase, closeDatabaseConnection} from '@/lib/mongodb'

const handleRequest = async (req: NextApiRequest, res: NextApiResponse) => {
    const {username, password, type} = req.body
    const db = await connectToDatabase();
    if (type == 'registration') {
      // Регистрация пользователя
      const user = await db.collection('Users').findOne({ username })
      if(!user){
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.collection('Users').insertOne({username, password:hashedPassword});
        res.status(200).json({ message: 'Registration successful' });
      }else{
        res.status(401).json({ message: 'Данный пользователь уже существует'});
      }
      
    } else if (type == 'login') {
      // Вход пользователя
      const user = await db.collection('Users').findOne({ username });
      if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({ message: 'Login successful'});
      } else {
        res.status(401).json({ message: 'Неверные учетные данные'});
      }
    }

  await closeDatabaseConnection()
};

export default handleRequest;
