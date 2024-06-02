import { Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'

const help = () => {
  return (
    <div>
      <Typography variant='h5'>Добро подаловать на кратку инструкицю по сайту</Typography>
      <Typography variant="subtitle1">На главной странице находится форма поиска рейсов, введя необходимую информацию можно быстро и просто получить подборку по заданным результатам</Typography>
      <Image src={'/localhost_3000_.png'} alt='' width={1080} height={1000}></Image>

    </div>
  )
}

export default help