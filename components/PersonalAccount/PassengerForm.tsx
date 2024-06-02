import React, { FC, RefObject } from 'react'
import styles from '@/styles/CreateOrder.module.scss'
import { Button, TextField, Select, MenuItem, FormControl, InputLabel, SelectChangeEvent, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material'

interface PassengerFormProps {
    birthDate: string,
    documentNumber: string,
    gender: string,
    name: string,
    patronymic: string,
    surname: string,
    setSurname: React.Dispatch<React.SetStateAction<string>>,
    setName: React.Dispatch<React.SetStateAction<string>>,
    setPatronymic: React.Dispatch<React.SetStateAction<string>>,
    setDocumentNumber: React.Dispatch<React.SetStateAction<string>>,
    setBirthDate: React.Dispatch<React.SetStateAction<string>>,
    setGender: React.Dispatch<React.SetStateAction<string>>,
}

const PassengerForm: FC<PassengerFormProps> = ({ birthDate, documentNumber, gender, name, patronymic, surname, setSurname, setName, setPatronymic, setDocumentNumber, setBirthDate, setGender }) => {
    return (
        <div>
            <div className={styles.fio} >
                <TextField
                    required
                    id="surname"
                    type='text'
                    label="Фамилия"
                    variant="outlined"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                    onFocus={(e) => e.target.select()}
                />
                <TextField
                    required
                    id="name"
                    type='text'
                    label="Имя"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onFocus={(e) => e.target.select()}
                />
                <TextField
                    id="patronymic"
                    type='text'
                    label="Отчество"
                    variant="outlined"
                    value={patronymic}
                    onChange={(e) => setPatronymic(e.target.value)}
                    onFocus={(e) => e.target.select()}
                />
            </div>
            <div className={styles.otherPersonalInfo}>
                {/* <div className={styles.gender}>
                    <div className={`${styles.maleBnt} ${gender === 'мужской' && styles.pickedMaleBnt}`} onClick={() => setGender('мужской')}>М.</div>
                    <div className={`${styles.femaleBtn}  ${gender === 'женский' && styles.pickedFemaleBnt}`} onClick={() => setGender('женский')}>Ж.</div>
                </div> */}
                <FormControl required>
                    <FormLabel id="demo-row-radio-buttons-group-label">Пол</FormLabel>
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
                    required
                    className={styles.documentNumber}
                    // required
                    id='documentNumber'
                    type='text'
                    label='Номер документа'
                    variant='outlined'
                    value={documentNumber}
                    onChange={(e) => setDocumentNumber(e.target.value)}
                    onFocus={(e) => e.target.select()}
                    // InputLabelProps={{
                    //     shrink: true,
                    // }}
                />
                <TextField
                    required
                    className={`${styles.birthDate}`}
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
        </div>
    )
}

export default PassengerForm