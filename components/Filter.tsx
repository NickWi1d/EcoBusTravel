import React, { ChangeEvent, useState, FormEvent, useEffect } from 'react'
import { TextField, Button, Slider, Typography, Input, Box } from '@mui/material'
import { useRouter } from 'next/navigation'
import styles from '@/styles/SearchResults.module.scss'

interface QueryParams {
  [key: string]: string | string[] | undefined;
}

// interface ParamsType {
//   from: string | undefined,
//   to: string | undefined,
//   date: string | undefined,
//   amount: string | undefined,
//   time?: string,
//   price?: number[]
// }

interface queryParams {
  params: {
    from?: string,
    to?: string,
    date?: string,
    amount?: string,
    bottomPrice?: string,
    topPrice?: string
    time?: string
  },
  setQueryParamsState: React.Dispatch<React.SetStateAction<QueryParams>>,
  getSearchResults: () => void;
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

const Filter: React.FC<queryParams> = ({ params, setQueryParamsState, getSearchResults }) => {
  const minDistance = 20;
  const router = useRouter()



  const [from, setFrom] = useState(params.from || '')
  const [to, setTo] = useState(params.to || '')
  const [date, setDate] = useState(params.date || getCurrentDate())
  const [amount, setAmount] = useState(params.amount || '')
  const [time, setTime] = useState(params.time || '')
  const [price, setPrice] = React.useState<number[]>([Number(params.bottomPrice), Number(params.topPrice)] || [0, 100])



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
      time: time,
      bottomPrice: String(price[0]),
      topPrice: String(price[1])
    }
    setQueryParamsState(params)
    const queryString = new URLSearchParams(Object.fromEntries(
      Object.entries(params).filter(([_, value]) => value.trim() !== '')
    ))
    router.push(`/SearchResults?${queryString}`)
  }

  useEffect(() => {
    setFrom(params.from || '');
    setTo(params.to || '');
    setDate(params.date || '');
    setAmount(params.amount || '');
    setTime(params.time || '');
    setPrice(params.bottomPrice && params.topPrice ? [Number(params.bottomPrice), Number(params.topPrice)] : [0, 100]);
  }, [params]);
  return (
    <form className='flex flex-col items-cented ml-5' onSubmit={filtrBtnHandler}>
      <p>Фильтр</p>
      <TextField
        id="fromField"
        name='from'
        type='text'
        size='small'
        label="Откуда"
        variant="standard"
        className='w-48 mt-2 mb-2'
        value={from}
        onChange={(e) => setFrom(e.target.value)}
      />
      <TextField
        id="toField"
        name='to'
        type='text'
        size='small'
        label="Куда"
        variant="standard"
        className='w-48 mt-2 mb-2'
        value={to}
        onChange={(e) => setTo(e.target.value)}
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
        inputProps={{ min: 1, max:50 }}
      />
      {/* <TextField
        id="timeField"
        name='time'
        size='small'
        label="Время"
        variant="standard"
        className='w-48 mt-2 mb-2'
        value={time}
        onChange={(e) => setTime(e.target.value)} /> */}
      {/* <TextField id="fromField" name='from' size='small' label="Откуда" variant="standard" className='w-48 mt-2 mb-2' value={params.from ?? ''} onChange={setNewQueryParam} />
      <TextField id="toField" name='to' size='small' label="Куда" variant="standard" className='w-48 mt-2 mb-2' value={params.to ?? ''} onChange={setNewQueryParam} />
      <TextField id="dateField" name='date' size='small' label="Дата" variant="standard" className='w-48 mt-2 mb-2' value={params.date ?? ''} onChange={setNewQueryParam} />
      <TextField id="amountField" name='amount' size='small' label="Кол-во человек" variant="standard" className='w-48 mt-2 mb-2' value={params.amount ?? ''} onChange={setNewQueryParam} />
      <TextField id="timeField" name='time' size='small' label="Время" variant="standard" className='w-48 mt-2 mb-2' value={params.time ?? ''} onChange={setNewQueryParam} /> */}
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
  )
}

export default Filter