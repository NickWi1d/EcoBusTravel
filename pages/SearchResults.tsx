'use client';
import React, { useState } from 'react'
import Filter from '@/components/Filter'
import { useDispatch } from 'react-redux';
import { addTodo } from '../redux/todoSlice';


const SearchResults = () => {
  const [value, setValue] = useState('');
	const dispatch = useDispatch();

	const onSubmit = (event:any) => {
		event.preventDefault();
		if (value) {
			dispatch(
				addTodo({
					title: value,
				})
			);
		}
	};
  return (
    <div>
        {/* <Filter/> */}
        <form onSubmit={onSubmit} className='form-inline mt-3 mb-3'>
			<label className='sr-only'>Name</label>
			<input
				type='text'
				className='form-control mb-2 mr-sm-2'
				placeholder='Add todo...'
				value={value}
				onChange={(event) => setValue(event.target.value)}
			></input>

			<button type='submit' className='btn btn-primary mb-2'>
				Submit
			</button>
		</form>
    </div>
  )
}

export default SearchResults