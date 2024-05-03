import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface authState {
    isLoggedIn: boolean | null
    user: string | null
}

const initialState: authState = {
    isLoggedIn: null,     // true | false | null
    user: null,            // null or some user
}

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        logIn(state, action) {
            state.isLoggedIn = true
            state.user = action.payload.user
        },
        logOut(state, action) {
            state.isLoggedIn = false
            // state.user = null
        },
        dropUser(state, action) {
            state.isLoggedIn = null
            state.user = null
        },
    }
})

export const { logIn, logOut, dropUser } = authSlice.actions
export default authSlice.reducer;