import { Typography } from '@mui/material'
import React from 'react'
import CurrencyRubleIcon from '@mui/icons-material/CurrencyRuble';
import SpeedOutlinedIcon from '@mui/icons-material/SpeedOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';

const About = () => {
    return (
        <div className='w-[100%] h-[300px] flex justify-center'>
            <div className='flex justify-between w-[80%] mt-[5%]'>
                <div className='flex flex-col w-[30%]' >
                    <CurrencyRubleIcon sx={{marginBottom:'3%'}}></CurrencyRubleIcon>
                    <Typography variant='h6' gutterBottom sx={{ color: 'hsla(189, 89%, 17%, 1)', fontWeight: 'bold' }}>Ваша поездка по низкой цене</Typography>
                    <Typography variant='subtitle2' gutterBottom sx={{ color: 'hsla(189, 13%, 50%, 1)' }}>
                        Куда бы вы ни собирались, на автобусе или с попутчиками, вы сможете найти свою идеальную поездку среди множества маршрутов и доехать по самой низкой цене.
                    </Typography>
                </div>
                <div className='flex flex-col w-[30%]'>
                    <VerifiedUserOutlinedIcon sx={{marginBottom:'3%'}}></VerifiedUserOutlinedIcon>
                    <Typography variant='h6' gutterBottom sx={{ color: 'hsla(189, 89%, 17%, 1)', fontWeight: 'bold' }}>Доверяйте своим попутчикам</Typography>
                    <Typography variant='subtitle2' gutterBottom sx={{ color: 'hsla(189, 13%, 50%, 1)' }}>
                    Мы стараемся узнать ваших будущих попутчиков и автобусных перевозчиков как можно лучше. Мы проверяем отзывы, профили и паспортные данные попутчиков, чтобы вы знали, с кем поедете.
                    </Typography>
                </div>
                <div className='flex flex-col w-[30%]'>
                    <SpeedOutlinedIcon sx={{marginBottom:'3%'}}></SpeedOutlinedIcon>
                    <Typography variant='h6' gutterBottom sx={{ color: 'hsla(189, 89%, 17%, 1)', fontWeight: 'bold' }}>В дорогу за пару кликов!</Typography>
                    <Typography variant='subtitle2' gutterBottom sx={{ color: 'hsla(189, 13%, 50%, 1)' }}>
                     Забронировать поездку проще простого. В нашем приложении легко разобраться: мощный алгоритм за пару минут найдет водителя поблизости, и вам останется нажать пару кнопок для брони.
                    </Typography>
                </div>
            </div>
        </div>
    )
}

export default About