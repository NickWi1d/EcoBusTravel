'use client';
import React, { useState } from 'react'
import Filter from '@/components/Filter'
import { RootState } from '@/redux/store'
import { useSelector } from 'react-redux';



const SearchResults = () => {
	const info = useSelector((state: RootState) => state.searchParams);
  return (
    <div>
        {/* <Filter/>	 */}
		Откуда: {info.from}
		Куда: {info.to}
		Дата: {info.date}
		Кол-во человек: {info.amount}
    </div>
  )
}

export default SearchResults