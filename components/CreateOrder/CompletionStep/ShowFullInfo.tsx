import React from 'react'
import { Button, Box, Paper, Table, TableHead, TableBody, TableRow, TableCell, Typography, CardMedia, Card, CardContent, TableContainer } from "@mui/material";
import Divider from '@mui/material/Divider';
import { BusTrip, CustomUserTrip, Passenger, UserTrip } from '@/types/types';


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

const ShowUserTripInfo = ({ 
    currentPassengers, 
    selectedSeats, 
    tripData
}: { 
    currentPassengers:Passenger[], 
    selectedSeats:string[], 
    tripData:BusTrip | undefined
}) => {
    
    return (

        
        <Paper elevation={3} className={'p-[2%]'}>
            <div className=' mb-[2%]'>
                <Button variant="outlined" size="small" color="info" className='mr-[2%]' >
                    Рейс: {tripData?._id}
                </Button>
            </div>

            <Box sx={{ minWidth: '100%', marginTop: '2%', marginBottom: '2%' }}>
                <CardContent>
                    <Typography variant="h6" >
                        Данные рейса
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {/* <img src="/qr-code.png" alt="" width={100} className='mr-[5%]'/> */}
                        <Box>

                            <Typography >
                                {tripData?.from}
                            </Typography>

                            <div >
                                {tripData?.date && formatDate(tripData.date).split('-').reverse().join('.')} в {tripData?.startTime}<br></br>
                                {tripData?.departureAddress}
                            </div>
                        </Box>
                        <img src="/free-icon-minus-339879.png" width={40} className='ml-[1%] mr-[1%]' />
                        <p >{tripData?.travelTime}</p>
                        <img src="/free-icon-minus-339879.png" width={40} className='ml-[1%] mr-[1%]' />
                        <Box>
                            <Typography>
                                {tripData?.to}
                            </Typography>
                            <div>
                                {calculateArrivalDate(formatDate(tripData?.date || '') || '', tripData?.startTime || '', tripData?.travelTime || '')}<br></br>
                                {tripData?.destinationAddress}
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
                                    <TableCell>Место</TableCell>
                                    <TableCell>Дата рождения</TableCell>
                                    <TableCell>Пол</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {currentPassengers.map((seat, index) => (
                                    <TableRow
                                        key={seat.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {seat.surname} {seat.name} {seat.patronymic}
                                        </TableCell>
                                        <TableCell align='left'>{selectedSeats[index]}</TableCell>
                                        <TableCell align='left'>{seat.birthDate}</TableCell>
                                        <TableCell align='left'>{seat.gender}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Box>
        </Paper>
    )
}

export default ShowUserTripInfo