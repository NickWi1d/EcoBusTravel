import { Passenger } from '@/types/types'
import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material'
import React, { FormEvent, useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

const EditUserPassengerInfo = ({ selectedUserPassenger,
    sertIsShowEditUserPassengerInfo,
    isAddNewUserPassengerInfo,
    setIsAddNewUserPassengerInfo,
    setSelectedUserPassenger,
    setDeleteedUserPassengerId
}: {
    selectedUserPassenger: Passenger,
    sertIsShowEditUserPassengerInfo: React.Dispatch<React.SetStateAction<boolean>>,
    isAddNewUserPassengerInfo: boolean,
    setIsAddNewUserPassengerInfo: React.Dispatch<React.SetStateAction<boolean>>,
    setSelectedUserPassenger: React.Dispatch<React.SetStateAction<Passenger>>,
    setDeleteedUserPassengerId: React.Dispatch<React.SetStateAction<string | null>>,
}) => {

    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [patronymic, setPatronymic] = useState('')
    const [documentNumber, setDocumentNumber] = useState('')
    const [birthDate, setBirthDate] = useState('')
    const [gender, setGender] = useState('')
    const uniqueId = uuidv4();

    useEffect(() => {
        setName(selectedUserPassenger.name)
        setSurname(selectedUserPassenger.surname)
        setPatronymic(selectedUserPassenger.patronymic)
        setDocumentNumber(selectedUserPassenger.documentNumber)
        setBirthDate(selectedUserPassenger.birthDate)
        setGender(selectedUserPassenger.gender)
    }, [])

    useEffect(() => {
        setSelectedUserPassenger(prev => {
            return {
                id: isAddNewUserPassengerInfo ? uniqueId : prev.id,
                name: name,
                surname: surname,
                patronymic: patronymic,
                documentNumber: documentNumber,
                birthDate: birthDate,
                gender: gender
            }
        })
    }, [name, surname, patronymic, documentNumber, birthDate, gender])


    function cancelBtn() {
        sertIsShowEditUserPassengerInfo(false)
        setIsAddNewUserPassengerInfo(false)
    }

    function editUserPassengerInfo(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        sertIsShowEditUserPassengerInfo(false)
    }
    function deleteUserPassenger() {
        setDeleteedUserPassengerId(selectedUserPassenger.id)
        setIsAddNewUserPassengerInfo(false)
        sertIsShowEditUserPassengerInfo(false)
        setSelectedUserPassenger({
                id: '',
                name: '',
                surname: '',
                patronymic: '',
                documentNumber: '',
                birthDate: '',
                gender: ''
        })
        
    }

    return (
        <form onSubmit={editUserPassengerInfo}>
            {!isAddNewUserPassengerInfo &&
                <div className=' mb-[2%]'>
                    <Button variant="outlined" size="small" color="info">
                        Id: {selectedUserPassenger.id}
                    </Button>
                    <Button variant="outlined" size="small" color="error" className='ml-[2%]' onClick={deleteUserPassenger}>
                        Удалить пользователя
                    </Button>
                </div>
            }
            <div className='grid grid-rows-2 grid-cols-3 gap-4 mb-[2%]'>
                <TextField
                    // required
                    id="surname"
                    type='text'
                    label="Фамилия"
                    variant="outlined"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                    onFocus={(e) => e.target.select()}
                />
                <TextField
                    // required
                    id="name"
                    type='text'
                    label="Имя"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onFocus={(e) => e.target.select()}
                />
                <TextField

                    // required
                    id="patronymic"
                    type='text'
                    label="Отчество"
                    variant="outlined"
                    value={patronymic}
                    onChange={(e) => setPatronymic(e.target.value)}
                    onFocus={(e) => e.target.select()}
                />
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
                    // required
                    id='documentNumber'
                    type='text'
                    label='Номер документа'
                    variant='outlined'
                    value={documentNumber}
                    onChange={(e) => setDocumentNumber(e.target.value)}
                    onFocus={(e) => e.target.select()}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
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
                <button className='mt-3' onClick={cancelBtn}>Отмена</button>
                <Button type="submit" variant="contained" className='bg-[#2A5FCF] hover:bg-[#134bc4] mt-4 ml-4' >{isAddNewUserPassengerInfo ? 'Добавить' : 'Сохранить'}</Button>
            </div>
        </form>
    )
}

export default EditUserPassengerInfo