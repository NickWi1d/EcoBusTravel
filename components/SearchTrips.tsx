"use client";
import React, { MouseEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { TextField, Select, MenuItem, InputLabel, Button } from '@mui/material';

const SearchTrips: React.FC = () => {
    const router = useRouter()
    const handleSubmit = (e: MouseEvent<HTMLFormElement>) => {
        e.preventDefault()
        // router.push(`/SearchResults?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&date=${encodeURIComponent(date)}&amount=${encodeURIComponent(amount)}`)
        const params = {
            from: from,
            to: to,
            date: date,
            amount: amount,
        }
        const queryString = new URLSearchParams(Object.fromEntries(
            Object.entries(params).filter(([_, value]) => value.trim() !== '')
          ))
        router.push(`/SearchResults?${queryString}`)

    };
    const [from, setFrom] = useState('Минск')
    const [to, setTo] = useState('')
    const [date, setDate] = useState('2023-12-13')
    const [amount, setAmount] = useState('1')
    return (
        <div className='SearchSection'>
            <div className='SearchTitle'>
                <h2>Купить билет на автобус</h2>
                <h4>по Беларуси</h4>
            </div>
            <form onSubmit={handleSubmit} className='SearchForm'>
                <div className='inputSection'>
                    <TextField
                        className='SearchParamsInput'
                        // required
                        id="from"
                        type='text'
                        label="Откуда?"
                        variant="outlined"
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                        onFocus={(e) => e.target.select()}
                    />
                </div>
                <div className='inputSection'>
                    <TextField
                        className='SearchParamsInput'
                        // required
                        id="to"
                        type='text'
                        label="Куда?"
                        variant="outlined"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                        onFocus={(e) => e.target.select()}
                    />
                </div>
                <div className='inputSection'>
                    <TextField
                        className='SearchParamsInput'
                        id="date"
                        type='date'
                        label="Дата"
                        variant="outlined"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        onFocus={(e) => e.target.select()}
                    />
                </div>
                <div className='inputSection'>
                    {/* <InputLabel id="AmountILabel">Количество</InputLabel> */}
                    <Select
                        className='SearchParamsInput'
                        // labelId="AmountILabel"
                        // label="Количество"
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        autoWidth
                        type='text'
                    >
                        <MenuItem value={1}>1 паcсажир</MenuItem>
                        <MenuItem value={2}>2 паcсажира</MenuItem>
                        <MenuItem value={3}>3 пасcажира</MenuItem>
                        <MenuItem value={4}>4 пасcажира</MenuItem>
                        <MenuItem value={5}>5 пасcажира</MenuItem>
                    </Select>
                </div>
                <div className='buttunWrap'>
                    <Button variant="contained" type='submit' className='searchButton'>Найти</Button>
                </div>
            </form>
        </div>
    )
}

export default SearchTrips