import { Bus, typeOfBus } from '@/types/types'
import { Button, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select } from '@mui/material'
import React, { useEffect, useState } from 'react'

const EditBusInfo = ({ setIsEditBusInfo, setIsAddNewBus, isAddNewBus, selectedBus, upDateBusInfoHandler }: { setIsEditBusInfo: React.Dispatch<React.SetStateAction<boolean>>, setIsAddNewBus:React.Dispatch<React.SetStateAction<boolean>>,  isAddNewBus: boolean, selectedBus: Bus, upDateBusInfoHandler:(uid:string, typeOfBus:typeOfBus)=>void }) => {
    const [type, setType] = useState<typeOfBus>('L')

    useEffect(() => {
        setType(selectedBus.type)
    }, [])
    
    function EditBusInfo() {
        setIsAddNewBus(false)
        // isAddNewBus ? addNewTripHandler() : 
        upDateBusInfoHandler(selectedBus._id, type)
        setIsEditBusInfo(false)
    }

    return (
        <form onSubmit={EditBusInfo}>
            {!isAddNewBus &&
                <div className=' mb-[2%]'>
                    <Button variant="outlined" size="small" color="info">
                        Id: {selectedBus._id}
                    </Button>
                    <Button variant="outlined" size="small" color="error" className='ml-[2%]' >
                        Списать автобус
                    </Button>
                </div>
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
            <div className='flex justify-end'>
                <button className='mt-3' onClick={() => setIsEditBusInfo(false)}>Отмена</button>
                <Button type='submit' variant="contained" className='bg-[#2A5FCF] hover:bg-[#134bc4] mt-4 ml-4'>Готово</Button>
            </div>
        </form>
    )
}

export default EditBusInfo