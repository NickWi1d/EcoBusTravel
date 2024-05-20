import { MongoClient, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase, closeDatabaseConnection, getDB } from '../../lib/mongodb'
import { BusTrip, Customer, IUser, Passenger, SeatsArray } from "@/types/types";
import { v4 as uuidv4 } from 'uuid';


type typeOfUpDate = 'SEAT_RESERVATION' | 'FULL_UPDATE_TRIP_INFO' | 'UPDATE_SEAT_TRIP_INFO' | 'DELETE_ORDER'

function TransformQueryParams(queryParams: Record<string, string>) {
  const params: Record<string, string | object> = {}
  let price = { $gte: 0, $lte: 100 }
  for (const [key, value] of Object.entries(queryParams)) {
    if (key === 'from' || key === 'to' || key === 'date' || key === 'time') {
      params[key] = value
    }
    else if (key === 'amount') {
      params['availableSeats'] = { $gte: parseInt(value, 10) }
    }
    else if (key === 'bottomPrice') {
      price['$gte'] = Number(value)
    } else if (key === 'topPrice') {
      price['$lte'] = Number(value)
    }
  }
  params['price'] = price
  return params
}

const handleRegistration = async (req: NextApiRequest, res: NextApiResponse) => {
  const { db } = await connectToDatabase();
  // const db = getDB()
  try {
    const { tripData } = req.body as { tripData: BusTrip }
    const addNewTrip = await db.collection('BusTrips').insertOne({
      date: tripData.date,
      driver: tripData.driver,
      finishTime: tripData.finishTime,
      from: tripData.from,
      price: tripData.price,
      to: tripData.to,
      type: tripData.type,
      availableSeats: tripData.availableSeats,
      travelTime: tripData.travelTime,
      reservedSeats: tripData.reservedSeats,
      seats: tripData.seats,
      startTime: tripData.startTime,
      destination: tripData.destination,
      departure: tripData.departure,
      destinationAddress: tripData.destinationAddress,
      departureAddress: tripData.departureAddress
    })
    if (addNewTrip.acknowledged === true) {
      return res.status(200).json({ message: `Trip was successfully added`, addNewTrip })
    } else {
      return res.status(404).json({ message: 'Something went wrongd' })
    }
  } catch (error) {
    console.error('Error during registration:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}


const handleLogin = async (req: NextApiRequest, res: NextApiResponse) => {
  const { db } = await connectToDatabase();
  // const db = getDB()
  try {
    const queryParams = req.query as Record<string, string>
    const params = TransformQueryParams(queryParams)
    console.log('Params', params)

    if (queryParams) {

      const busTrips = await db.collection('BusTrips').find(params).toArray();
      if (busTrips) {
        return res.status(200).json({ message: 'The results are found', busTrips });
      } else {
        return res.status(401).json({ message: 'There are no results' });
      }

    }
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

const handleUpdate = async (req: NextApiRequest, res: NextApiResponse) => {
  const { db } = await connectToDatabase();
  // const db = getDB()
  try {
    const { id, type } = req.body as { id: string, type: typeOfUpDate }
    if (id) {
      if (type === 'SEAT_RESERVATION') {
        const { availableSeats, amountOfTickets, reservedSeats, seats, selectedSeats, currentPassengers, customer, user, orderId } = req.body as { id: string, availableSeats: number, reservedSeats: number, seats: SeatsArray, amountOfTickets: number, selectedSeats: string[], currentPassengers: Passenger[], customer: Customer, user: { uid: string, username: string, name: string, surname: string, email: string }, orderId: string }
        console.log('reservedSeats', typeof (reservedSeats))
        console.log('amountOfTickets', typeof (amountOfTickets))
        console.log('currentPassengers', currentPassengers)

        const updateTripInfo = await db.collection('BusTrips').updateOne(
          { _id: new ObjectId(id) },
          {
            $set: {
              availableSeats: availableSeats - amountOfTickets,
              reservedSeats: reservedSeats + amountOfTickets,
              seats: [...seats.map((seat, index) => {
                console.log(seat)
                if (selectedSeats.includes((index + 1).toString())) {
                  return {
                    ...seat,
                    orderId: orderId,
                    available: false,
                    user: {
                      _id: user.uid,
                      username: user.username,
                      email: customer.email,
                      surname: customer.surname,
                      name: customer.name,
                      phoneNumber: customer.phoneNumber
                    },
                    owner: currentPassengers[selectedSeats.indexOf((index + 1).toString())]
                  }
                } else {
                  return {
                    ...seat
                  }
                }
              })]
            }
          }
        );
        if (updateTripInfo.modifiedCount === 1) {
          return res.status(200).json({ message: 'BusTrip was successfully updated' })
        } else if (updateTripInfo.matchedCount === 0) {
          return res.status(404).json({ message: 'Something went wrong' })
        }
      } else if (type === 'FULL_UPDATE_TRIP_INFO') {
        const { trip } = req.body as { trip: BusTrip }
        console.log(trip);
        const fullUpDateTripIno = await db.collection('BusTrips').updateOne(
          { _id: new ObjectId(id) },
          {
            $set: {
              date: trip.date,
              driver: trip.driver,
              finishTime: trip.finishTime,
              from: trip.from,
              price: trip.price,
              to: trip.to,
              type: trip.type,
              availableSeats: trip.availableSeats,
              travelTime: trip.travelTime,
              reservedSeats: trip.reservedSeats,
              seats: trip.seats,
              startTime: trip.startTime,
              destination: trip.destination,
              departure: trip.departure,
              destinationAddress: trip.destinationAddress,
              departureAddress: trip.departureAddress
            }
          }
        )
        if (fullUpDateTripIno.modifiedCount === 1) {
          return res.status(200).json({ message: 'BusTrip was successfully updated' })
        } else if (fullUpDateTripIno.matchedCount === 0) {
          return res.status(404).json({ message: 'Something went wrong' })
        }
      } else if (type === 'UPDATE_SEAT_TRIP_INFO') {
        const { user, seats, seatsTripData } = req.body as { user: IUser, seats: Array<number>, seatsTripData: SeatsArray }
        // console.log('user', user)
        console.log('seats', seats)
        // console.log('seatsTripData', seatsTripData)

        const fullUpDateTripIno = await db.collection('BusTrips').updateOne(
          { _id: new ObjectId(id) },
          {
            $set: {
              seats: seatsTripData.map((seat, index) => {
                if (seat.available === false && seat.owner !== null) {
                  console.log('пизда');
                  if (seats.includes(index + 1)) {

                    let userPassanger = user.passengers.filter(passenger => passenger.id === seat.owner?.id)[0]
                    return {
                      orderId: seat.orderId,
                      available: false,
                      user: {
                        _id: user._id,
                        username: user.username,
                        email: user.email,
                        surname: user.surname,
                        name: user.name,
                        phoneNumber:user.phoneNumber
                      },
                      owner: {
                        id: userPassanger.id,
                        birthDate: userPassanger.birthDate,
                        documentNumber: userPassanger.documentNumber,
                        gender: userPassanger.gender,
                        name: userPassanger.name,
                        patronymic: userPassanger.patronymic,
                        surname: userPassanger.surname,
                      }
                    }
                  }
                  return seat
                } else {
                  return seat
                }
              })
            }
          }
        )
        if (fullUpDateTripIno.modifiedCount === 1) {
          res.status(200).json({ message: 'BusTrip was successfully updated' })
        } else if (fullUpDateTripIno.matchedCount === 0) {
          res.status(404).json({ message: 'Something went wrong' })
        }
      } else if (type === 'DELETE_ORDER') {
        const { seats, orderId, availableSeats, reservedSeats, amountOfTickets } = req.body as { seats: SeatsArray, orderId: string, availableSeats: number, reservedSeats: number, amountOfTickets: number }
        console.log('availableSeats', availableSeats);
        console.log('reservedSeats', reservedSeats);
        console.log('amountOfTickets', amountOfTickets);

        const deleteOrder = await db.collection('BusTrips').updateOne(
          { _id: new ObjectId(id) },
          {
            $set: {
              availableSeats: availableSeats + amountOfTickets,
              reservedSeats: reservedSeats - amountOfTickets,
              seats: seats.map(seat => {
                if (seat.orderId === orderId) {
                  return {
                    ...seat,
                    orderId: '',
                    available: true,
                    user: null,
                    owner: null
                  }
                } else {
                  return seat
                }
              })
            }
          }
        )
        if (deleteOrder.modifiedCount === 1) {
          return res.status(200).json({ message: 'BusTrip was successfully updated' })
        } else if (deleteOrder.matchedCount === 0) {
          return res.status(404).json({ message: 'Something went wrong' })
        }
      }
    }
    else {
      return res.status(400).json({ message: 'Invalid or missing trup uid' });
    }
  } catch (error) {
    console.error('Error during deletion:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
const handleDelete = async (req: NextApiRequest, res: NextApiResponse) => {
  const { db } = await connectToDatabase();
  // const db = getDB()
  try {
    const { uid } = req.query as { uid: string }
    if (uid && typeof uid === 'string') {

      const uidObj = new ObjectId(uid)
      const deleteTrip = await db.collection('BusTrips').deleteOne({ "_id": uidObj });
      if (deleteTrip.deletedCount === 1) {
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
const handleRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  switch (method) {
    case 'POST':
      return handleRegistration(req, res);
    case 'GET':
      return handleLogin(req, res);
    case 'DELETE':
      return handleDelete(req, res);
    case 'PUT':
      return handleUpdate(req, res);
    default:
      return res.status(405).json({ message: 'Method Not Allowed' });
  }
};
export default handleRequest;