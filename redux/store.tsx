import { configureStore } from '@reduxjs/toolkit';
import formReducer from './formSlice'

const store = configureStore({
  reducer: {
    form: formReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

// const initialState = {
//   busTrips: [],
// };

// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'SET_BUS_TRIPS':
//       return {
//         ...state,
//         busTrips: action.payload,
//       };
//     default:
//       return state;
//   }
// };

// export const setBusTrips = (busTrips) => ({
//   type: 'SET_BUS_TRIPS',
//   payload: busTrips,
// });

// const store = configureStore({
//   reducer,
// });

// export default store;
