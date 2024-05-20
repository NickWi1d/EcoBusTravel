import React, { ChangeEvent, useState, FormEvent, useEffect } from 'react'
import { TextField, Button, Slider, Typography, Input, Box, Paper, Autocomplete, Select, MenuItem } from '@mui/material'
import { useRouter } from 'next/navigation'
import styles from '@/styles/SearchResults.module.scss'
import { BusTrip, Params, QueryParams } from '@/types/types';

interface filterData {
  from: string,
  to: string,
  date: string
}

interface Filter {
  params: Params,
  setQueryParamsState: React.Dispatch<React.SetStateAction<QueryParams>>,
  getSearchResults: () => void,
  setQueryResults: React.Dispatch<React.SetStateAction<BusTrip[]>>,
  getTripsDataHandler: (queryParams: Params) => void,
  cities: string[]
}

export function getCurrentDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const currentDate = `${year}-${month}-${day}`;
  console.log(currentDate)
  return currentDate
}

const Filter: React.FC<Filter> = ({ params, setQueryParamsState, getSearchResults, setQueryResults, getTripsDataHandler, cities }) => {
  const minDistance = 20;
  const router = useRouter()

  const currentDate = new Date().toISOString().split('T')[0];

  const [from, setFrom] = useState(params.from || '')
  const [to, setTo] = useState(params.to || '')
  const [date, setDate] = useState(params.date || getCurrentDate())
  const [amount, setAmount] = useState(params.amount || '')
  const [price, setPrice] = useState<number[]>([Number(params.bottomPrice), Number(params.topPrice)] || [0, 100])



  const handleSliderChange = (event: Event, newValue: number | number[], activeThumb: number,) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - minDistance)
        setPrice([clamped, clamped + minDistance])
      } else {
        const clamped = Math.max(newValue[1], minDistance)
        setPrice([clamped - minDistance, clamped])
      }
    } else {
      setPrice(newValue as number[])
    }
  }


  const handleInputChange = (index: number, value: string) => {
    const parsedValue = Number(value)
    let newPrice: number[] = [...price]
    if (index === 0) {
      const nextRightValue = Math.min(Math.max(newPrice[1], parsedValue + minDistance), 100)
      setPrice([Math.min(parsedValue, nextRightValue - 20), nextRightValue])
    } else if (index === 1) {
      const newLeftValue = Math.max(Math.min(newPrice[0], parsedValue - minDistance), 0)
      setPrice([newLeftValue, Math.max(newLeftValue + 20, parsedValue)])
    }
  }


  function filtrBtnHandler(e: FormEvent<HTMLFormElement>) {

    e.preventDefault()
    let params = {
      from: from,
      to: to,
      date: date,
      amount: amount,
      bottomPrice: String(price[0]),
      topPrice: String(price[1])
    }
    setQueryParamsState(params)
    const queryString = new URLSearchParams(Object.fromEntries(
      Object.entries(params).filter(([_, value]) => value.trim() !== '')
    ))
    // setQueryResults([])
    // getTripsDataHandler(params)
    router.push(`/SearchResults?${queryString}`)
  }

  useEffect(() => {
    setFrom(params.from || '')
    setTo(params.to || '')
    setDate(params.date || getCurrentDate())
    setAmount(params.amount || '')
    setPrice(params.bottomPrice && params.topPrice ? [Number(params.bottomPrice), Number(params.topPrice)] : [0, 100])
  }, [params]);
  return (
    <Paper className={'ml-5 mt-5 mr-5'} elevation={3}>

      <form className={`flex flex-col items-cented p-[10%] pl-[20%]`} onSubmit={filtrBtnHandler}>
        <Autocomplete
          disablePortal
          value={from}
          id="combo-box-demo"
          options={cities}
          sx={{ width: 300 }}
          onChange={(event: any, newValue: string | null) => {
            setFrom(newValue || '')
          }}
          renderInput={(params) => <TextField
            {...params}
            required
            id="fromField"
            name='from'
            type='text'
            size='small'
            label="Откуда"
            variant="standard"
            className='w-48 mt-2 mb-2'
            onChange={(e) => setFrom(e.target.value)}
          />}
        />
         <Autocomplete
          disablePortal
          value={to}
          id="combo-box-demo"
          options={cities}
          sx={{ width: 300 }}
          onChange={(event: any, newValue: string | null) => {
            setTo(newValue || '')
          }}
          renderInput={(params) => <TextField
            {...params}
            required
            id="toField"
            name='to'
            type='text'
            size='small'
            label="Куда"
            variant="standard"
            className='w-48 mt-2 mb-2'
            onChange={(e) => setTo(e.target.value)}
          />}
        />
        
        <TextField
          id="dateField"
          name='date'
          type='date'
          size='small'
          label="Дата"
          variant="standard"
          className='w-48 mt-2 mb-2'
          value={date}
          onChange={(e) => setDate(e.target.value)}
          inputProps={{ min: currentDate }}
        />
        <TextField
          id="amountField"
          name='amount'
          type='number'
          size='small'
          label="Кол-во человек"
          variant="standard"
          className='w-48 mt-2 mb-2'
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          inputProps={{ min: 1, max: 50 }}
        />
    
        <Typography id="price" gutterBottom className='mt-4'>
          Цена
        </Typography>
        <Slider
          className='w-48'
          aria-labelledby='price'
          value={price}
          min={0}
          max={100}
          onChange={handleSliderChange}
          valueLabelDisplay="auto"
          getAriaLabel={() => 'Minimum distance'}
          disableSwap
        />
        <Box display="flex" alignItems="center" mt={2} width={192} justifyContent={'center'}>
          <Input
            value={price[0]}
            size="small"
            onChange={(e) => handleInputChange(0, e.target.value)}
            inputProps={{
              step: 1,
              min: 0,
              max: 100,
              type: 'number',
              'aria-labelledby': 'price',
            }}
          />
          <span className="mx-2">-</span>
          <Input
            value={price[1]}
            size="small"
            onChange={(e) => handleInputChange(1, e.target.value)}
            inputProps={{
              step: 1,
              min: 0,
              max: 100,
              type: 'number',
              'aria-labelledby': 'price',
            }}
          />
        </Box>
        <Button type='submit' variant="contained" className={`w-48 mt-4 ${styles.findBnt}`}>Поиск</Button>

      </form >

    </Paper>
  )
}

