export interface ServerResponseGetUserData {
    message: string
    user: IUser
}
export interface ServerResponseAddUser {
    message: string
    addUser: AddUser
    username: string
}
export interface ServerResponseAddTrip {
    message: string
    addNewTrip: AddUser
}
export interface ServerResponseGetTripsData {
    message: string
    busTrips: BusTrip[]
}
export interface ServerResponseUpDateTripInfo {
    message: string
}
export interface ServerResponseGetAllUsers {
    message: string
    users: IUser[]
}
export interface ServerResponseGetCitiesData {
    message: string
    cities: Cities[]
}
export interface ServerResponseGetBusesData {
    message: string
    buses: Bus[]
}
export interface Cities{
    _id: string
    cities: string[]
}

export interface Passenger {
    id: string,
    birthDate: string,
    documentNumber: string,
    gender: string,
    name: string,
    patronymic: string,
    surname: string,
}

export interface UserTripPassenger extends Passenger {
    seatNumber: string
}
export interface ExtendPassenger {
    user: {
        _id: string
        username: string
        email: string
        surname: string
        name: string,
        phoneNumber:string
    },
    passengers: Passenger[]
}
export interface IUser {
    _id: string
    username: string
    password: string
    email: string
    surname: string
    name: string
    phoneNumber:string
    passengers: Passenger[]
    trips: UserTrip[]
}
export interface UserTrip {
    orderId: string,
    tripId: string,
    seats: UserTripPassenger[]
    tripData: {
        date: string,
        driver: string,
        finishTime: string,
        from: string,
        price: number,
        to: string,
        type: typeOfBus,
        availableSeats: number,
        travelTime: string,
        reservedSeats: number,
        startTime: string,
        destination: string,
        departure: string,
        destinationAddress:string,
        departureAddress: string 
    }

}

export interface AddUser {
    acknowledged: boolean
    insertedId: string
}


export type CustomAlertType = "error" | "warning" | "info" | "success";

export interface SeatData {
    orderId: string,
    available: boolean;
    user: {
        _id: string
        username: string
        email: string
        surname: string
        name: string,
        phoneNumber:string
    } | null,
    owner: Passenger | null;
}

export type SeatsArray = SeatData[];

export type typeOfBus = 'M' | 'L';

export interface BusTrip {
    _id: string,
    date: string,
    driver: string,
    finishTime: string,
    from: string,
    price: number,
    to: string,
    type: typeOfBus,
    availableSeats: number,
    travelTime: string,
    reservedSeats: number,
    seats: SeatsArray
    startTime: string,
    destination: string,
    departure: string,
    destinationAddress:string,
    departureAddress: string 
}

export interface Params {
    from?: string,
    to?: string,
    date?: string,
    amount?: string,
    bottomPrice?: string,
    topPrice?: string
}

export interface QueryParams {
    // [key: string]: string | string[] | undefined
    
}


export interface CustomUserTrip {
    orderId: string,
    tripId: string,
    seats: UserTripPassenger[]
    date: string,
    driver: string,
    finishTime: string,
    from: string,
    price: number,
    to: string,
    type: typeOfBus,
    availableSeats: number,
    travelTime: string,
    reservedSeats: number,
    startTime: string,
    destination: string,
    departure: string,
    destinationAddress:string,
    departureAddress: string 
}
export interface Customer {
    surname: string,
    name: string,
    phoneNumber: string,
    email: string,
}
export interface DeletedTrips {
    orderId:string, tripId:string, amountOfTickets:number
}
export interface Bus {
    _id:string,
    type:typeOfBus,
    amountOfSeats:number,
    plateNumber:string
}