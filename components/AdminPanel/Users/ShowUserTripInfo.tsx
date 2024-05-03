import React from 'react'
import { Button, Box, Paper, Table, TableHead, TableBody, TableRow, TableCell, Typography, CardMedia, Card, CardContent, TableContainer } from "@mui/material";
import Divider from '@mui/material/Divider';
import { CustomUserTrip, UserTrip } from '@/types/types';


interface DeletedTrips {
    orderId:string, tripId:string, amountOfTickets:number
  }

function formatDate(inputDate: string) {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    let month = (date.getMonth() + 1).toString();
    let day = date.getDate().toString();

    // Добавляем нуль перед месяцем и днем, если они состоят из одной цифры
    if (month.length === 1) {
        month = '0' + month;
    }
    if (day.length === 1) {
        day = '0' + day;
    }

    return `${year}-${month}-${day}`;
}

function calculateArrivalDate(startDate: string, startTime: string, travelTime: string) {
    if (!startDate || !startTime || !travelTime) {
        return '';
    }
    console.log(startDate, startTime, travelTime)
    const startDateTime = new Date(`${startDate}T${startTime}`);
    const [hours, minutes] = travelTime.split(':').map(Number);
    const travelTimeInMilliseconds = hours * 60 * 60 * 1000 + minutes * 60 * 1000;
    const arrivalDateTime = new Date(startDateTime.getTime() + travelTimeInMilliseconds);

    const day = arrivalDateTime.getDate().toString().padStart(2, '0');
    const month = (arrivalDateTime.getMonth() + 1).toString().padStart(2, '0');
    const year = arrivalDateTime.getFullYear();
    const hoursArrival = arrivalDateTime.getHours().toString().padStart(2, '0');
    const minutesArrival = arrivalDateTime.getMinutes().toString().padStart(2, '0');
    console.log('hfd', travelTime)

    return `${day}.${month}.${year} в ${hoursArrival}:${minutesArrival}`;
}

const ShowUserTripInfo = ({ setIsShowUserTripInfo, selectedUserTrip, setTrips, setDeletedTrips }: { setIsShowUserTripInfo: React.Dispatch<React.SetStateAction<boolean>>, selectedUserTrip: CustomUserTrip, setTrips:React.Dispatch<React.SetStateAction<UserTrip[] | []>>, setDeletedTrips:React.Dispatch<React.SetStateAction<DeletedTrips[]>> }) => {
    
    function cancelUserTrip() {
        setDeletedTrips(prev => [...prev, {
            orderId:selectedUserTrip.orderId,
            tripId: selectedUserTrip.tripId,
            amountOfTickets:selectedUserTrip.seats.length
        }])
        setTrips(prev => {
            let newTrips = prev.filter(trip => {
                if(trip.orderId !== selectedUserTrip.orderId){
                    return trip
                }
            })
            return newTrips
        })
        setIsShowUserTripInfo(false)
    }
    return (

        
        <div>
            <div className=' mb-[2%]'>
                <Button variant="outlined" size="small" color="info" className='mr-[2%]' >
                    Рейс: {selectedUserTrip.tripId}
                </Button>
                <Button variant="outlined" size="small" color="info" >
                    Заказ: {selectedUserTrip.tripId}
                </Button>
                <Button variant="outlined" size="small" color="error" className='ml-[2%]' onClick={cancelUserTrip}>
                    Отменить рейс
                </Button>
            </div>

            <Box sx={{ minWidth: '100%', marginTop: '2%', marginBottom: '2%' }}>
                <CardContent>
                    <Typography variant="h6" >
                        Данные рейса
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <img src="/qr-code.png" alt="" width={100} className='mr-[5%]'/>
                        <Box>

                            <Typography >
                                {selectedUserTrip.from}
                            </Typography>

                            <div >
                                {selectedUserTrip.date && formatDate(selectedUserTrip.date).split('-').reverse().join('.')} в {selectedUserTrip.startTime}<br></br>
                                {selectedUserTrip.departure}пока что пусто
                            </div>
                        </Box>
                        <img src="/free-icon-minus-339879.png" width={40} className='ml-[1%] mr-[1%]' />
                        <p >{selectedUserTrip.travelTime}</p>
                        <img src="/free-icon-minus-339879.png" width={40} className='ml-[1%] mr-[1%]' />
                        <Box>
                            <Typography>
                                {selectedUserTrip.to}
                            </Typography>
                            <div>
                                {calculateArrivalDate(formatDate(selectedUserTrip.date) || '', selectedUserTrip.startTime || '', selectedUserTrip.travelTime || '')}<br></br>
                                {selectedUserTrip.destination}пока что пусто
                            </div>
                        </Box>
                    </Box>
                    <Divider sx={{ marginTop: '5%', marginBottom: '2%' }}></Divider>
                    <Typography variant="h6" >
                        Пассажиры
                    </Typography>
                    <TableContainer component={Paper} sx={{marginTop:'2%'}}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>ФИО</TableCell>
                                    <TableCell>Номер паспорта</TableCell>
                                    <TableCell>Место</TableCell>
                                    <TableCell>Дата рождения</TableCell>
                                    <TableCell>Пол</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {selectedUserTrip.seats.map((seat) => (
                                    <TableRow
                                        key={seat.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {seat.surname} {seat.name} {seat.patronymic}
                                        </TableCell>
                                        <TableCell align='left'>{seat.documentNumber}</TableCell>
                                        <TableCell align='left'>{seat.seatNumber}</TableCell>
                                        <TableCell align='left'>{seat.birthDate}</TableCell>
                                        <TableCell align='left'>{seat.gender}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Box>
            <Button type="submit" variant="text" onClick={() => setIsShowUserTripInfo(false)}>ОК</Button>
        </div>
    )
}

export default ShowUserTripInfo