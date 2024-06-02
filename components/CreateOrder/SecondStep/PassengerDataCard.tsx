import React, { useState, useEffect } from 'react'
import styles from '@/styles/CreateOrder.module.scss'
import { Button, TextField, Select, MenuItem, FormControl, InputLabel, SelectChangeEvent, Paper } from '@mui/material'
import Modal from "@/components/ModalWindows/Modal";
import ChoosePassenger from '../../ModalWindows/ChoosePassenger';
import { Passenger } from '@/types/types';
import PassengerForm from '../../PersonalAccount/PassengerForm';

const PassengerDataCard = ({ 
    TicketNumber, 
    userPassengers, 
    setCurrentPassengers,
    currentPassenger
}: { 
    TicketNumber: number, 
    userPassengers: Passenger[], 
    setCurrentPassengers: React.Dispatch<React.SetStateAction<Passenger[]>>,
    currentPassenger:Passenger
}) => {
    const [surname, setSurname] = useState('')
    const [name, setName] = useState('')
    const [patronymic, setPatronymic] = useState('')
    const [documentNumber, setDocumentNumber] = useState('')
    const [birthDate, setBirthDate] = useState('')
    const [gender, setGender] = useState('')

    const [showModal, setShowModal] = useState(false)

    function setPassengerInfo(surname: string, name: string, patronymic: string, documentNumber: string, birthDate: string, gender: string) {
        setSurname(surname)
        setName(name)
        setPatronymic(patronymic)
        setDocumentNumber(documentNumber)
        setBirthDate(birthDate)
        setGender(gender)
    }
    useEffect(() => {
        // if(surname.length !== 0 && name.length !== 0 && patronymic.length !== 0 && documentNumber.length !== 0 && birthDate.length !== 0 && gender.length !== 0){
            setCurrentPassengers(prev => {
                console.log(userPassengers);
                prev[TicketNumber - 1] = { id:userPassengers[TicketNumber - 1].id, surname, name, patronymic, documentNumber, birthDate, gender }
                return prev
            })
        // }
    }, [surname, name, patronymic, documentNumber, birthDate, gender])


    useEffect(() => {
        setSurname(currentPassenger.surname)
        setName(currentPassenger.name)
        setPatronymic(currentPassenger.patronymic)
        setDocumentNumber(currentPassenger.documentNumber)
        setBirthDate(currentPassenger.birthDate)
        setGender(currentPassenger.gender)
    }, [])
    

    return (
        <div className={styles.passengerDataCard}>
            {showModal && <Modal width={30}>
                <ChoosePassenger
                    setShowModal={setShowModal}
                    userPassengers={userPassengers}
                    setPassengerInfo={setPassengerInfo}
                ></ChoosePassenger>
            </Modal>}

                <div className={styles.topBlock}>
                    <div className='flex'><h1 className='ml-4 mb-3 mr-7'>Билет {TicketNumber}</h1><p className={styles.choosePassangerLink} onClick={() => setShowModal(true)}>Выбрать пассажира</p></div>
                    <div className='flex-column'>
                        {/* <div className={styles.fio}>
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
                    </div>
                    <div className={styles.otherPersonalInfo}>
                        <div className={styles.gender}>
                            <div className={`${styles.maleBnt} ${gender === 'male' && styles.pickedMaleBnt}`} onClick={() => setGender('male')}>М.</div>
                            <div className={`${styles.femaleBtn}  ${gender === 'female' && styles.pickedFemaleBnt}`} onClick={() => setGender('female')}>Ж.</div>
                        </div>
                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="documentLabel">Документ</InputLabel>
                            <Select
                                value={document}
                                labelId="documentLabel"
                                className={styles.document}
                                id="document"
                                label='Документ'
                                onChange={handleChange}
                                type='text'
                            >
                                <MenuItem value={'Паспорт РБ'}>Паспорт РБ</MenuItem>
                                <MenuItem value={'Иностранный документ'}>Иностарнный документ</MenuItem>
                                <MenuItem value={'Свидетельство о рождении'}>Свидетельство о рождении</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            className={styles.documentNumber}
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
                            className={styles.birthDate}
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

                    </div> */}
                        <PassengerForm
                            surname={surname}
                            name={name}
                            patronymic={patronymic}
                            documentNumber={documentNumber}
                            birthDate={birthDate}
                            gender={gender}
                            setSurname={setSurname}
                            setName={setName}
                            setPatronymic={setPatronymic}
                            setDocumentNumber={setDocumentNumber}
                            setBirthDate={setBirthDate}
                            setGender={setGender}
                        ></PassengerForm>
                    </div>

                </div>
        </div>
    )
}

export default PassengerDataCard