import React, { ChangeEvent, FormEvent, MouseEvent, useEffect, useState } from 'react'
import { IconButton, Paper, InputBase, Button, Autocomplete } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { IUser } from '@/types/types';
import styles from '@/styles/Admin.module.scss'
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Modal from '../../ModalWindows/Modal';
import { useDeleteMutation, useDeletePassengerMutation, useUpDateUserInfoMutation } from '@/store/reducers/api/app';
import { DataGrid, GridColDef, useGridApiRef, gridClasses, GridRowParams } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Имя',
    width: 350,
    type: 'string',
    sortingOrder: ['desc', 'asc', null]
  },
  {
    field: 'surname',
    headerName: 'Фамилия',
    type: 'string',
    width: 350,
    sortingOrder: ['desc', 'asc', null]
  }
];

const UsersManagement = ({
  usersList,
  setIsShowEditUserInfo,
  setIsAddNewUser,
  setSelectedUser
}: {
  usersList: IUser[],
  setIsShowEditUserInfo: React.Dispatch<React.SetStateAction<boolean>>,
  setIsAddNewUser: React.Dispatch<React.SetStateAction<boolean>>
  setSelectedUser: React.Dispatch<React.SetStateAction<IUser>>
}) => {


  const [searchValue, setSearchValue] = useState('')

  const apiRef = useGridApiRef();

  const filteredUsers = usersList.filter(user =>
    `${user.surname} ${user.name}`.toLowerCase().includes(searchValue.toLowerCase())
  );

  let rows = filteredUsers.map(user => {
    return {
      id: user._id,
      _id: user._id,
      username: user.username,
      password: user.password,
      email: user.email,
      surname: user.surname,
      name: user.name,
      passengers: user.passengers,
      trips: user.trips
    }
  })


  function addNewUser() {
    setIsShowEditUserInfo(true)
    setIsAddNewUser(true)
    setSelectedUser({
      _id: '',
      username: '',
      password: '',
      email: '',
      surname: '',
      name: '',
      passengers: [],
      trips: []
    })
  }

  function openUserEditor(params: GridRowParams) {
    setIsAddNewUser(false)
    setIsShowEditUserInfo(true)
    setSelectedUser(params.row)
  }

  return (
    <>
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
        <Button variant='contained' className={`${styles.Btn} ml-[2%] w-[25%] flex items-center`} onClick={addNewUser}>Добавить пользователя<img src="/icons8-плюс-32.png" className={'ml-3 pb-[2px]'} alt="" width={20} /></Button>
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
          onRowClick={(params) => openUserEditor(params)}
        />
      </Box>
    </>
  )
}

export default UsersManagement