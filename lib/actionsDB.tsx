import { getData } from '@/redux/searchResultsSlice'
import axios, { AxiosError } from 'axios';

interface filterDataType {
    from?: string,
    to?: string,
    date?: string,
    amount?: string,
    time?: string,
    bottomPrice?: string,
    topPrice?: string
}

export const GET = async (dispatch: any, filterData: filterDataType) => {
    try {
        const response = await axios.get('/api/BusTrips', { params: filterData })
        if (response.status === 200) {
            // dispatch(getData(data.busTrips))
            return response.data.busTrips
        } else {
            throw new Error(`Request failed with status: ${response.status}`);
        }
    } catch (error: any) {
        const axiosError: AxiosError = error;
        return {
            message: (axiosError.response?.data as { message: string })?.message || 'Unknown error',
        }
    }
};

export const PUT = async (_id:string, availableSeats:number) => {
    try {
        const data: Record<string, string | number> = {
            _id,
            availableSeats
        }
        const response = await axios.put('/api/BusTrips', data)
        if (response.status === 200 && response.data.message === 'TripInfo successfully updated') {
            return {
                message: 'SUCCESSFULLY_UPDATED'
            };
        } else if(response.status === 200 && response.data.message === 'No changes made to the user'){
            return {
                message: 'NO_CHANGES'
            };
        } else {
            throw new Error(`Updation failed: ${response.data.message}`);
        }
    } catch (error: any) {
        const axiosError: AxiosError = error;
        return {
            message: (axiosError.response?.data as { message: string })?.message || 'Unknown error',
        }
    }
};
