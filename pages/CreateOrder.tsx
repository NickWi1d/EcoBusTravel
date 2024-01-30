import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import styles from '@/styles/CreateOrder.module.scss'


interface seatsObj {
    [key: string]: {
        available: boolean;
        owner: string | null;
    };
}

interface tripData {
    _id: string,
    date: string,
    finishTime: string,
    from: string,
    price: number,
    to: string,
    tripID: string,
    type: string,
    availableSeats: number,
    travelTime: string,
    reservedSeats: number,
    seats: seatsObj
    startTime: string
}
const CreateOrder = () => {
    const router = useRouter();
    const [tripData, setTripData] = useState<tripData | undefined>(undefined)

    const getParams = () => {
        const queryParams = router.query as Record<string, string>
        if (queryParams) {
            const updatedSeats = queryParams.seats
                ? JSON.parse(queryParams.seats)
                : undefined;

            const updatedTripData = {
                ...queryParams,
                seats: updatedSeats,
            };

            setTripData(updatedTripData as tripData);
            console.log(updatedTripData)
        }
    }

    function getDateelements(date: string) {
        const curretDate = new Date(date);
        const options = { day: 'numeric', month: 'long' } as const;
        const formattedDate = curretDate.toLocaleDateString('ru-RU', options);
        return formattedDate
    }



    useEffect(() => {
        getParams()
    }, [router.query])

    return (
        <div>
            <div className={styles.choosingPlaces}></div>
            <div className={styles.tripinfo}>
                <div className={styles.showedInfo}>
                    <div className={styles.mainInfo}>
                        {tripData?.from} - {tripData?.to}<br></br>
                        {getDateelements(tripData?.date || '')} в {tripData?.startTime}
                    </div>
                    <img src="icons8-развернуть-48.png" alt="" className={styles.arrow} />
                </div>
                <div className={styles.hiddenInfo}>
                    <div className={styles.from}>
                        {tripData?.startTime} {getDateelements(tripData?.date || '')}<br /><br />
                        {tripData?.finishTime} {getDateelements(tripData?.date || '')}(пока что так потом добавлю дату прибытия в бд)<br /><br />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateOrder