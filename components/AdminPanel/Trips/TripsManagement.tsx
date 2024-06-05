import { BusTrip } from '@/types/types'
import { Autocomplete, Box, Button, IconButton, InputBase, ListItem, ListItemButton, ListItemText, Paper, Grid, List } from '@mui/material'
import styles from '@/styles/Admin.module.scss'
import React, { FormEvent, useState } from 'react'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SearchIcon from '@mui/icons-material/Search';
import Divider from '@mui/material/Divider';
import { DataGrid, GridColDef, GridEventListener, useGridApiRef, gridClasses, MuiEvent, GridRowParams, GridCallbackDetails } from '@mui/x-data-grid';
import { ruRU } from '@mui/x-data-grid/locales';

interface BusTripExtended extends BusTrip {
    warning: boolean;
  }

const columns: GridColDef[] = [
    {
        field: '_id',
        headerName: 'ID',
        width: 350,
        type: 'string',
        sortingOrder: ['desc', 'asc', null]
    },
    {
        field: 'date',
        headerName: 'Дата',
        type: 'date',
        width: 300,
        sortingOrder: ['desc', 'asc', null]
    },
    {
        field: 'from',
        headerName: 'Откуда',
        type: 'string',
        width: 250,
        sortingOrder: ['desc', 'asc', null]
    },
    {
        field: 'to',
        headerName: 'Туда',
        type: 'string',
        width: 250,
        sortingOrder: ['desc', 'asc', null]
    },
    {
        field: 'warning',
        headerName: 'Успешно',
        type: 'boolean',
        width: 100,
        sortingOrder: ['desc', 'asc', null],
        align: 'left',
        headerAlign: 'left'
    }
];



const TripsManagement = (
    {
        tripsList,
        setIsShowEditTripInfo,
        setSelectedTrip,
        setIsAddNewTrip
    }: {
        tripsList: BusTrip[],
        setIsShowEditTripInfo: React.Dispatch<React.SetStateAction<boolean>>,
        setSelectedTrip: React.Dispatch<React.SetStateAction<BusTripExtended>>,
        setIsAddNewTrip: React.Dispatch<React.SetStateAction<boolean>>
    }) => {
    const apiRef = useGridApiRef();

    const [searchValue, setSearchValue] = useState('')

    const filteredTrips = tripsList.filter(trip =>
        `${trip._id} ${trip.date} ${trip.from} ${trip.to}`.toLowerCase().includes(searchValue.toLowerCase())
    );
    let rows = filteredTrips.map(trip => {
        return {
            id: trip._id,
            _id: trip._id,
            date: new Date(trip.date),
            from: trip.from,
            to: trip.to,
            driver: trip.driver,
            finishTime: trip.finishTime,
            price: trip.price,
            busNumber: trip.busNumber,
            availableSeats: trip.availableSeats,
            travelTime: trip.travelTime,
            reservedSeats: trip.reservedSeats,
            seats: trip.seats,
            startTime: trip.startTime,
            destination: trip.destination,
            departure: trip.departure,
            destinationAddress: trip.destinationAddress,
            departureAddress: trip.departureAddress,
            warning: trip.busNumber === null ? false : true
        }
    })

    function openTripEditor(params: GridRowParams) {
        setIsShowEditTripInfo(true)
        setSelectedTrip(params.row)
    }
    function addNewTrip() {
        setIsAddNewTrip(true)
        setIsShowEditTripInfo(true)
        setSelectedTrip({
            _id: '',
            date: '',
            driver: '',
            finishTime: '',
            from: '',
            price: 0,
            to: '',
            busNumber: '',
            availableSeats: 50,
            travelTime: '',
            reservedSeats: 0,
            seats: Array.from({ length: 50 }, () => ({
                orderId: '',
                user: null,
                available: true,
                owner: null
            })),
            startTime: '',
            destination: '',
            departure: '',
            destinationAddress: '',
            departureAddress: '',
            warning:true
        })
    }

    return (
        <>
            <Box sx={{ display: 'flex', height: '50px' }}>
                <Paper
                    component="form"
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '80%' }}
                >
                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                    <Autocomplete
                        value={searchValue}
                        onChange={(event: any, newValue: string | null) => {
                            setSearchValue(newValue || '')
                        }}
                        freeSolo
                        options={[]}
                        renderInput={(params) => (
                            <InputBase
                                {...params}
                                sx={{ ml: 1, flex: 1 }}
                                placeholder="Поиск"
                                inputProps={{ ...params.inputProps, 'aria-label': 'search google maps' }}
                                onChange={(event) => setSearchValue(event.target.value)}
                            />
                        )}
                    />

                </Paper>
                <Button variant='contained' className={`${styles.Btn} ml-[2%] w-[20%] flex items-center`} onClick={addNewTrip}>Добавить новый рейс<img src="/icons8-плюс-32.png" className={'ml-3 pb-[2px]'} alt="" width={20} /></Button>
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
                    onRowClick={(params) => openTripEditor(params)}
                    localeText={{
                        ...ruRU.components.MuiDataGrid.defaultProps.localeText,
                        noRowsLabel: 'Нет строк',
                        footerRowSelected: count => `${count.toLocaleString()} строк выбрано`,
                        footerTotalVisibleRows: (visibleCount, totalCount) =>
                          `${visibleCount.toLocaleString()} из ${totalCount.toLocaleString()}`,
                    }}
                />
            </Box>
            {/* <List
                sx={{ width: '93%', height: 400, bgcolor: 'background.paper', marginTop: '2%' }}
            >
                {filteredTrips.map((trip, index) => (
                    <ListItem key={index} component="div" disablePadding>

                        <ListItemButton onClick={() => openTripEditor(trip)} sx={{ border: '1px solid #ccc', marginBottom: 1, borderRadius: 2 }}>
                            <Grid container spacing={1} alignItems="center" sx={{ marginTop: '1px' }} >
                                <Grid item xs sx={{ padding: 0 }}>
                                    <ListItemText primary={`Id: ${trip._id}`} sx={{ marginLeft: '2%' }} />
                                </Grid>
                                <Divider orientation="vertical" flexItem />
                                <Grid item xs sx={{ padding: 0 }}>
                                    <ListItemText primary={`Дата: ${trip.date}`} sx={{ marginLeft: '25%' }} />
                                </Grid>
                                <Divider orientation="vertical" flexItem />
                                <Grid item xs sx={{ padding: 0 }}>
                                    <ListItemText primary={`Откуда: ${trip.from}`} sx={{ marginLeft: '25%' }} />
                                </Grid>
                                <Divider orientation="vertical" flexItem />
                                <Grid item xs sx={{ padding: 0 }}>
                                    <ListItemText primary={`Куда: ${trip.to}`} sx={{ marginLeft: '25%' }} />
                                </Grid>
                                <MoreHorizIcon sx={{ fontSize: 15 }} />
                            </Grid>
                        </ListItemButton>


                    </ListItem>
                ))}
            </List> */}
        </>
    )
}

export default TripsManagement