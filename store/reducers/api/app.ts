import { ServerResponseGetUserData, ServerResponseAddUser, ServerResponseGetTripsData, ServerResponseUpDateTripInfo, ServerResponseGetAllUsers, ServerResponseAddTrip, ServerResponseGetCitiesData, ServerResponseGetBusesData, ServerResponseAddBus, ServerResponseGetFaultyTripsData } from "@/types/types"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

interface IParams {
    username?: string,
    type?: string,
    password?: string
}

interface IBody {
    username?: string,
    password?: string,
    email?:string
}



export const App = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl:'/api'
    }),
    endpoints: build => ({
        login: build.query<ServerResponseGetUserData, object>({
            query: (params:IParams) => ({
                url: `auth`,
                params: params
            })
        }),
        SignUp: build.mutation<ServerResponseAddUser, object>({
            query:(body:IBody)=>({
                url:`auth`,
                method:'POST',
                body: body
                
            })
        }),
        Delete: build.mutation<ServerResponseGetUserData, string>({
            query:(uid)=>({
                url:`auth`,
                method:'DELETE',
                params: { uid }
            })
        }),
        deletePassenger: build.mutation<ServerResponseGetUserData, object>({
            query:(body:IBody)=>({
                url:`auth`,
                method:'PUT',
                body: body
            })
        }),
        upDateUserInfo: build.mutation<ServerResponseGetUserData, object>({
            query:(body:IBody)=>({
                url:`auth`,
                method:'PUT',
                body: body
            })

        }),
        getTripsData: build.query<ServerResponseGetTripsData, object>({
            query: (params:IParams) => ({
                url: `BusTrips`,
                params: params
            })
        }),
        upDateTripInfo: build.mutation<ServerResponseUpDateTripInfo, object>({
            query:(body:IBody)=>({
                url:`BusTrips`,
                method:'PUT',
                body: body
            })
        }),
        getAllUsers: build.query<ServerResponseGetAllUsers, object>({
            query: (params:IParams) => ({
                url: `auth`,
                params: params
            })
        }),
        cancelTrip: build.mutation<ServerResponseGetUserData, string>({
            query:(uid)=>({
                url:`BusTrips`,
                method:'DELETE',
                params: { uid }
            })
        }),
        addNewTrip: build.mutation<ServerResponseAddTrip, object>({
            query:(body:IBody)=>({
                url:`BusTrips`,
                method:'POST',
                body: body
            }),
        }),
        getCites: build.query<ServerResponseGetCitiesData, object>({
            query: (params:{name:string}) => ({
                url: `Cities`,
                params: params
            })
        }),
        sendEmail: build.mutation<ServerResponseAddUser, object>({
            query:(body:IBody)=>({
                url:`send`,
                method:'POST',
                body: body 
            })
        }),
        getBuses: build.query<ServerResponseGetBusesData, object>({
            query: (params:IParams) => ({
                url: `Buses`,
                params: params
            })
        }),
        upDateBusInfo: build.mutation<ServerResponseUpDateTripInfo, object>({
            query:(body:IBody)=>({
                url:`Buses`,
                method:'PUT',
                body: body
            })
        }),
        addNewBus: build.mutation<ServerResponseAddBus, object>({
            query:(body:IBody)=>({
                url:`Buses`,
                method:'POST',
                body: body
                
            })
        }),
        dropBus: build.mutation<ServerResponseGetUserData, string>({
            query:(uid)=>({
                url:`Buses`,
                method:'DELETE',
                params: { uid }
            })
        }),
        getFaultyTrip: build.query<ServerResponseGetFaultyTripsData, object>({
            query: (params:IParams) => ({
                url: `FaultyTrips`,
                params: params
            })
        }),
        addFaultyTrip: build.mutation<ServerResponseAddBus, object>({
            query:(body:IBody)=>({
                url:`FaultyTrips`,
                method:'POST',
                body: body
                
            })
        }),
        dropFaultyTrip: build.mutation<ServerResponseGetUserData, string>({
            query:(tripId)=>({
                url:`FaultyTrips`,
                method:'DELETE',
                params: { tripId }
            })
        }),
        
    })
})

export const { 
    useLazyLoginQuery, 
    useSignUpMutation, 
    useDeleteMutation, 
    useUpDateUserInfoMutation, 
    useLazyGetTripsDataQuery, 
    useUpDateTripInfoMutation,  
    useLazyGetAllUsersQuery, 
    useDeletePassengerMutation, 
    useCancelTripMutation, 
    useAddNewTripMutation,
    useLazyGetCitesQuery,
    useSendEmailMutation,
    useLazyGetBusesQuery,
    useUpDateBusInfoMutation, 
    useAddNewBusMutation,
    useDropBusMutation,
    useLazyGetFaultyTripQuery,
    useAddFaultyTripMutation,
    useDropFaultyTripMutation
} = App