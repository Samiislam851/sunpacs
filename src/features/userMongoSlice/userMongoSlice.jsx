import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";




export const getUserMongoData = createAsyncThunk('mongoUserData/getUserMongoData', async (email) => {

    const res = axios.get(axios.get(`users/${email}`))
    return res.data

})





const userMongoSlice = createSlice({
    name: 'mongoUserData',
    initialState: {
        isLoading: false,
        userMongoData: {},
        error: null
    },
    extraReducers: (builder) => {
        builder.addCase(getUserMongoData.pending, (state) => {
            state.isLoading = true;

        })
        builder.addCase(getUserMongoData.fulfilled, (state, action) => {
            state.isLoading = false;
            state.userMongoData = action.payload;
        })
        builder.addCase(getUserMongoData.rejected, (state,action) => {
            state.isLoading = false;
            state.error = action.error.message
        })
    }
})

export default userMongoSlice.reducer