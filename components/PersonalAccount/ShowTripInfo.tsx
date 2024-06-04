import React, { useEffect, useState } from 'react'
import { Button, Box, Paper, Table, TableHead, TableBody, TableRow, TableCell, Typography, CardMedia, Card, CardContent, TableContainer } from "@mui/material";
import Divider from '@mui/material/Divider';
import { CustomAlertType, CustomUserTrip, UserTrip } from '@/types/types';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import DejaVuSans, { imageBase64 } from '../Fonts/DejaVuSans';
import { useSendEmailMutation } from '@/store/reducers/api/app';
import AlertComponent from '../ModalWindows/Alert';


interface DeletedTrips {
    orderId: string, tripId: string, amountOfTickets: number
}
function formatToPrintDate(dateString: string) {
    const months = [
        "января", "февраля", "марта", "апреля", "мая", "июня",
        "июля", "августа", "сентября", "октября", "ноября", "декабря"
    ];

    const date = new Date(dateString);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
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

const ShowTripInfo = ({
    setIsShowUserTripInfo,
    selectedUserTrip,
    setTrips,
    setDeletedTrip,
    name,
    email,
    deleteTripHandler
}: {
    setIsShowUserTripInfo: React.Dispatch<React.SetStateAction<boolean>>,
    selectedUserTrip: CustomUserTrip,
    setTrips: React.Dispatch<React.SetStateAction<UserTrip[] | []>>,
    setDeletedTrip: React.Dispatch<React.SetStateAction<DeletedTrips>>,
    name: string,
    email: string,
    deleteTripHandler:(orderId:string, tripId:string, amountOfTickets:number)=>void
}) => {
    const [sendEmail, { data: sendEmailResult, isSuccess: sendEmailSuccess }] = useSendEmailMutation()

    // const [showAlert, setShowAlert] = useState(false)
    // const [alertType, setAlertType] = useState<CustomAlertType>('success')
    // const [alertText, setAlertText] = useState('')


    function cancelUserTrip() {
        setDeletedTrip(prev => {
            return {
                orderId: selectedUserTrip.orderId,
                tripId: selectedUserTrip.tripId,
                amountOfTickets: selectedUserTrip.seats.length
            }
        })
        deleteTripHandler(selectedUserTrip.orderId, selectedUserTrip.tripId, selectedUserTrip.seats.length)
        setIsShowUserTripInfo(false)
    }

    function createPdf() {
        const doc = new jsPDF();

        // Добавление шрифта
        doc.addFileToVFS('DejaVuSans.ttf', DejaVuSans);
        doc.addFont('DejaVuSans.ttf', 'DejaVuSans', 'normal');
        doc.setFont('DejaVuSans');

        // Добавление заголовка
        doc.setFontSize(16);
        doc.text(`Билет №${selectedUserTrip.orderId}`, 105, 10, { align: 'center' });

        // Генерация QR-кода
        // const qrCodeUrl = await QRCode.toDataURL('Текст для QR-кода');
        // Добавление QR-кода и данных рейса
        // doc.addImage(qrCodeUrl, 'PNG', 20, 20, 50, 50);
        doc.text('Данные рейса', 15, 30);
        doc.setFontSize(10);
        doc.text(selectedUserTrip.from, 15, 40);
        doc.text(`${formatToPrintDate(selectedUserTrip.date)} в ${selectedUserTrip.startTime}`, 15, 50);
        doc.text(selectedUserTrip.departureAddress, 15, 60, { maxWidth: 50 });
        doc.text(selectedUserTrip.to, 120, 40);
        doc.text(`${formatToPrintDate(selectedUserTrip.date)} в ${selectedUserTrip.finishTime}`, 120, 50);
        doc.text(selectedUserTrip.destinationAddress, 120, 60, { maxWidth: 50 });
        doc.addImage(imageBase64, 'PNG', 100, 43.5, 10, 10);
        doc.text(selectedUserTrip.travelTime, 90, 50, { align: 'center' });
        doc.addImage(imageBase64, 'PNG', 70, 43.5, 10, 10);
        doc.setFontSize(16);
        doc.text('Данные пассажиров', 15, 80);
        // Данные пассажиров
        const passengers = selectedUserTrip.seats.map((trip) => {
            return [`${trip.surname} ${trip.name} ${trip.patronymic}`, `${trip.seatNumber}`, `${trip.birthDate}`]
        }
        )

        // Добавление таблицы пассажиров
        autoTable(doc, {
            styles: { font: "DejaVuSans" },
            startY: 85,
            head: [['ФИО', 'Место', 'Дата рождения']],
            body: passengers,
        });
        return doc
    }

    const handleDownload = async () => {
        const doc = createPdf()
        doc.save(`${selectedUserTrip.orderId}.pdf`);
    };

    const handleSendEmail = async () => {
        const doc = createPdf()
        const pdfData = doc.output('datauristring').split(',')[1];

        sendEmail({
            to: email,
            subject: 'Ваш билет на рейс от EcoBusTravel',
            text: `Здравствуйте ${name}, данный билет носит информативный харакер`,
            pdfData: pdfData
        })
    }


    // useEffect(() => {
    //     if(sendEmailSuccess && sendEmailResult){
    //         setAlertType('success')
    //         setAlertText('Email успешно отправлен!')
    //         setShowAlert(true)
    //     }
    // }, [sendEmailSuccess, sendEmailResult])

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
                {/* {showAlert && (
                <AlertComponent
                    showAlert={showAlert}
                    setShowAlert={setShowAlert}
                    type={alertType}
                    text={alertText}
                />
            )} */}
                <CardContent>
                    <Typography variant="h6" >
                        Данные рейса
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {/* <img src="/qr-code.png" alt="" width={100} className='mr-[5%]' /> */}
                        {/* <QRCodeDownload></QRCodeDownload> */}
                        <Box>

                            <Typography >
                                {selectedUserTrip.from}
                            </Typography>

                            <div >
                                {selectedUserTrip.date && formatDate(selectedUserTrip.date).split('-').reverse().join('.')} в {selectedUserTrip.startTime}<br></br>
                                {selectedUserTrip.departureAddress}
                            </div>
                        </Box>
                        <img src="/free-icon-minus-339879.png" width={40} className='ml-[1%] mr-[1%]' />
                        <p >{selectedUserTrip.travelTime}</p>
                        <img src="/free-icon-minus-339879.png" width={40} className='ml-[1%] mr-[1%]' />
                        <Box sx={{ marginLeft: '8%' }}>
                            <Typography>
                                {selectedUserTrip.to}
                            </Typography>
                            <div>
                                {calculateArrivalDate(formatDate(selectedUserTrip.date) || '', selectedUserTrip.startTime || '', selectedUserTrip.travelTime || '')}<br></br>
                                {selectedUserTrip.destinationAddress}
                            </div>
                        </Box>
                    </Box>
                    <Divider sx={{ marginTop: '5%', marginBottom: '2%' }}></Divider>
                    <Typography variant="h6" >
                        Пассажиры
                    </Typography>
                    <TableContainer component={Paper} sx={{ marginTop: '2%' }}>
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
            <Button variant="outlined" size="small" color="info" className='ml-[2%]' onClick={handleDownload}>
                Скачать
            </Button>
            <Button variant="outlined" size="small" color="info" className='ml-[2%]' onClick={handleSendEmail}>
                Отпарвить на email
            </Button>
        </div>
    )
}

export default ShowTripInfo