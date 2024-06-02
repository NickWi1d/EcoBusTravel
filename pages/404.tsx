import { Typography } from '@mui/material';
import React from 'react';

const ErrorPage = () => {
  return (
    <div className='flex flex-col items-center mt-[15%]'>
      <Typography variant='h4'>Error 404</Typography>
      <Typography variant='h6'>There isn't such a page!!!</Typography>
    </div>
  )
}

export default ErrorPage