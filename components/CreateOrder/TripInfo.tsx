import React from 'react'
import styles from '@/styles/CreateOrder.module.scss'
import { BusTrip } from '@/types/types'

const TripInfo = ({tripData}:{tripData:BusTrip | undefined}) => {
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
    return (
        <div className={styles.additionalInformation}>
            <div className={styles.titleBox}>
                <p>Маршрут</p>
                <p>{tripData?.from} → {tripData?.to}</p>
            </div>
            <div className={styles.departureInfoBox}>
                <p>Отправление</p>
                <div className={styles.departureInfoDetail}>
                    {tripData?.date && tripData?.date.split('-').reverse().join('.')} в {tripData?.startTime}<br></br>
                    {tripData?.departure}пока что пусто
                </div>
            </div>
            <div className={styles.destinationInfoBox}>
                <p>Прибытие</p>
                <div className={styles.destinationInfoDetail}>
                    {calculateArrivalDate(tripData?.date || '', tripData?.startTime || '', tripData?.travelTime || '')}<br></br>
                    {tripData?.destination}пока что пусто
                </div>
            </div>
            <div className={styles.preliminaryCost}>
                <p>Сумма заказа</p>
                ~{tripData?.price} BYN <br></br>
                за 1 пассажира
            </div>
        </div>
    )
}

export default TripInfo