import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GET_MY_LERNING_ROUTE } from "../../constant/url";
import { apiGet } from "../../services/services";


export const getMyLearning = createAsyncThunk(
    "myLearning,getMyLearning", async (dispatch, getState) => {
        let { data } = await apiGet(GET_MY_LERNING_ROUTE)
        data?.forEach(item => item.isMoreOpen = false)
        return data
    }
);

const myLearningSlice = createSlice({
    name: "myLearning",
    initialState: {
        myLearning: null,
        status: null
    }
    ,
    extraReducers(builder) {
        builder
            .addCase(getMyLearning.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(getMyLearning.fulfilled, (state, action) => {
                state.myLearning = action.payload;
            })
            .addCase(getMyLearning.rejected, (state, action) => {
                state.status = "failed";
            })
    },
    reducers: {
        updateMoreOpen: (state, action) => {
            state.myLearning.forEach(item => {
                if (item.short_id == action.payload.shortId){
                    if(item.isMoreOpen==true)item.isMoreOpen = false;
                    else item.isMoreOpen = true;
                } 
                else item.isMoreOpen = false
            })
        },
        closeMoreOpen: (state, action) => {
            state.myLearning.forEach(item => {
                item.isMoreOpen = false
            })
        },
    }


});


export const { updateMoreOpen,closeMoreOpen } = myLearningSlice.actions;

export default myLearningSlice.reducer;