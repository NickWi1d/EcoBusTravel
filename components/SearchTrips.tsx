"use client";
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import {getDateFromDB} from '@/lib/actionsDB'
import { RootState } from '@/redux/store'
import { useSelector } from 'react-redux';

const SearchTrips: React.FC = () => {
    const dispatch = useDispatch();
    const information = useSelector((state: RootState) => state.searchResults);
    const handleSubmit = () => {
        getDateFromDB(dispatch, {from:'Минск'})

        setTimeout(() => {
            console.log(information)
        }, 5000);
    };
    const [searchInfo, setSearchInfo] = useState({
        from: '',
        to: '',
        date: '2023-12-13',
        amount: '1'
    })

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
                        value={searchInfo.from}
                        onChange={(e)=>setSearchInfo({
                            ...searchInfo,
                            from: e.target.value
                          })}
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
                        value={searchInfo.to}
                        onChange={(e)=>setSearchInfo({
                            ...searchInfo,
                            to: e.target.value
                          })}
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
                        value={searchInfo.date}
                        onChange={(e)=>setSearchInfo({
                            ...searchInfo,
                            date: e.target.value
                          })}
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
                        value={searchInfo.amount}
                        onChange={(e)=>setSearchInfo({
                            ...searchInfo,
                            amount: e.target.value
                          })}
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