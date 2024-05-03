import React, { useEffect } from 'react'
import { Passenger, BusTrip } from '@/types/types'
import styles from '@/styles/CreateOrder.module.scss'


const СompletionStep = ({currentPassengers, selectedSeats, tripData}:{currentPassengers:Passenger[], selectedSeats:string[], tripData:BusTrip | undefined}) => {

  return (
    // <div>{currentPassengers.map((passenger, index) => <div key={index}>{passenger.name}</div>)}</div>
    <div className={styles.completionStep}>
    <h2 className={styles.title}>Пожалуйста, проверьте информацию о вашем заказе:</h2>

    <div className={styles.infoSection}>
      <h3 className={styles.subtitle}>Пассажиры:</h3>
      <ul>
        {currentPassengers.map((passenger, index) => (
          <li key={index}>
            <strong>{passenger.name} {passenger.surname}</strong> - {passenger.documentNumber}
          </li>
        ))}
      </ul>
    </div>

    <div className={styles.infoSection}>
      <h3 className={styles.subtitle}>Выбранные места:</h3>
      <ul>
        {selectedSeats.map((seat, index) => (
          <li key={index}>Место {seat}</li>
        ))}
      </ul>
    </div>

    <div className={styles.infoSection}>
      <h3 className={styles.subtitle}>Информация о поездке:</h3>
      {tripData && (
        <ul>
          <li><strong>Откуда:</strong> {tripData.from}</li>
          <li><strong>Куда:</strong> {tripData.to}</li>
          <li><strong>Дата отправления:</strong> {tripData.date}</li>
          <li><strong>Время отправления:</strong> {tripData.startTime}</li>
          <li><strong>Время прибытия:</strong> {tripData.finishTime}</li>
          <li><strong>Цена билета:</strong> {tripData.price}</li>
        </ul>
      )}
    </div>
  </div>
  )
}

export default СompletionStep