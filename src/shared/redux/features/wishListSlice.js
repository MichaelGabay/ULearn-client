import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ADD_TO_WISHLIST_ROUTE, GET_WISHlIST_ROUTE } from "../../constant/url";
import { apiGet,apiPost} from "../../services/services";

export const getWishList = createAsyncThunk(
  "wishList,getWishList",
  async (params, getState) => {
    let { data } = await apiGet(GET_WISHlIST_ROUTE);
    return data;
  }
);
export const addToWishList = createAsyncThunk(
  "wishList,addToWishList",
  async (params, getState) => {
    let { data } = await apiPost(ADD_TO_WISHLIST_ROUTE+"?coursShortId="+params);
    return data;
  }
);

const wishListSlice = createSlice({
  name: "wishList",
  initialState: {
    wishList: null,
    status: null,
  },
  extraReducers(builder) {
    builder
      // getWishList
      .addCase(getWishList.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getWishList.fulfilled, (state, action) => {
        state.status = "success";
        if (action.payload.err) {
          state.status = "failed";
          state.wishList = null;
        } else {
          state.wishList = action.payload;
        }
      })
      .addCase(getWishList.rejected, (state, action) => {
        state.status = "failed";
      })
      // addOrRemove from wishList

      .addCase(addToWishList.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addToWishList.fulfilled, (state, action) => {
        state.status = "success";
        if (action.payload.err) {
          state.status = "failed";
          state.wishList = null;
        } else {
          state.wishList = action.payload.wishList;
        }
      })
      .addCase(addToWishList.rejected, (state, action) => {
        state.status = "failed";
      });
  },
  reducers: {},
});

export const {} = wishListSlice.actions;

export default wishListSlice.reducer;
