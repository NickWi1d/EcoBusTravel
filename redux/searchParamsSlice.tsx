import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormState {
    from: string;
    to: string;
    date: string;
    amount: string;
}

const initialState: FormState = {
    from: '',
    to: '',
    date: '',
    amount: '',
};

const searchParamsSlice = createSlice({
    name: 'searchParams',
    initialState,
    reducers: {
        outputData(state, action) {
            console.log(state)
            console.log(action)
            state.from = action.payload.from
            state.to = action.payload.to
            state.date = action.payload.date
            state.amount = action.payload.amount
        }
    },
});
export const {outputData} = searchParamsSlice.actions
export default searchParamsSlice.reducer;
