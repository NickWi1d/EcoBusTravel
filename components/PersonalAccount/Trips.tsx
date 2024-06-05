import { CustomUserTrip, DeletedTrips, UserTrip } from '@/types/types'
import { Box } from '@mui/material'
import { DataGrid, GridColDef, useGridApiRef, gridClasses, GridRowParams, GridLocaleText } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react'
import ShowUserTripInfo from '../AdminPanel/Users/ShowUserTripInfo';
import ShowTripInfo from './ShowTripInfo';
import Modal from '../ModalWindows/Modal';
import { ruRU } from '@mui/x-data-grid/locales';

const TripListColumns: GridColDef[] = [
    {
        field: 'date',
        headerName: 'Дата',
        width: 150,
        type: 'date',
        sortingOrder: ['desc', 'asc', null]
    },
    {
        field: 'from',
        headerName: 'Откуда',
        type: 'string',
        width: 150,
        sortingOrder: ['desc', 'asc', null]
    },
    {
        field: 'to',
        headerName: 'Куда',
        type: 'string',
        width: 150,
        sortingOrder: ['desc', 'asc', null]
    },
    {
        field: 'passengersAmount',
        headerName: 'Кол-во пассажиров',
        type: 'number',
        width: 180,
        sortingOrder: ['desc', 'asc', null]
    }
];

const Trips = ({
    userTrips,
    setUserTrips,
    setSelectedTrip,
    selectedTrip,
    deleteTripHandler,
    setDeletedTrip,
    name,
    email
}: {
    userTrips: UserTrip[] | [],
    setUserTrips: React.Dispatch<React.SetStateAction<UserTrip[] | []>>,
    setSelectedTrip: React.Dispatch<React.SetStateAction<CustomUserTrip>>,
    selectedTrip: CustomUserTrip,
    deleteTripHandler: (orderId:string, tripId:string, amountOfTickets:number) => void,
    setDeletedTrip: React.Dispatch<React.SetStateAction<DeletedTrips>>,
    name:string,
    email:string
    
}) => {

    const apiRef = useGridApiRef();

    const [isShowTripInfo, setIsShowTripInfo] = useState(false)
    // const [isDeleteTrip, setIsDeleteTrip] = useState(false)

   

    const TripListRows = userTrips.map(trip => {
        return {
            id: trip.orderId,
            orderId: trip.orderId,
            tripId: trip.tripId,
            seats: trip.seats,
            date: new Date(trip.tripData.date),
            from: trip.tripData.from,
            to: trip.tripData.to,
            driver: trip.tripData.driver,
            finishTime: trip.tripData.finishTime,
            price: trip.tripData.price,
            busNumber: trip.tripData.busNumber,
            availableSeats: trip.tripData.availableSeats,
            travelTime: trip.tripData.travelTime,
            reservedSeats: trip.tripData.reservedSeats,
            startTime: trip.tripData.startTime,
            destination: trip.tripData.destination,
            departure: trip.tripData.departure,
            destinationAddress: trip.tripData.destinationAddress,
            departureAddress: trip.tripData.departureAddress,
            passengersAmount: trip.seats.length
        }
    })
    function showTripInfo(params: GridRowParams) {
        setSelectedTrip(params.row)
        setIsShowTripInfo(true)
    }

    // useEffect(() => {
    //     if (isDeleteTrip) {
    //         deleteTripHandler()
    //         setIsDeleteTrip(false)
    //     }
    // }, [isDeleteTrip])

    return (
        <div>
            {isShowTripInfo &&
                <Modal width={50}>
                    <ShowTripInfo
                        setIsShowUserTripInfo={setIsShowTripInfo}
                        selectedUserTrip={selectedTrip}
                        setTrips={setUserTrips}
                        setDeletedTrip={setDeletedTrip}
                        // setIsDeleteTrip={setIsDeleteTrip}
                        name={name}
                        email={email}
                        deleteTripHandler={deleteTripHandler}
                    ></ShowTripInfo>
                </Modal>
            }
            {/* {userTrips.length === 0 && 'У вас нет сохраненных поездок'}
            {userTrips.map((trip, index) => <div key={index} className="border border-gray-300 rounded-md p-4 mb-4">
                <p className="text-lg font-semibold">Id: {trip.tripId}</p>
                <p className="text-gray-700">Откуда: {trip.tripData.from}</p>
                <p className="text-gray-700">Куда: {trip.tripData.to}</p>
            </div>)} */}
            <Box sx={{ height: 500}}>
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
                    rows={TripListRows}
                    columns={TripListColumns}
                    onRowClick={(params) => showTripInfo(params)}
                    localeText={{
                        ...ruRU.components.MuiDataGrid.defaultProps.localeText,
                        noRowsLabel: 'Нет строк',
                        footerRowSelected: count => `${count.toLocaleString()} строк выбрано`,
                        footerTotalVisibleRows: (visibleCount, totalCount) =>
                          `${visibleCount.toLocaleString()} из ${totalCount.toLocaleString()}`,
                    }}
                />
            </Box>
        </div>
    )
}

export default Trips