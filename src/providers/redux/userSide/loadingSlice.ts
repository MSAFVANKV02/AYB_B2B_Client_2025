import { PayloadAction, createSlice } from "@reduxjs/toolkit"



const initialState:boolean = false


export const loadingSlice = createSlice({
    name:"loading",
    initialState:initialState,
    reducers:{
            setLoadingState:(_,action:PayloadAction<boolean>) =>{
                return action.payload
            }
    }
})

export const {setLoadingState} = loadingSlice.actions;
export default loadingSlice.reducer;