import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormState {
    arrays: object[]
}
const initialState = {
    arrays: []
}

const searchResultsSlice = createSlice({
    name: 'searchResults',
    initialState,
    reducers: {
        getData(state, action) {
            // action.payload.map((obj:object) => state.arrays.push(obj));
        }
    },
});
export const { getData } = searchResultsSlice.actions
export default searchResultsSlice.reducer;
