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

const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        setFrom: (state, action: PayloadAction<string>) => {
            state.from = action.payload;
        },
        setTo: (state, action: PayloadAction<string>) => {
            state.to = action.payload;
        },
        setDate: (state, action: PayloadAction<string>) => {
            state.date = action.payload;
        },
        setAmount: (state, action: PayloadAction<string>) => {
            state.amount = action.payload;
        },
    },
});

export const { setFrom, setTo, setDate, setAmount } = formSlice.actions;
export default formSlice.reducer;
