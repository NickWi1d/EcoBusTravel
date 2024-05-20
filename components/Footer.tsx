import { Typography } from '@mui/material'
import React from 'react'

const Footer = () => {
    return (
        <div className='h-[150px] flex justify-between bg-[#d6d3d35a] items-center pl-[10%] pr-[10%]'>
            <div>
            <Typography variant='subtitle1'> Copyright © 2024</Typography>
            </div>
            <div>
                <Typography variant='h6'>
                    help@ecobus.travel
                </Typography>
                <Typography variant='subtitle1'>Круглосуточно поможем купить билет на автобус</Typography>
            </div>
        </div>
    )
}

export default Footer