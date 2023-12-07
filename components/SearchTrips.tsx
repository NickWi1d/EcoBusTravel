"use client";
import React, { useRef } from 'react'

const SearchTrips = () => {
    const fromInput = useRef<HTMLInputElement>(null)
    const toInput = useRef<HTMLInputElement>(null)
    const dateInput = useRef<HTMLInputElement>(null)
    const amountOfUsersInput = useRef<HTMLSelectElement>(null)
    function cl() {
        console.log({
            'Откуда': fromInput.current?.value,
            'Куда': toInput.current?.value,
            'Дата': dateInput.current?.value,
            'Количество ': amountOfUsersInput.current?.value
        })
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
                        ref={fromInput}
                        className='requiredField'
                        onFocus={(e) => e.target.select()}
                        type='text'
                        id='from'
                        required
                    />
                    <label htmlFor='from' id='fromLabel' className='label-text'>Откуда?</label>
                </div>
                <hr className='hr' />
                <div className='inputSection'>
                    <input
                        ref={toInput}
                        className='requiredField'
                        onFocus={(e) => e.target.select()}
                        type='text'
                        id='to'
                        required
                    />
                    <label htmlFor='to' id='toLabel' className='label-text'>Куда?</label>
                </div>
                <hr className='hr' />
                <div className='inputSection'>
                    <input
                        ref={dateInput}
                        className='requiredField'
                        type='date'
                        id='date'
                        required
                    />
                    <label htmlFor='date' id='dateLabel' className='label-text'>Дата</label>
                </div>
                <hr className='hr' />
                <div className='inputSection'>
                    <select
                        ref={amountOfUsersInput}
                        className='requiredField'
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
                        onClick={cl}
                    />
                </div>
            </form>
        </div>
    )
}

export default SearchTrips