import React, { ChangeEvent } from 'react'
import { TextField, Button } from '@mui/material'
interface QueryParams {
  [key: string]: string;
}
interface queryParams {
  params: {
    from?: string,
    to?: string,
    date?: string,
    amount?: string,
    price?: string,
    time?: string
  },
  setQueryParamsState: React.Dispatch<React.SetStateAction<QueryParams>>,
  getSearchResults: () => void;
}

const Filter: React.FC<queryParams> = ({ params, setQueryParamsState, getSearchResults }) => {
  function setNewQueryParam(event: React.ChangeEvent<HTMLInputElement>): void {
    const { name, value } = event.target;
    setQueryParamsState((prevParams) => ({
      ...prevParams,
      [name]: value,
    }));
  }

  return (
    <form className='flex flex-col items-cented w-96'>
      <TextField id="fromField" name='from' size='small' label="Откуда" variant="outlined" margin='dense' className='w-48' value={params.from ?? ''} onChange={setNewQueryParam} />
      <TextField id="toField" name='to' size='small' label="Куда" variant="outlined" margin='dense' className='w-48' value={params.to ?? ''} onChange={setNewQueryParam} />
      <TextField id="dateField" name='date' size='small' label="Дата" variant="outlined" margin='dense' className='w-48' value={params.date ?? ''} onChange={setNewQueryParam} />
      <TextField id="amountField" name='amount' size='small' label="Кол-во человек" variant="outlined" margin='dense' className='w-48' value={params.amount ?? ''} onChange={setNewQueryParam} />
      <TextField id="priceField" name='price' size='small' label="Цена" variant="outlined" margin='dense' className='w-48' value={params.price ?? ''} onChange={setNewQueryParam} />
      <TextField id="timeField" name='time' size='small' label="Время" variant="outlined" margin='dense' className='w-48' value={params.time ?? ''} onChange={setNewQueryParam} />
      <Button variant="contained" className='w-48' onClick={getSearchResults}>Поиск</Button>
    </form>
  )
}

export default Filter