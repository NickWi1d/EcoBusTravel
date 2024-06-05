"use client";
import React, { useState, FormEvent, FC } from 'react';
import { useRouter } from 'next/navigation';
import { TextField, Button, ButtonGroup, Box, Select, MenuItem, IconButton, Autocomplete } from '@mui/material';
import { getCurrentDate } from '@/components/SearchTrips/Filter';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import { Params } from '@/types/types';

export const SearchTrips = ({ cities }: { cities: string[] }) => {
    const router = useRouter();

    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [date, setDate] = useState(getCurrentDate());
    const [amount, setAmount] = useState('1');

    const handleSubmit = (e: FormEvent<HTMLFormElement>, params: Params) => {
        e.preventDefault();
        const queryString = new URLSearchParams(Object.fromEntries(
            Object.entries(params).filter(([_, value]) => value.toString().trim() !== '')
        ));
        console.log(queryString);
        router.push(`/SearchResults?${queryString}`);

    };

    const currentDate = new Date().toISOString().split('T')[0];

    const handleBlurFromField = () => {
        if (!cities.includes(from)) {
            setFrom('');
        }
    };
    const handleBlurToField = () => {
        if (!cities.includes(to)) {
            setTo('');
        }
    };

    return (
        <div className='SearchSection'>
            <div className='SearchTitle'>
                <h2>Купить билет на автобус</h2>
                <h4>по Беларуси</h4>
            </div>
            <form
                onSubmit={(e) => handleSubmit(e, {
                    from: from,
                    to: to,
                    date: date,
                    amount: amount,
                    bottomPrice: '0',
                    topPrice: '100'
                })}
                className='SearchForm'>
                <div className='inputSection'>
                    <Autocomplete   
                        value={from} 
                        disablePortal
                        id="combo-box-demo"
                        options={cities}
                        sx={{ width: 300}}
                        onChange={(event: any, newValue: string | null) => {
                            setFrom(newValue || '')
                        }}
                        renderInput={(params) => <TextField
                            {...params}
                            className='SearchParamsInput'
                            required
                            id="from"
                            type='text'
                            label="Откуда?"
                            variant="outlined"
                            onChange={(e) => setFrom(e.target.value)}
                            onFocus={(e) => e.target.select()} 
                            onBlur={handleBlurFromField}/>}
                    />

                </div>
                <div className='inputSection'>
                <Autocomplete    
                        disablePortal
                        value={to}
                        id="combo-box-demo"
                        options={cities}
                        sx={{ width: 300}}
                        onChange={(event: any, newValue: string | null) => {
                            setTo(newValue || '')
                        }}
                        renderInput={(params) => <TextField
                            {...params}
                            className='SearchParamsInput'
                            required
                            id="to"
                            type='text'
                            label="Куда?"
                            variant="outlined"
                            onChange={(e) => setTo(e.target.value)}
                            onFocus={(e) => e.target.select()} 
                            onBlur={handleBlurToField}/>}
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
                        inputProps={{ min: currentDate }} />
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
    );
};


{/* <Box sx={{display:'flex', alignItems:'center', width:'95%', justifyContent:'center', height: '56px'}}>                        
<IconButton color='primary' sx={{padding:0}}><IndeterminateCheckBoxIcon fontSize='large'></IndeterminateCheckBoxIcon></IconButton>
<Button variant='contained' className='Btn' sx={{borderTopRightRadius:'none'}}>-</Button>
<button className='Btn' sx={{borderTopRightRadius:'none'}}>-</button>
<Box sx={{textAlign:'center', width:'30%', height:'100%', borderTop:'2px solid #2A5FCF'}}>{amount}</Box>
<IconButton color='primary'><AddBoxIcon fontSize='large'></AddBoxIcon></IconButton>
<Button variant='contained' className='Btn'>+</Button>

</Box> */}