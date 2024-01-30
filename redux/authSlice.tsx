import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface authState {
    isLoggedIn: boolean
    user: string | null

    
}

const initialState: authState = {
    isLoggedIn: false,     // true | false
    user: null
}

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers:{
        logIn(state, action){
            state.isLoggedIn = true
            state.user = action.payload.user
        },  
        logOut(state, action){
            state.isLoggedIn = false
            state.user = null
        }
    }
})

export const {logIn, logOut} = authSlice.actions
export default authSlice.reducer;