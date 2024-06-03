import { Autocomplete, Box, Button, IconButton, InputBase, Paper, TextField } from '@mui/material'
import React, { useState } from 'react'
import { DataGrid, GridColDef, useGridApiRef, gridClasses, GridRowParams } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
import styles from '@/styles/Admin.module.scss'
import { Bus, typeOfBus } from '@/types/types';
import EditBusInfo from './EditBusInfo';
import Modal from '@/components/ModalWindows/Modal';



const columns: GridColDef[] = [
  {
    field: 'plateNumber',
    headerName: 'Номер автобуса',
    width: 350,
    type: 'string',
    sortingOrder: ['desc', 'asc', null]
  },
  {
    field: 'type',
    headerName: 'Тип',
    type: 'string',
    width: 350,
    sortingOrder: ['desc', 'asc', null]
  },
  {
    field: 'amountOfSeats',
    headerName: 'Кол-во мест',
    type: 'number',
    width: 350,
    sortingOrder: ['desc', 'asc', null],
    align: 'left',
    headerAlign: 'left'
  }
];

const BusesManagement = ({
  busesList,
  selectedBus,
  setSelectedBus,
  upDateBusInfoHandler,
  addNewBusHandler,
  loading,
  isEditBusInfo,
  setIsEditBusInfo,
  isAddNewBus,
  setIsAddNewBus,
  deleteBusHandler
}: {
  busesList: Bus[] | [],
  selectedBus: Bus,
  setSelectedBus: React.Dispatch<React.SetStateAction<Bus>>,
  upDateBusInfoHandler: (uid: string, typeOfBus: typeOfBus) => void,
  addNewBusHandler: (typeOfBus: typeOfBus, plateNumber: string) => void,
  loading: boolean,
  isEditBusInfo: boolean,
  setIsEditBusInfo: React.Dispatch<React.SetStateAction<boolean>>,
  isAddNewBus: boolean,
  setIsAddNewBus: React.Dispatch<React.SetStateAction<boolean>>,
  deleteBusHandler: (uid: string, type:typeOfBus) => void
}) => {





  const [searchValue, setSearchValue] = useState('')

  const apiRef = useGridApiRef();

  const filteredBuses = busesList.filter(bus =>
    `${bus.plateNumber} ${bus.type}`.toLowerCase().includes(searchValue.toLowerCase())
  );

  let rows = filteredBuses.map(bus => {
    return {
      id: bus._id,
      _id: bus._id,
      plateNumber: bus.plateNumber,
      type: bus.type,
      amountOfSeats: bus.amountOfSeats
    }
  })

  function openBusEditor(params: GridRowParams) {
    setIsEditBusInfo(true)
    setSelectedBus(params.row)
    setIsAddNewBus(false)
  }
  function openBusCreator() {
    setIsEditBusInfo(true)
    setIsAddNewBus(true)
  }

  return (
    <>
      {isEditBusInfo &&
        <Modal width={35}>
          <EditBusInfo
            setIsEditBusInfo={setIsEditBusInfo}
            setIsAddNewBus={setIsAddNewBus}
            isAddNewBus={isAddNewBus}
            selectedBus={selectedBus}
            upDateBusInfoHandler={upDateBusInfoHandler}
            addNewBusHandler={addNewBusHandler}
            loading={loading}
            deleteBusHandler={deleteBusHandler}
          ></EditBusInfo>
        </Modal>}
      <Box sx={{ display: 'flex', height: '50px' }}>
        <Paper
          component="form"
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '75%' }}
        >
          <Autocomplete
            value={searchValue}
            onChange={(event: any, newValue: string | null) => {
              setSearchValue(newValue || '');
            }}
            freeSolo
            options={[]}
            renderInput={(params) => (
              <InputBase
                {...params}
                sx={{ ml: 1, flex: 1, width: 1240 }}
                placeholder="Поиск"
                inputProps={{ ...params.inputProps, 'aria-label': 'search google maps' }}
                onChange={(event) => setSearchValue(event.target.value)}
              />
            )}
          />
          <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
        <Button variant='contained' className={`${styles.Btn} ml-[2%] w-[25%] flex items-center`} onClick={openBusCreator}>Добавить автобус<img src="/icons8-плюс-32.png" className={'ml-3 pb-[2px]'} alt="" width={20} /></Button>
      </Box>
      <Box sx={{ height: 500, marginTop: '2%' }}>
        <DataGrid
          sx={{
            [`& .${gridClasses.cell}:focus, & .${gridClasses.cell}:focus-within`]: {
              outline: 'none',
            },
            [`& .${gridClasses.columnHeader}:focus, & .${gridClasses.columnHeader}:focus-within`]:
            {
              outline: 'none',
            },
          }}
          disableRowSelectionOnClick
          rowSelection={false}
          disableMultipleRowSelection
          hideFooterSelectedRowCount
          disableColumnResize
          disableColumnMenu
          apiRef={apiRef}
          rows={rows}
          columns={columns}
          // onRowClick={(params) => openBusEditor(params)}
        />
      </Box>
    </>
  )
}

export default BusesManagement