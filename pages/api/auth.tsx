// pages/api/auth.tsx
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { AxiosError } from 'axios';
import bcrypt from 'bcrypt'
import { connectToDatabase, closeDatabaseConnection } from '@/lib/mongodb'

const handleRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  const db = await connectToDatabase();
  try {
    if (req.method === 'POST') {
      const { username, password } = req.body
      // Регистрация пользователя
      console.log({username, password})
      const user = await db.collection('Users').findOne({ username })
      if (!user) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const addUser = await db.collection('Users').insertOne({ username, password: hashedPassword });
        res.status(200).json({ message: 'Registration successful', addUser});
      } else {
        console.log('Данный пользователь уже существует')
        res.status(401).json({ message: 'Данный пользователь уже существует' });
      }
    } else if (req.method === 'GET') {
      // Вход пользователя
      const { username, password, type } = req.query as { username?: string, password?: string, type?: string };
      if (username && password && type === 'LOGIN') {
        const user = await db.collection('Users').findOne({ username });
        if (user && (await bcrypt.compare(password, user.password))) {
          console.log(user._id)
          res.status(200).json({ message: 'Login successful', user});
        } else {
          res.status(401).json({ message: 'Неверные учетные данные' });
        }
      }else if(username && type === 'GET_DATA'){
        const user = await db.collection('Users').findOne({ username });
        if (user) {
          res.status(200).json({ message: 'Login successful', user});
        } else {
          res.status(401).json({ message: 'Нет такого пользователя(возможно удален)' });
        }
      }
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('An error occurred during the API request', error);
    } else {
      console.error('An unknown error occurred during the API request', error);
    }
    res.status(500).json({ message: 'Internal Server Error' });
  } finally {
    // await closeDatabaseConnection();
    //сделать разрыв только тогда когда пользователь покидает страницу
  }
};

export default handleRequest;
