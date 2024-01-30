// pages/api/auth.tsx
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { AxiosError } from 'axios';
import bcrypt from 'bcrypt'
import { connectToDatabase, closeDatabaseConnection } from '@/lib/mongodb'
import { ObjectId } from 'mongodb';
import { Console } from 'console';

const handleRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  const db = await connectToDatabase();
  // try {
  if (req.method === 'POST') {
    const { username, password, email } = req.body
    // Регистрация пользователя
    const user = await db.collection('Users').findOne({ username })
    const userEmail = await db.collection('Users').findOne({ email })
    if (!user) {
      if (!userEmail) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const addUser = await db.collection('Users').insertOne({ username, password: hashedPassword, email, surname: '' });
        res.status(200).json({ message: 'Registration successful', addUser });
      } else {
        console.log('Данный email занят')
        res.status(401).json({ message: 'Данный email занят' });
      }
    } else if (user) {
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
        res.status(200).json({ message: 'Login successful', user });
      } else {
        res.status(401).json({ message: 'Неверные учетные данные' });
      }
    } else if (username && type === 'GET_DATA') {
      const user = await db.collection('Users').findOne({ username });
      if (user) {
        res.status(200).json({ message: 'Login successful', user });
      } else {
        res.status(401).json({ message: 'Нет такого пользователя(возможно удален)' });
      }
    }
  } else if (req.method === 'DELETE') {
    // Удаление пользователя
    const { uid } = req.query
    console.log(uid)
    if (uid && typeof uid === 'string') {
      const uidObj = new ObjectId(uid)
      const deleteUser = await db.collection('Users').deleteOne({ "_id": uidObj });
      if (deleteUser.deletedCount === 1) {
        res.status(200).json({ message: 'User successfully deleted' });
      } else {
        res.status(404).json({ message: 'User not found or already deleted' });
      }
    } else {
      console.error(`There isn't such a user`);
    }
  } else if (req.method === 'PUT') {
    // Обновление данных пользователя
    const { uid, username, surname, password, email } = req.body as { uid: string, username: string, surname: string, password: string, email: string };
    if (uid) {
      try {
        const updateUser = await db.collection('Users').updateOne({ _id: new ObjectId(uid) }, { $set: { username: username, password: password, surname: surname, email: email } });
        if (updateUser.modifiedCount === 1) {
          res.status(200).json({ message: 'User successfully updated' });
        } else if (updateUser.matchedCount === 0) {
          res.status(404).json({ message: 'User not found' });
        } else {
          res.status(200).json({ message: 'No changes made to the user' });
        }
      } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    } else {
      res.status(400).json({ message: 'Invalid or missing user ID' });
    }
  }
  // } catch (error) {
  //   console.log('что за херня')
  //   if (error instanceof AxiosError) {
  //     console.error('An error occurred during the API request', error);
  //   } else {
  //     console.error('An unknown error occurred during the API request', error);
  //   }
  //   res.status(500).json({ message: 'Internal Server Error' });
  // } finally {
  //   // await closeDatabaseConnection();
  //   //сделать разрыв только тогда когда пользователь покидает страницу
  // }
};

export default handleRequest;
