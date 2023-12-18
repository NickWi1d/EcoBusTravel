import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface authState {
    // token: string,
    isLoggedIn: boolean
    user: string | null 
    
}

const initialState: authState = {
    // token: 'NOT_LOGGED',
    isLoggedIn: false,     // null | true | false
    user: null
}

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers:{
        logIn(state, action){
            state.isLoggedIn = action.payload.isLoggedIn
            state.user = action.payload.user
        },  
        logOut(state, action){
            state.isLoggedIn = action.payload.isLoggedIn
            state.user = null
        }
    }
})

export const {logIn, logOut} = authSlice.actions
export default authSlice.reducer;