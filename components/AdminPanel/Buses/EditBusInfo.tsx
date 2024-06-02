import { Bus, typeOfBus } from '@/types/types'
import { Button, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material'
import React, { FormEvent, useEffect, useState } from 'react'
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
import { useLazyGetFaultyTripQuery } from '@/store/reducers/api/app';

const EditBusInfo = ({ 
    setIsEditBusInfo, 
    setIsAddNewBus, 
    isAddNewBus, 
    selectedBus, 
    upDateBusInfoHandler, 
    addNewBusHandler,
    loading,
    deleteBusHandler
}: { 
    setIsEditBusInfo: React.Dispatch<React.SetStateAction<boolean>>, 
    setIsAddNewBus: React.Dispatch<React.SetStateAction<boolean>>, 
    isAddNewBus: boolean, 
    selectedBus: Bus, 
    upDateBusInfoHandler: (uid: string, typeOfBus: typeOfBus) => void, 
    addNewBusHandler: (typeOfBus: typeOfBus, plateNumber: string) => void,
    loading:boolean,
    deleteBusHandler:(uid:string, type:typeOfBus) => void
}) => {

    


    const [type, setType] = useState<typeOfBus>('L')
    const [plateNumber, setPlateNumber] = useState('')

    useEffect(() => {
        setType(selectedBus.type)
    }, [])

    function EditBusInfo(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        
        isAddNewBus ? addNewBusHandler(type, plateNumber) : upDateBusInfoHandler(selectedBus._id, type)
        // setIsAddNewBus(false)
        // setIsEditBusInfo(false)
    }

    function deleteBus() {
        deleteBusHandler(selectedBus._id, type)
    }

    return (
        <form onSubmit={EditBusInfo}>
            {!isAddNewBus ?
                <div className=' mb-[2%]'>
                    <Button variant="outlined" size="small" color="info">
                        Id: {selectedBus._id}
                    </Button>
                    <Button variant="outlined" size="small" color="error" className='ml-[2%]' onClick={deleteBus}>
                        Списать автобус
                    </Button>
                </div> :
                <Typography variant='h6' gutterBottom>Добавление автобуса</Typography>
            }
            {/* <FormControl variant="outlined" sx={{ minWidth: 220 }}>
                <InputLabel id="demo-simple-select-standard-label">Age</InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={type}
                    onChange={(e) => setType(e.target.value as typeOfBus)}
                    label="Age"
                >
                    <MenuItem value={'M'}>Средний</MenuItem>
                    <MenuItem value={'L'}>Большой</MenuItem>
                </Select>
            </FormControl> */}
            <div className={'flex justify-between'}>
                {isAddNewBus &&
                    <TextField
                        id="plateNumber"
                        type='text'
                        label="Номер автобуса"
                        variant="outlined"
                        value={plateNumber}
                        onChange={(e) => setPlateNumber(e.target.value)}
                        onFocus={(e) => e.target.select()}
                        inputProps={{
                            pattern: ".{6}", // Регулярное выражение для проверки 6 символов
                            title: "Номер автобуса должен содержать ровно 6 символов" // Сообщение при ошибке
                        }}
                    />
                }
                <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">Тип автобуса</FormLabel>
                    <RadioGroup
                        defaultValue={type}
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={type}
                        onChange={(e) => setType(e.target.value as typeOfBus)}
                    >
                        <FormControlLabel value="L" control={<Radio />} label="Большой" />
                        <FormControlLabel value="M" control={<Radio />} label="Средний" />
                    </RadioGroup>
                </FormControl>
            </div>

            <div className='flex justify-end'>
                <button className='mt-3' onClick={() => setIsEditBusInfo(false)}>Отмена</button>
                <LoadingButton
                    type='submit'
                    variant="contained"
                    className='bg-[#2A5FCF] hover:bg-[#134bc4] mt-4 ml-4'
                    endIcon={<SendIcon />}
                    loading={loading}
                    loadingPosition="end"
                >Готово</LoadingButton>
            </div>
        </form>
    )
}

export default EditBusInfo