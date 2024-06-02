// pages/api/auth.tsx
import { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosError } from 'axios';
import bcrypt from 'bcrypt'
import { connectToDatabase, closeDatabaseConnection, getDB } from '@/lib/mongodb'
import { ObjectId } from 'mongodb';
import { BusTrip, IUser, Passenger, UserTrip } from '@/types/types';
import { v4 as uuidv4 } from 'uuid';
import { Db } from 'mongodb';


type TypeOfUpdation = 'UPDATE_INFO' | 'UPDATE_PASSWORD' | 'UPDATE_USER_PASSENGERS' | 'ADD_USER_PASSENGERS' | 'FULL_UPDATE_USER_INFO' | 'DELETE_USER_PASSENGER' | 'ADD_USER_TRIP' | 'UPDATE_USER_TRIPS' | 'DELETE_USER_TRIP'

const handleRegistration = async (req: NextApiRequest, res: NextApiResponse, db: Db) => {

  // const db = getDB()
  try {
    const { username, password, email, surname, name, passengers, trips, phoneNumber } = req.body
    console.log(username, password, email)
    // Регистрация пользователя
    const user = await db.collection('Users').findOne({ username })
    const userEmail = await db.collection('Users').findOne({ email })
    if (!user) {
      console.log('ok')
      if (!userEmail) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const addUser = await db.collection('Users').insertOne({ username, password: hashedPassword, email, surname: surname, name: name, phoneNumber:phoneNumber, passengers: passengers, trips: trips });
        return res.status(200).json({ message: 'Registration successful', addUser, username });
      } else {
        console.log('Данный email занят')
        return res.status(401).json({ message: 'Данный email занят' });
      }
    } else if (user) {
      console.log('Данный пользователь уже существует')
      return res.status(401).json({ message: 'Данный пользователь уже существует' });
    }
  } catch (error) {
    console.error('Error during registration:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
const handleLogin = async (req: NextApiRequest, res: NextApiResponse, db: Db) => {
  // const { db } = await connectToDatabase();
  // const db = getDB()
  try {
    const { username, password, type } = req.query as { username?: string, password: string, type?: string };
    if (username && password && type === 'LOGIN') {
      const user = await db.collection('Users').findOne({ username });
      if (user && (await bcrypt.compare(password, user.password))) {
        console.log(user._id)
        return res.status(200).json({ message: 'Login successful', user });
      } else {
        return res.status(401).json({ message: 'Неверные учетные данные' });
      }
    } else if (username && type === 'GET_DATA') {
      const user = await db.collection('Users').findOne({ username });
      if (user) {
        return res.status(200).json({ message: 'Getting data is successfull', user });
      } else {
        return res.status(401).json({ message: 'Somesing went wrong' });
      }
    } else if (username && type === 'COMPARE_PASSWORDS') {
      const chechPassword = await db.collection('Users').findOne({ username })
      if (chechPassword && (await bcrypt.compare(password, chechPassword.password))) {
        return res.status(200).json({ message: 'Password confirmed' });
      } else {
        return res.status(401).json({ message: 'Incorrect password' });
      }
    } else if (type === 'GET_ALL_DATA') {
      const users = await db.collection('Users').find({}).toArray();
      if (users) {
        return res.status(200).json({ message: 'Getting data is successfull', users });
      } else {
        return res.status(401).json({ message: 'Somesing went wrong' });
      }
    }
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
const handleDelete = async (req: NextApiRequest, res: NextApiResponse, db: Db) => {
  // const { db } = await connectToDatabase();
  // const db = getDB()
  try {
    const { uid } = req.query as { uid: string }
    if (uid && typeof uid === 'string') {

      const uidObj = new ObjectId(uid)
      const deleteUser = await db.collection('Users').deleteOne({ "_id": uidObj });
      if (deleteUser.deletedCount === 1) {
       return res.status(200).json({ message: 'User successfully deleted' });
      } else {
       return res.status(404).json({ message: 'User not found or already deleted' });
      }

    } else {
      console.error(`There isn't such a user`);
    }
  } catch (error) {
    console.error('Error during deletion:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
const handleUpdate = async (req: NextApiRequest, res: NextApiResponse, db: Db) => {
  // const { db } = await connectToDatabase();
  // const db = getDB()
  try {
    const { uid, type } = req.body as { uid: string, type: TypeOfUpdation }
    console.log(uid)
    if (uid) {
      if (type === 'UPDATE_INFO') {
        const { username, surname, email, name, phoneNumber } = req.body as { username: string, surname: string, password: string, email: string, name: string, phoneNumber:string }
        const updateUser = await db.collection('Users').updateOne({ _id: new ObjectId(uid) }, { $set: { username: username, surname: surname, email: email, name: name, phoneNumber:phoneNumber } });
        if (updateUser.modifiedCount === 1) {
          return res.status(200).json({ message: 'User successfully updated' })
        } else if (updateUser.matchedCount === 0) {
          return res.status(404).json({ message: 'User not found' })
        } else {
          return res.status(200).json({ message: 'No changes made to the user' })
        }
      } else if (type === 'UPDATE_PASSWORD') {
        const { uid, newPassword, password } = req.body as { uid: string, newPassword: string, password: string }
        const checkPassword = await db.collection('Users').findOne({ _id: new ObjectId(uid) })
        console.log(checkPassword)
        if (checkPassword && (await bcrypt.compare(password, checkPassword.password))) {
          const hashedPassword = await bcrypt.hash(newPassword, 10);
          const updateUserPassword = await db.collection('Users').updateOne({ _id: new ObjectId(uid) }, { $set: { password: hashedPassword } })
          if (updateUserPassword.modifiedCount === 1) {
            return res.status(200).json({ message: 'Password successfully updated' })
          } else if (updateUserPassword.matchedCount === 0) {
            return res.status(404).json({ message: 'Something went wrong ...' })
          }
        } else {
          return res.status(401).json({ message: 'Incorrect password' });
        }
      } else if (type === 'UPDATE_USER_PASSENGERS') {
        const { id, passengerIndex, surname, name, patronymic, gender, documentNumber, birthDate } = req.body as { id: string, passengerIndex: number, surname: string, name: string, patronymic: string, gender: string, documentNumber: string, birthDate: string }
        const updateUserPassenger = await db.collection('Users').updateOne({ _id: new ObjectId(uid) }, {
          $set: {
            [`passengers.${passengerIndex}`]: {
              id: id,
              surname: surname,
              name: name,
              patronymic: patronymic,
              gender: gender,
              documentNumber: documentNumber,
              birthDate: birthDate
            }
          }
        })
        if (updateUserPassenger.modifiedCount === 1) {
          return res.status(200).json({ message: 'User passengers was successfully updated' })
        } else if (updateUserPassenger.matchedCount === 0) {
          return res.status(404).json({ message: 'Something went wrong' })
        }
      } else if (type === 'ADD_USER_PASSENGERS') {
        const { surname, name, patronymic, gender, documentNumber, birthDate } = req.body as { surname: string, name: string, patronymic: string, gender: string, documentNumber: string, birthDate: string }
        const uniqueId = uuidv4();
        const updateUserPassenger = await db.collection('Users').updateOne({ _id: new ObjectId(uid) }, {
          $push: {
            passengers: {
              id: uniqueId,
              surname: surname,
              name: name,
              patronymic: patronymic,
              gender: gender,
              documentNumber: documentNumber,
              birthDate: birthDate
            }
          }
        })
        if (updateUserPassenger.modifiedCount === 1) {
          return res.status(200).json({ message: 'User passengers was successfully updated' })
        } else if (updateUserPassenger.matchedCount === 0) {
          return res.status(404).json({ message: 'Something went wrong' })
        }
      } else if (type === 'ADD_USER_TRIP') {
        const { tripData, selectedSeats, currentPassengers, orderId } = req.body as { tripData: BusTrip, selectedSeats: string[], currentPassengers: Passenger[], orderId: string }

        const addTrip = await db.collection('Users').updateOne(
          { _id: new ObjectId(uid) },
          {
            $push: {
              trips:
              {
                orderId: orderId,
                tripId: tripData._id,
                // date: tripData.date,
                // driver: tripData.driver,
                // finishTime: tripData.finishTime,
                // from: tripData.from,
                // price: tripData.price,
                // to: tripData.to,
                // type: tripData.type,
                // availableSeats: tripData.availableSeats - currentPassengers.length,
                // travelTime: tripData.travelTime,
                // reservedSeats: tripData.reservedSeats + currentPassengers.length,
                // startTime: tripData.startTime,
                // destination: tripData.destination,
                // departure: tripData.departure,
                seats:
                  currentPassengers.map((passenger, index) => {
                    const object = {
                      id: passenger.id,
                      seatNumber: selectedSeats[index],
                      birthDate: passenger.birthDate,
                      documentNumber: passenger.documentNumber,
                      gender: passenger.gender,
                      name: passenger.name,
                      patronymic: passenger.patronymic,
                      surname: passenger.surname,
                    }
                    return object
                  })
              },
            }
          }
        )
        if (addTrip.modifiedCount === 1) {
          return res.status(200).json({ message: `User's trip was successfully updated` })
        } else if (addTrip.matchedCount === 0) {
          return res.status(404).json({ message: 'Something went wrongd' })
        }
      }
      else if (type === 'UPDATE_USER_TRIPS') {
        const { user, userTrips } = req.body as {
          user: {
            orderId: string,
            seats: Array<{
              id: string,
              birthDate: string,
              documentNumber: string,
              gender: string,
              name: string,
              patronymic: string,
              surname: string,
              seatNumber: string
            }>
            tripId: string,
          },
          userTrips: UserTrip[]
        }
        const addTrip = await db.collection('Users').updateOne(
          { _id: new ObjectId(uid) },
          {
            $set: {
              trips: [...userTrips.map(userTrip => {
                if (userTrip.orderId === user.orderId) {
                  return {
                    orderId: user.orderId,
                    tripId: user.tripId,
                    seats: user.seats
                  }
                }
                return {
                  orderId: userTrip.orderId,
                  tripId: userTrip.tripId,
                  seats: userTrip.seats
                }
              })]
            }
          }
        )
        if (addTrip.modifiedCount === 1) {
          return res.status(200).json({ message: `User's trip was successfully updated` })
        } else if (addTrip.matchedCount === 0) {
          return res.status(404).json({ message: 'Something went wrongd' })
        }
      }
      else if (type === 'FULL_UPDATE_USER_INFO') {
        const { user } = req.body as { user: IUser }
        
        const fullUpDateUserInfo = await db.collection('Users').updateOne(
          { _id: new ObjectId(uid) },
          {
            $set: {
              username: user.username,
              surname: user.surname,
              email: user.email,
              name: user.name,
              phoneNumber:user.phoneNumber,
              trips: [...user.trips.map(trip => {
                console.log('seats', trip.seats);
                
                return {
                  orderId:trip.orderId,
                  tripId: trip.tripId,
                  seats: trip.seats
                }
              })],
              passengers: user.passengers
            }
          }
        )
        if (fullUpDateUserInfo.modifiedCount === 1) {
          return res.status(200).json({ message: `User  was successfully updated` })
        } else if (fullUpDateUserInfo.matchedCount === 0) {
          return res.status(404).json({ message: 'Something went wrongd' })
        }
      } else if (type === 'DELETE_USER_PASSENGER') {
        const { passengers } = req.body as { passengers: Passenger[] }
        console.log(passengers)
        const deleteUserPassenger = await db.collection('Users').updateOne({ _id: new ObjectId(uid) }, { $set: { passengers: passengers } });
        if (deleteUserPassenger.modifiedCount === 1) {
          return res.status(200).json({ message: 'Passenger was successfully updated' });
        } else if (deleteUserPassenger.matchedCount === 0) {
          return res.status(404).json({ message: 'User not found' });
        } else {
          return res.status(404).json({ message: 'Passenger not found or already deleted' });
        }
      } else if (type === 'DELETE_USER_TRIP') {
        const { orderId, userTrips } = req.body as { orderId: string, userTrips: UserTrip[] }
        const deleteUserTrip = await db.collection('Users').updateOne(
          { _id: new ObjectId(uid) },
          {
            $set: {
              trips: userTrips.filter(userTrip => {
                if (userTrip.orderId !== orderId) {
                  return {
                    orderId: userTrip.orderId,
                    tripId: userTrip.tripId,
                    seats: userTrip.seats
                  }
                }
              })
            }
          }
        )
        if (deleteUserTrip.modifiedCount === 1) {
          return res.status(200).json({ message: `User's trip was successfully updated` })
        } else if (deleteUserTrip.matchedCount === 0) {
          return res.status(404).json({ message: 'Something went wrongd' })
        }
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

  try {
    const { db } = await connectToDatabase();
    switch (method) {
      case 'POST':
        await handleRegistration(req, res, db);
        break;
      case 'GET':
        await handleLogin(req, res, db);
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
}


export default handleRequest;
