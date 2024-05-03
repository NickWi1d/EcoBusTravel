import { BusTrip, Passenger, SeatsArray } from '@/types/types'
import { Button, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, SelectChangeEvent, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'

const ChangePlaceInfo = ({ setIsShowSeatWindow, clickedPalce, selectedSeat, setSeats }: { setIsShowSeatWindow: React.Dispatch<React.SetStateAction<boolean>>, clickedPalce: number, selectedSeat: Passenger | null, setSeats: React.Dispatch<React.SetStateAction<SeatsArray>> }) => {

    const [passengerName, setPassengerName] = useState('')
    const [passengerSurname, setPassengerSurname] = useState('')
    const [passengerPatronymic, setPassengerPatronymic] = useState('')
    const [documentNumber, setDocumentNumber] = useState('')
    const [birthDate, setBirthDate] = useState('')
    const [gender, setGender] = useState('')
    const [isSeatAvaliable, setIsSeatAvaliable] = useState(true)

    useEffect(() => {
        if (selectedSeat) {
            setPassengerName(selectedSeat?.name)
            setPassengerSurname(selectedSeat.surname)
            setPassengerPatronymic(selectedSeat.patronymic)
            setDocumentNumber(selectedSeat.documentNumber)
            setBirthDate(selectedSeat.birthDate)
            setGender(selectedSeat.gender)
        }
    }, [selectedSeat])
    useEffect(() => {
        if (passengerName.length !== 0 || passengerSurname.length !== 0 || passengerPatronymic.length !== 0 || documentNumber.length !== 0 || birthDate.length !== 0 || gender.length !== 0) {
            setIsSeatAvaliable(false)
            console.log('говно')
        } else {
            setIsSeatAvaliable(true)
        }
    }, [passengerName, passengerSurname, passengerPatronymic, documentNumber, birthDate, gender])
    function changePlaceInfoHandler() {
        console.log('passengerSurname',passengerSurname);
        
        setSeats(prev => {
            let newSeats = prev.map((seat, index) => {
                if (index === clickedPalce) {
                    if(isSeatAvaliable && seat.owner){
                        return {
                            user:{
                                _id: '',
                                username: '',
                                email: '',
                                surname:'',        
                                name: ''
                            },
                            available: isSeatAvaliable,
                            owner: {
                                id: seat.owner?.id,
                                surname: passengerSurname,
                                name: passengerName,
                                patronymic: passengerPatronymic,
                                documentNumber: documentNumber,
                                birthDate: birthDate,
                                gender: gender
                            }
                        }
                    }else{
                        return {
                            user:null,
                            available: isSeatAvaliable,
                            owner: null
                        }
                    }

                }
                return seat
            })
            return newSeats
        })
        setIsShowSeatWindow(false)
    }
    return (
        <form onSubmit={changePlaceInfoHandler} className='flex flex-col pt-[2%]'>
            <Button variant="outlined" size="small" color="info" className='ml-[2%] w-[15%] mb-[2%]'>
                Место №:{clickedPalce + 1}
            </Button>
            <div className='flex justify-between pl-[2%]'>
                <TextField
                    // required
                    id="surname"
                    type='text'
                    label="Фамилия"
                    variant="outlined"
                    value={passengerSurname}
                    onChange={(e) => setPassengerSurname(e.target.value)}
                    onFocus={(e) => e.target.select()}
                />
                <TextField
                    // required
                    id="name"
                    type='text'
                    label="Имя"
                    variant="outlined"
                    value={passengerName}
                    onChange={(e) => setPassengerName(e.target.value)}
                    onFocus={(e) => e.target.select()}
                />
                <TextField

                    // required
                    id="patronymic"
                    type='text'
                    label="Отчество"
                    variant="outlined"
                    value={passengerPatronymic}
                    onChange={(e) => setPassengerPatronymic(e.target.value)}
                    onFocus={(e) => e.target.select()}
                />
            </div>
            <div className='flex justify-between items-center pl-[2%] mt-[2%]'>
                <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                    >
                        <FormControlLabel value="мужской" control={<Radio />} label="мужской" />
                        <FormControlLabel value="женский" control={<Radio />} label="женский" />
                    </RadioGroup>
                </FormControl>
                <TextField
                    className='w-[31%]'
                    // required
                    id='documentNumber'
                    type='text'
                    label='Номер паспорта'
                    variant='outlined'
                    value={documentNumber}
                    onChange={(e) => setDocumentNumber(e.target.value)}
                    onFocus={(e) => e.target.select()}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    className='w-[31%]'
                    // required
                    id="birthDate"
                    type='date'
                    label="Дата рождения"
                    variant="outlined"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    onFocus={(e) => e.target.select()}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </div>
            <div className='flex justify-end'>
                <Button type='submit' variant="contained" className='bg-[#2A5FCF] hover:bg-[#134bc4] mt-4 w-[10%]'>ок</Button>
            </div>

        </form>
    )
}

export default ChangePlaceInfo