export default Filter




{/* <form
onSubmit={(e) => filtrBtnHandler(e)}
className='h-[100%] flex justify-between'>
<div className='w-[20%] h-[100%] flex items-center ml-[2%]'>
  <Autocomplete
    value={from}
    disablePortal
    id="combo-box-demo"
    options={cities}
    sx={{ width: '90%' }}
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
      onFocus={(e) => e.target.select()} />}
  />

</div>
<div className='w-[20%] h-[100%] flex items-center '>
  <Autocomplete
    disablePortal
    value={to}
    id="combo-box-demo"
    options={cities}
    sx={{ width: '90%' }}
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
      onFocus={(e) => e.target.select()} />}
  />

</div>
<div className='w-[20%] h-[100%] flex items-center '>
  <TextField
    sx={{ width: '90%' }}
    id="date"
    type='date'
    label="Дата"
    variant="outlined"
    value={date}
    onChange={(e) => setDate(e.target.value)}
    onFocus={(e) => e.target.select()}
    inputProps={{ min: currentDate }} />
</div>
<div className='w-[20%] h-[100%] flex items-center '>

  <Select
    sx={{ width: '90%' }}
    id="amount"
    value={amount}
    onChange={(e) => setAmount(e.target.value)}
    // autoWidth
    fullWidth
    type='text'
  >
    <MenuItem value={1}>1 паcсажир</MenuItem>
    <MenuItem value={2}>2 паcсажира</MenuItem>
    <MenuItem value={3}>3 пасcажира</MenuItem>
    <MenuItem value={4}>4 пасcажира</MenuItem>
    <MenuItem value={5}>5 пасcажира</MenuItem>
  </Select>

</div>

<div className='flex items-center w-[15%] h-[100%] mr-[2%]'>
  <Button variant="contained" type='submit' className={styles.findBnt}>Найти</Button>
</div>
</form> */}