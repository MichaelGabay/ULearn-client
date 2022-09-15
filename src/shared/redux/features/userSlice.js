import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ADD_RATING_ROUTE, GET_USER_INFO_ROUTE } from "../../constant/url";
import { apiGet, apiPost } from "../../services/services";

export const getUser = createAsyncThunk(
    "user,getUser", async (dispatch, getState) => {
        let { data } = await apiGet(GET_USER_INFO_ROUTE)
        return data
    }
);
export const addRating = createAsyncThunk(
    "user,addRating", async ({ shortId, value }, getState) => {
        await apiPost(ADD_RATING_ROUTE + `?coursShortId=${shortId}&rating=${value}`)
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
        },
        updateAddRating: (state, action) => {
            state.user.myLearning = action.payload;
        }
    }


});




export const { updateAddRating,logout } = userSlice.actions;

export default userSlice.reducer;