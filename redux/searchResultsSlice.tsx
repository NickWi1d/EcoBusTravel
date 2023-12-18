import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface FormState {
//     date?: string,
//     driver?: string,
//     finishTime?: string,
//     from?: string,
//     price?: number,
//     time?: string,
//     to?: string,
//     tripID?: number,
//     type?: string,
//     availableSeats?: number,
//     travelTime?: string,
//     reservedSeats?: number,
//     seats?:{
//         1:{
//             available:boolean,
//             owner: string | null 
//         },
//         2:{
//             available:boolean,
//             owner: string | null
//         },
//         3:{
//             available:boolean,
//             owner: string | null
//         },
//         4:{
//             available:boolean,
//             owner: string | null
//         },
//         5:{
//             available:boolean,
//             owner: string | null
//         },
//         6:{
//             available:boolean,
//             owner: string | null
//         },
//         7:{
//             available:boolean,
//             owner: string | null
//         },
//         8:{
//             available:boolean,
//             owner: string | null
//         },
//         9:{
//             available:boolean,
//             owner: string | null
//         },
//         10:{
//             available:boolean,
//             owner: string | null
//         },
//         11:{
//             available:boolean,
//             owner: string | null
//         },
//         12:{
//             available:boolean,
//             owner: string | null
//         },
//         13:{
//             available:boolean,
//             owner: string | null
//         },
//         14:{
//             available:boolean,
//             owner: string | null
//         },
//         15:{
//             available:boolean,
//             owner: string | null
//         },
//         16:{
//             available:boolean,
//             owner: string | null
//         },
//         17:{
//             available:boolean,
//             owner: string | null
//         },
//         18:{
//             available:boolean,
//             owner: string | null
//         },
//         19:{
//             available:boolean,
//             owner: string | null
//         },
//         20:{
//             available:boolean,
//             owner: string | null
//         },
//         21:{
//             available:boolean,
//             owner: string | null
//         },
//         22:{
//             available:boolean,
//             owner: string | null
//         },
//         23:{
//             available:boolean,
//             owner: string | null
//         },
//         24:{
//             available:boolean,
//             owner: string | null
//         },
//         25:{
//             available:boolean,
//             owner: string | null
//         },
//         26:{
//             available:boolean,
//             owner: string | null
//         },
//         27:{
//             available:boolean,
//             owner: string | null
//         },
//         28:{
//             available:boolean,
//             owner: string | null
//         },
//         29:{
//             available:boolean,
//             owner: string | null
//         },
//         30:{
//             available:boolean,
//             owner: string | null
//         },
//         31:{
//             available:boolean,
//             owner: string | null
//         },
//         32:{
//             available:boolean,
//             owner: string | null
//         },
//         33:{
//             available:boolean,
//             owner: string | null
//         },
//         34:{
//             available:boolean,
//             owner: string | null
//         },
//         35:{
//             available:boolean,
//             owner: string | null
//         },
//         36:{
//             available:boolean,
//             owner: string | null
//         },
//         37:{
//             available:boolean,
//             owner: string | null
//         },
//         38:{
//             available:boolean,
//             owner: string | null
//         },
//         39:{
//             available:boolean,
//             owner: string | null
//         },
//         40:{
//             available:boolean,
//             owner: string | null
//         },
//         41:{
//             available:boolean,
//             owner: string | null
//         },
//         42:{
//             available:boolean,
//             owner: string | null
//         },
//         43:{
//             available:boolean,
//             owner: string | null
//         },
//         44:{
//             available:boolean,
//             owner: string | null
//         },
//         45:{
//             available:boolean,
//             owner: string | null
//         },
//         46:{
//             available:boolean,
//             owner: string | null
//         },
//         47:{
//             available:boolean,
//             owner: string | null
//         },
//         48:{
//             available:boolean,
//             owner: string | null
//         },
//         49:{
//             available:boolean,
//             owner: string | null
//         },
//         50:{
//             available:boolean,
//             owner: string | null 
//         },

//     }
// }
// const initialState: FormState = {
//     date: '',
//     driver: '',
//     finishTime: '',
//     from: '',
//     price: 0,
//     time: '',
//     to: '',
//     tripID: 0,
//     type: '',
//     availableSeats: 0,
//     travelTime: '',
//     reservedSeats: 0,
//     seats:{
//         1:{
//             available:true,
//             owner: null
//         },
//         2:{
//             available:true,
//             owner: null
//         },
//         3:{
//             available:true,
//             owner: null
//         },
//         4:{
//             available:true,
//             owner: null
//         },
//         5:{
//             available:true,
//             owner: null
//         },
//         6:{
//             available:true,
//             owner: null
//         },
//         7:{
//             available:true,
//             owner: null
//         },
//         8:{
//             available:true,
//             owner: null
//         },
//         9:{
//             available:true,
//             owner: null
//         },
//         10:{
//             available:true,
//             owner: null
//         },
//         11:{
//             available:true,
//             owner: null
//         },
//         12:{
//             available:true,
//             owner: null
//         },
//         13:{
//             available:true,
//             owner: null
//         },
//         14:{
//             available:true,
//             owner: null
//         },
//         15:{
//             available:true,
//             owner: null
//         },
//         16:{
//             available:true,
//             owner: null
//         },
//         17:{
//             available:true,
//             owner: null
//         },
//         18:{
//             available:true,
//             owner: null
//         },
//         19:{
//             available:true,
//             owner: null
//         },
//         20:{
//             available:true,
//             owner: null
//         },
//         21:{
//             available:true,
//             owner: null
//         },
//         22:{
//             available:true,
//             owner: null
//         },
//         23:{
//             available:true,
//             owner: null
//         },
//         24:{
//             available:true,
//             owner: null
//         },
//         25:{
//             available:true,
//             owner: null
//         },
//         26:{
//             available:true,
//             owner: null
//         },
//         27:{
//             available:true,
//             owner: null
//         },
//         28:{
//             available:true,
//             owner: null
//         },
//         29:{
//             available:true,
//             owner: null
//         },
//         30:{
//             available:true,
//             owner: null
//         },
//         31:{
//             available:true,
//             owner: null
//         },
//         32:{
//             available:true,
//             owner: null
//         },
//         33:{
//             available:true,
//             owner: null
//         },
//         34:{
//             available:true,
//             owner: null
//         },
//         35:{
//             available:true,
//             owner: null
//         },
//         36:{
//             available:true,
//             owner: null
//         },
//         37:{
//             available:true,
//             owner: null
//         },
//         38:{
//             available:true,
//             owner: null
//         },
//         39:{
//             available:true,
//             owner: null
//         },
//         40:{
//             available:true,
//             owner: null
//         },
//         41:{
//             available:true,
//             owner: null
//         },
//         42:{
//             available:true,
//             owner: null
//         },
//         43:{
//             available:true,
//             owner: null
//         },
//         44:{
//             available:true,
//             owner: null
//         },
//         45:{
//             available:true,
//             owner: null
//         },
//         46:{
//             available:true,
//             owner: null
//         },
//         47:{
//             available:true,
//             owner: null
//         },
//         48:{
//             available:true,
//             owner: null
//         },
//         49:{
//             available:true,
//             owner: null
//         },
//         50:{
//             available:true,
//             owner: null
//         },

// }
// }
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
