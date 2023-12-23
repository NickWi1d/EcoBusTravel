import {getData} from '@/redux/searchResultsSlice'

export const getDateFromDB = async (dispatch:any, filterData:object) => {
    try {
        const response = await fetch('/api/BusTrips',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }, 
            body: JSON.stringify(filterData)
        });
        if (!response.ok) {
            throw new Error(`Request failed with status: ${response.status}`);
          }
        const data = await response.json();
        console.log(data.busTrips);
        // dispatch(getData(data.busTrips))
        return data.busTrips
    } catch (error) {
        console.error('Error fetching bus trips:', error);
    }
};

export const handleSaveData = async () => {
    const response = await fetch('/api/BusTrips', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ info: 'test', user: 'NickWild' }),
    });
};
