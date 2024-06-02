import { Bus, BusTrip, ExtendPassenger, SeatData, SeatsArray, typeOfBus } from '@/types/types'
import { Button, FormControl, InputLabel, MenuItem, NativeSelect, Select, TextField, SelectChangeEvent, CircularProgress, Autocomplete } from '@mui/material'
import React, { useEffect, useState } from 'react'
import styles from '@/styles/Admin.module.scss'
import ChoosePlaces from '../../CreateOrder/FirstStep/ChoosePlaces'
import TripPlaces from './TripPlaces'
import ChangePlaceInfo from '../../../unnecessary/ChangePlaceInfo'
import Modal from '../../ModalWindows/Modal'
import ChoosePassenger from './ChoosePassenger'
import { v4 as uuidv4 } from 'uuid';
import { useLazyGetBusesQuery, useLazyGetFaultyTripQuery } from '@/store/reducers/api/app'
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import DejaVuSans, { imageBase64 } from '../../Fonts/DejaVuSans';


interface BusTripExtended extends BusTrip {
    warning: boolean;
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

const EditTripInfo = (
    {
        selectedTrip,
        passengersList,
        areThereAnyPassengers,
        isAddNewTrip,
        setSelectedTrip,
        deleteTrip,
        upDateTripInfoHandler,
        setIsAddNewTrip,
        addNewTripHandler,
        setAreThereAnyPassengers,
        setIsShowEditTripInfo,
        busesList,
        cities
    }: {

        selectedTrip: BusTripExtended,
        passengersList: ExtendPassenger[],
        areThereAnyPassengers: boolean,
        isAddNewTrip: boolean,
        setIsAddNewTrip: React.Dispatch<React.SetStateAction<boolean>>,
        addNewTripHandler: () => void,
        setAreThereAnyPassengers: React.Dispatch<React.SetStateAction<boolean>>,
        setIsShowEditTripInfo: React.Dispatch<React.SetStateAction<boolean>>,
        setSelectedTrip: React.Dispatch<React.SetStateAction<BusTripExtended>>,
        upDateTripInfoHandler: () => void,
        deleteTrip: (uid: string) => void,
        busesList: Bus[] | [],
        cities: string[]
    }) => {

    const [getBusInfo, { isLoading: isGetBusInfoLoading, isError: isGetBusInfoError, data: BusInfo, isSuccess: isGetBusInfoSuccess, error: BusInfoError }] = useLazyGetBusesQuery()
    const [getFaultyTrip, { isLoading: isFaultyTripLoading, isError: isGettingFaultyTripError, data: FaultyTrip, isSuccess: isGettingFaultyTripSuccess, error: getingFaultyTripError }] = useLazyGetFaultyTripQuery()

    const tripId = uuidv4();
    const [warningType, setWarningType] = useState<typeOfBus | undefined>(undefined)
    const [date, setDate] = useState('')
    const [driver, setDriver] = useState('')
    const [finishTime, setFinishTime] = useState('')
    const [from, setFrom] = useState('')
    const [price, setPrice] = useState(0)
    const [to, setTo] = useState('')
    const [busNumber, setBusNumber] = useState('')
    const [type, setType] = useState<typeOfBus | undefined>(undefined)
    const [availableSeats, setAvailableSeats] = useState(50)
    const [travelTime, seTravelTime] = useState('')
    const [reservedSeats, setReservedSeats] = useState(0)
    const [startTime, setStartTime] = useState('')
    const [destination, setDestination] = useState('')
    const [departure, setDeparture] = useState('')
    const [destinationAddress, setDestinationAddress] = useState('')
    const [departureAddress, setDepartureAddress] = useState('')
    const [seats, setSeats] = useState<SeatsArray>(Array.from({ length: 50 }, () => ({
        orderId: '',
        available: true,
        user: null,
        owner: null
    })))
    const [isShowSeatWindow, setIsShowSeatWindow] = useState(false)
    const [clickedPalce, setClickedPlace] = useState(0)

    useEffect(() => {
        if (isAddNewTrip) {
            console.log(busesList[0]._id);
            setBusNumber(busesList[0]._id)
            setType(busesList[0].type)
            setAreThereAnyPassengers(false)
        } else {
            setDate(formatDate(selectedTrip.date))
            setDriver(selectedTrip.driver)
            setFinishTime(selectedTrip.finishTime)
            setFrom(selectedTrip.from)
            setPrice(selectedTrip.price)
            setTo(selectedTrip.to)
            setBusNumber(selectedTrip.busNumber)
            setAvailableSeats(selectedTrip.availableSeats)
            seTravelTime(selectedTrip.travelTime)
            setReservedSeats(selectedTrip.reservedSeats)
            setStartTime(selectedTrip.startTime)
            setDestination(selectedTrip.destination)
            setDeparture(selectedTrip.departure)
            setDestinationAddress(selectedTrip.destinationAddress)
            setDepartureAddress(selectedTrip.departureAddress)
            setSeats(selectedTrip.seats)
            setAreThereAnyPassengers(selectedTrip.seats.filter(seat => !seat.available).length !== 0)
            getBusInfo({ id: selectedTrip.busNumber })

            getFaultyTrip({ tripId: selectedTrip._id })
        }
    }, [])

    useEffect(() => {
        setSelectedTrip(prev => {
            return {
                _id: prev._id,
                date: date,
                driver: driver,
                finishTime: finishTime,
                from: from,
                price: price,
                to: to,
                busNumber: busNumber,
                availableSeats: availableSeats,
                travelTime: travelTime,
                reservedSeats: reservedSeats,
                seats: seats,
                startTime: startTime,
                destination: destination,
                departure: departure,
                destinationAddress: destinationAddress,
                departureAddress: departureAddress,
                warning: busNumber === null ? false : true
            }
        }
        )
    }, [date, driver, finishTime, from, price, to, busNumber, availableSeats, travelTime, reservedSeats, startTime, destination, departure, seats])

    useEffect(() => {
        console.log(busNumber);
        setType(undefined)
        getBusInfo({ id: busNumber })
    }, [busNumber])


    useEffect(() => {
        const сapacity = type === 'L' ? 50 : 25
        let avaliableSeatsCount = 0
        seats.map(seat => seat.available && avaliableSeatsCount++)
        setAvailableSeats(avaliableSeatsCount)
        setReservedSeats(сapacity - avaliableSeatsCount)

    }, [seats, type])

    useEffect(() => {
        if (isGetBusInfoSuccess && BusInfo) {
            setType(BusInfo.bus?.type)
            console.log(BusInfo.bus?.type);
            if (!areThereAnyPassengers) {

                setSeats(Array.from({ length: BusInfo.bus?.type === 'L' ? 50 : 25 }, () => ({
                    orderId: '',
                    available: true,
                    user: null,
                    owner: null
                })))
            }
        }
    }, [isGetBusInfoSuccess, BusInfo])

    useEffect(() => {
        if (FaultyTrip && isGettingFaultyTripSuccess) {
            setWarningType(FaultyTrip.faultyTrip.typeOfBus)
        }
    }, [FaultyTrip, isGettingFaultyTripSuccess])


    function EditTripInfo() {
        setIsAddNewTrip(false)
        isAddNewTrip ? addNewTripHandler() : upDateTripInfoHandler()
        setIsShowEditTripInfo(false)
    }
    function cancelBtn() {
        setIsAddNewTrip(false)
        setIsShowEditTripInfo(false)
    }
    // const handleDownload = async () => {
    //     // const doc = new jsPDF();
    //     const pdfDoc = await PDFDocument.create()
    //     const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)
    //     const page = pdfDoc.addPage()
    //     pdfDoc.setLanguage()
    //     page.drawText('Список пассажиров на рейс №1', {
    //         y:20,
    //         x: 50,
    //         size: 16,
    //         font: timesRomanFont,
    //       })
    //     const pdfBytes = await pdfDoc.save()
    //     // Добавление заголовка
    //     // doc.setFontSize(16);
    //     // doc.text('Список пассажиров на рейс №1', 105, 10, { align: 'center' });

    //     // // Генерация QR-кода
    //     // // const qrCodeUrl = await QRCode.toDataURL('Текст для QR-кода');

    //     // // Добавление QR-кода и данных рейса
    //     // // doc.addImage(qrCodeUrl, 'PNG', 20, 20, 50, 50);
    //     // doc.text('Данные рейса', 20, 80);
    //     // doc.text('Гомель', 20, 90);
    //     // doc.text('28.05.2024 в 10:00', 20, 100);
    //     // doc.text('Автовокзал Гомельпока что пусто', 20, 110);
    //     // doc.text('Витебск', 150, 90);
    //     // doc.text('28.05.2024 в 18:30', 150, 100);
    //     // doc.text('Автовокзал Витебскпока что пусто', 150, 110);
    //     // doc.text('8:30', 105, 100, { align: 'center' });

    //     // // Данные пассажиров
    //     // const passengers = [
    //     //   ['Котельников Добрыня Никитич', 'гг', '1', '2024-05-02', 'мужской'],
    //     // ];

    //     // // Добавление таблицы пассажиров
    //     // autoTable(doc, {
    //     //   startY: 130,
    //     //   head: [['ФИО', 'Номер паспорта', 'Место', 'Дата рождения', 'Пол']],
    //     //   body: passengers,
    //     // });

    //     // // Скачивание PDF
    //     // doc.save('passenger_list.pdf');
    //   };

    // const handleDownload = async () => {
    //     // Создание нового документа PDF
    //     const pdfDoc = await PDFDocument.create();

    //     // Чтение файла шрифта
    //     const fontBytes = readFileSync(path.resolve(__dirname, 'fonts/DejaVuSans.ttf'));

    //     // Встраивание шрифта
    //     const font = await pdfDoc.embedFont(fontBytes);

    //     // Добавление страницы в PDF
    //     const page = pdfDoc.addPage();

    //     // Получение размеров страницы
    //     const { width, height } = page.getSize();

    //     // Добавление заголовка
    //     const fontSize = 20;
    //     const title = 'Список пассажиров на рейс №1';
    //     page.drawText(title, {
    //         x: width / 2 - font.widthOfTextAtSize(title, fontSize) / 2,
    //         y: height - 4 * fontSize,
    //         size: fontSize,
    //         font,
    //         color: rgb(0, 0, 0),
    //     });

    //     // Добавление данных о рейсе
    //     const tripData = [
    //         { label: 'Данные рейса:', value: '' },
    //         { label: 'Город отправления:', value: 'Гомель' },
    //         { label: 'Дата и время отправления:', value: '28.05.2024 в 10:00' },
    //         { label: 'Пункт отправки:', value: 'Автовокзал Гомель' },
    //         { label: 'Город назначения:', value: 'Витебск' },
    //         { label: 'Дата и время прибытия:', value: '28.05.2024 в 18:30' },
    //         { label: 'Пункт назначения:', value: 'Автовокзал Витебск' },
    //         { label: 'Время в пути:', value: '8:30' },
    //     ];

    //     let currentY = height - 6 * fontSize;
    //     const textSize = 14;

    //     tripData.forEach(item => {
    //         page.drawText(`${item.label} ${item.value}`, {
    //             x: 50,
    //             y: currentY,
    //             size: textSize,
    //             font,
    //             color: rgb(0, 0, 0),
    //         });
    //         currentY -= fontSize;
    //     });

    //     // Добавление данных пассажиров
    //     const passengers = [
    //         ['ФИО', 'Номер паспорта', 'Место', 'Дата рождения', 'Пол'],
    //         ['Котельников Добрыня Никитич', 'гг', '1', '2024-05-02', 'мужской'],
    //     ];

    //     currentY -= fontSize;

    //     passengers.forEach((row, rowIndex) => {
    //         row.forEach((cell, colIndex) => {
    //             page.drawText(cell, {
    //                 x: 50 + colIndex * 100,
    //                 y: currentY - rowIndex * fontSize,
    //                 size: textSize,
    //                 font,
    //                 color: rgb(0, 0, 0),
    //             });
    //         });
    //     });

    //     // Сохранение PDF в виде байтов
    //     const pdfBytes = await pdfDoc.save();

    //     // Создание ссылки для скачивания PDF
    //     const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    //     const link = document.createElement('a');
    //     link.href = URL.createObjectURL(blob);
    //     link.download = 'passenger_list.pdf';
    //     link.click();
    // };

    const handleDownload = async () => {
        const doc = new jsPDF();

        // Добавление шрифта
        doc.addFileToVFS('DejaVuSans.ttf', DejaVuSans);
        doc.addFont('DejaVuSans.ttf', 'DejaVuSans', 'normal');
        doc.setFont('DejaVuSans');

        // Добавление заголовка
        doc.setFontSize(16);
        doc.text(`Список пассажиров на рейс №${selectedTrip._id}`, 105, 10, { align: 'center' });

        // Генерация QR-кода
        // const qrCodeUrl = await QRCode.toDataURL('Текст для QR-кода');
        // Добавление QR-кода и данных рейса
        // doc.addImage(qrCodeUrl, 'PNG', 20, 20, 50, 50);
        doc.text('Данные рейса', 15, 30);
        doc.setFontSize(10);
        doc.text(selectedTrip.from, 15, 40);
        doc.text(`${formatToPrintDate(selectedTrip.date)} в ${selectedTrip.startTime}`, 15, 50);
        doc.text(selectedTrip.departureAddress, 15, 60, { maxWidth: 50 });
        doc.text(selectedTrip.to, 120, 40);
        doc.text(`${formatToPrintDate(selectedTrip.date)} в ${selectedTrip.finishTime}`, 120, 50);
        doc.text(selectedTrip.destinationAddress, 120, 60, { maxWidth: 50 });
        doc.addImage(imageBase64, 'PNG', 100, 43.5, 10, 10);
        doc.text(selectedTrip.travelTime, 90, 50, { align: 'center' });
        doc.addImage(imageBase64, 'PNG', 70, 43.5, 10, 10);
        doc.setFontSize(16);
        doc.text('Данные пассажиров', 15, 80);
        // Данные пассажиров
        const passengers = selectedTrip.seats.map((trip, index) => {
            return {
                seatNum: index,
                trip: trip
            }
        }
        ).filter(trip => trip.trip.available === false).map(trip => {
            return [`${trip.trip.owner?.surname} ${trip.trip.owner?.name} ${trip.trip.owner?.patronymic}`, `${trip.seatNum}`, `${trip.trip.owner?.birthDate}`, `${trip.trip.user?.phoneNumber}`]
        })

        // Добавление таблицы пассажиров
        autoTable(doc, {
            styles: { font: "DejaVuSans" },
            startY: 85,
            head: [['ФИО', 'Место', 'Дата рождения', 'Номер телефона']],
            body: passengers,
        });

        console.log(doc.getFontList());
        // Скачивание PDF
        doc.save('passenger_list.pdf');
    };

    return (
        <div>
            {/* <Button onClick={() => console.log(seats)}>Вывести</Button> */}
            {isShowSeatWindow &&
                <Modal width={30}>
                    <ChoosePassenger
                        setIsShowSeatWindow={setIsShowSeatWindow}
                        clickedPalce={clickedPalce}
                        selectedSeat={selectedTrip.seats[clickedPalce]}
                        setSeats={setSeats}
                        passengersList={passengersList}
                    >
                    </ChoosePassenger>
                </Modal>
            }

            {!isAddNewTrip &&
                <div className=' mb-[2%]'>
                    <Button variant="outlined" size="small" color="info">
                        Id: {selectedTrip._id}
                    </Button>
                    <Button variant="outlined" size="small" color="error" className='ml-[2%]' onClick={() => deleteTrip(selectedTrip._id)}>
                        Отменить рейс
                    </Button>

                </div>
            }
            <form onSubmit={EditTripInfo}>
                {areThereAnyPassengers ?
                    <>
                        <div className='grid grid-rows-1 grid-cols-5 gap-4 mb-[2%] items-end'>
                            <TextField
                                // required
                                id="driver"
                                type='text'
                                label="Водитель"
                                variant="outlined"
                                value={driver}
                                onChange={(e) => setDriver(e.target.value)}
                                onFocus={(e) => e.target.select()}
                            />
                            <Button variant='contained' className={styles.Btn} sx={{ height: '80%' }} onClick={handleDownload}>Сформировать список</Button>
                        </div>

                        {(type !== undefined && isGetBusInfoLoading !== true) ? <TripPlaces
                            busType={type}
                            seats={seats}
                            setIsShowSeatWindow={setIsShowSeatWindow}
                            setClickedPlace={setClickedPlace}
                            setSeats={setSeats}
                            isGetBusInfoLoading={isGetBusInfoLoading}
                        ></TripPlaces> : <div className='h-[270px] flex justify-center items-center'><CircularProgress /></div>}

                    </>
                    :
                    <>
                        <div className='grid grid-rows-2 grid-cols-5 gap-4 mb-[2%]'>
                            {/* <TextField
                                // required
                                id="from"
                                type='text'
                                label="Откуда"
                                variant="outlined"
                                value={from}
                                onChange={(e) => setFrom(e.target.value)}
                                onFocus={(e) => e.target.select()}
                            /> */}
                            <Autocomplete
                                value={from}
                                disablePortal
                                id="combo-box-demo"
                                options={cities}
                                onChange={(event: any, newValue: string | null) => {
                                    setFrom(newValue || '')
                                }}
                                renderInput={(params) => <TextField
                                    {...params}
                                    id="from"
                                    type='text'
                                    label="Откуда"
                                    variant="outlined"
                                    value={from}
                                    onChange={(e) => setFrom(e.target.value)}
                                    onFocus={(e) => e.target.select()}
                                />}
                            />
                            <Autocomplete
                                value={to}
                                disablePortal
                                id="combo-box-demo"
                                options={cities}
                                onChange={(event: any, newValue: string | null) => {
                                    setTo(newValue || '')
                                }}
                                renderInput={(params) => <TextField
                                    {...params}
                                    id="to"
                                    type='text'
                                    label="Куда"
                                    variant="outlined"
                                    value={to}
                                    onChange={(e) => setTo(e.target.value)}
                                    onFocus={(e) => e.target.select()}
                                />}
                            />
                            {/* <TextField
                                // required
                                id="to"
                                type='text'
                                label="Куда"
                                variant="outlined"
                                value={to}
                                onChange={(e) => setTo(e.target.value)}
                                onFocus={(e) => e.target.select()}
                            /> */}
                            <TextField
                                // required
                                id="date"
                                type='date'
                                label="Дата"
                                variant="outlined"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                onFocus={(e) => e.target.select()}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                // required
                                id="destination"
                                type='text'
                                label="Пункт отправки"
                                variant="outlined"
                                value={destination}
                                onChange={(e) => setDestination(e.target.value)}
                                onFocus={(e) => e.target.select()}
                            />
                            <TextField
                                // required
                                id="departure"
                                type='text'
                                label="Пункт назначения"
                                variant="outlined"
                                value={departure}
                                onChange={(e) => setDeparture(e.target.value)}
                            // onFocus={(e) => e.target.select()}
                            />
                            <TextField
                                // required
                                id="startTime"
                                type='time'
                                label="Время отправления"
                                variant="outlined"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                                onFocus={(e) => e.target.select()}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                // required
                                id="finishTime"
                                type='time'
                                label="Время прибытия"
                                variant="outlined"
                                value={finishTime}
                                onChange={(e) => setFinishTime(e.target.value)}
                                onFocus={(e) => e.target.select()}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <FormControl variant="outlined" sx={{ minWidth: 120 }} error={selectedTrip.warning === false && true}>
                                <InputLabel id="demo-simple-select-standard-label">Номер автобуса</InputLabel>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    value={busNumber}
                                    onChange={(e) => setBusNumber(e.target.value)}
                                    label="Номер автобуса"
                                >
                                    {selectedTrip.warning === false ?
                                        busesList.filter(bus => bus.type === warningType).map((bus, index) => {
                                            return <MenuItem key={index} value={bus._id}>{bus.plateNumber}</MenuItem>
                                        }) :
                                        busesList.map((bus, index) => {
                                            return <MenuItem key={index} value={bus._id}>{bus.plateNumber}</MenuItem>
                                        })
                                    }
                                </Select>
                            </FormControl>
                            <TextField
                                // required
                                id="price"
                                type='number'
                                label="Цена"
                                variant="outlined"
                                value={price}
                                onChange={(e) => setPrice(parseInt(e.target.value))}
                                onFocus={(e) => e.target.select()}
                                inputProps={{ min: 0 }}
                            />
                            <TextField
                                // required
                                id="driver"
                                type='text'
                                label="Водитель"
                                variant="outlined"
                                value={driver}
                                onChange={(e) => setDriver(e.target.value)}
                                onFocus={(e) => e.target.select()}
                            />
                        </div>
                        {(isGetBusInfoLoading !== true && type !== undefined) ? <TripPlaces
                            busType={type}
                            seats={seats}
                            setIsShowSeatWindow={setIsShowSeatWindow}
                            setClickedPlace={setClickedPlace}
                            setSeats={setSeats}
                            isGetBusInfoLoading={isGetBusInfoLoading}
                        ></TripPlaces> : <div className='h-[270px] flex justify-center items-center'><CircularProgress /></div>}




                    </>}

                <div className='flex justify-end'>
                    <button className='mt-3' onClick={cancelBtn}>Отмена</button>
                    <Button type="submit" variant="contained" className='bg-[#2A5FCF] hover:bg-[#134bc4] mt-4 ml-4' >{isAddNewTrip ? 'Добавить' : 'Сохранить'}</Button>
                </div>
            </form>
        </div>
    )
}

export default EditTripInfo