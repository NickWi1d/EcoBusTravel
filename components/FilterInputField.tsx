import React from 'react'

const FilterInputField = ({ id, type, labelText, searchData}: { id: string, type: string, labelText: string, searchData: any }) => {
    return (
    
        <div className='inputSection'>
            {type == 'list' ?
                <select
                    className='requiredField'
                    typeof='text'
                    id={id}
                    value={searchData.amount}
                    required
                >
                    <option value="1">1 паcсажир</option>
                    <option value="2">2 паcсажира</option>
                    <option value="3">3 пасcажира</option>
                    <option value="4">4 пасcажира</option>
                    <option value="5">5 пасcажиров</option>

                </select> :
                <input
                    className='requiredField'
                    type={type}
                    id={id}
                    value={searchData[`${id}`]}
                    required
                />
            }
            <label htmlFor={id} id={id+'Label'} className='label-text'>{labelText}</label>
        </div>
    )
}

export default FilterInputField