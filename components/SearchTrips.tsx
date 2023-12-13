"use client";
import React, { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { setFrom, setTo, setDate, setAmount } from '@/redux/formSlice'
import { RootState } from '@/redux/store'

const SearchTrips: React.FC = () => {
    const { from, to, date, amount } = useSelector((state: RootState) => state.form);
    const dispatch = useDispatch();
  
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement| HTMLSelectElement>) => {
        const { name, value } = event.target;
        switch (name) {
          case 'from':
            dispatch(setFrom(value));
            break;
          case 'to':
            dispatch(setTo(value));
            break;
          case 'date':
            dispatch(setDate(value));
            break;
          case 'amount':
            dispatch(setAmount(value));
            break;
          default:
            break;
        }
      };
    
      const handleSubmit = () => {
        console.log([from, to, date, amount])
      };

    // const [fromInput, setFromInput] = useState('')
    // const [toInput, setToInput] = useState('')
    // const [dateInput, setDateInput] = useState('2023-12-13')
    // const [amountOfUsersInput, setAmountOfUsersInput] = useState('1')

    function cl() {
        
    }
    return (
        <div className='SearchSection'>
            <div className='SearchTitle'>
                <h2>Купить билет на автобус</h2>
                <h4>по Беларуси</h4>
            </div>
            <form className='SearchForm'>
                <div className='inputSection'>
                    <input
                        className='requiredField'
                        onFocus={(e) => e.target.select()}
                        value={from}
                        onChange={handleInputChange}
                        type='text'
                        id='from'
                        required
                    />
                    <label htmlFor='from' id='fromLabel' className='label-text'>Откуда?</label>
                </div>
                <hr className='hr' />
                <div className='inputSection'>
                    <input
                        className='requiredField'
                        onFocus={(e) => e.target.select()}
                        value={to}
                        onChange={handleInputChange}
                        type='text'
                        id='to'
                        required
                    />
                    <label htmlFor='to' id='toLabel' className='label-text'>Куда?</label>
                </div>
                <hr className='hr' />
                <div className='inputSection'>
                    <input
                        className='requiredField'
                        value={date}
                        onChange={handleInputChange}
                        type='date'
                        id='date'
                        required
                    />
                    <label htmlFor='date' id='dateLabel' className='label-text'>Дата</label>
                </div>
                <hr className='hr' />
                <div className='inputSection'>
                    <select
                        className='requiredField'
                        value={amount}
                        onChange={handleInputChange}
                        typeof='text'
                        id='amount'
                        required
                    >
                        <option value="1">1 паcсажир</option>
                        <option value="2">2 паcсажира</option>
                        <option value="3">3 пасcажира</option>
                        <option value="4">4 пасcажира</option>
                        <option value="5">5 пасcажиров</option>
                    </select>
                    <label htmlFor='amount' id='amountLabel' className='label-text'>Количество</label>
                </div>
                <div className='buttunWrap'>
                    <input
                        type="button"
                        className='searchButton'
                        value="Найти"
                        onClick={handleSubmit}
                    />
                </div>
            </form>
        </div>
    )
}

export default SearchTrips