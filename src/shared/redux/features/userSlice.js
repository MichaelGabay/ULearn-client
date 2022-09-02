import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GET_USER_INFO_ROUTE } from "../../constant/url";
import { apiGet } from "../../services/services";

export const getUser = createAsyncThunk(
    "user,getUser", async (dispatch, getState) => {
        let { data } = await apiGet(GET_USER_INFO_ROUTE)
        return data
    }
);


const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        status: null
    }
    ,
    extraReducers(builder) {
        builder
            .addCase(getUser.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.status = "success";
                if (action.payload.err) {
                    state.status = "failed";
                    state.user = null;
                }
                else {
                    state.user = { ...action.payload };
                }
            })
            .addCase(getUser.rejected, (state, action) => {
                state.status = "failed";
            })
    },
    reducers: {
        logout: (state, action) => {
            state.user = null
        }
    }


});




export const { logout } = userSlice.actions;

export default userSlice.reducer;