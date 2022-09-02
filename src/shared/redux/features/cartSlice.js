import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ADD_TO_MY_CART_ROUTE, BUY_ALL_THE_CART_ROUTE, DELETE_ALL_CART_ROUTE, GET_MY_CART_ROUTE } from "../../constant/url";
import { apiDelete, apiGet, apiPost } from "../../services/services";

export const getMyCart = createAsyncThunk(
    "cart,getMyCart", async (params, getState) => {
        let { data } = await apiGet(GET_MY_CART_ROUTE)
        return data
    }
);
export const addToMyCart = createAsyncThunk(
    "cart,addToMyCart", async (params, getState) => {
        const { data } = await apiPost(ADD_TO_MY_CART_ROUTE + `?courseShortId=${params.shortId}`)
        return data
    }
);
export const deleteAllCart = createAsyncThunk(
    "cart,deleteAllCart", async (params, getState) => {
        const { data } = await apiDelete(DELETE_ALL_CART_ROUTE)
        return data
    }
);
export const buyAllCart = createAsyncThunk(
    "cart,buyAllCart", async (params, getState) => {
        const { data } = await apiPost(BUY_ALL_THE_CART_ROUTE)
        return data
    }
);
const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: null,
        status: null,
        isCartOpen: false
    },
    reducers: {
        setIsCartOpen: (state, action) => {
            state.isCartOpen = action.payload
        }
    },
    extraReducers(builder) {
        builder
            //get cart
            .addCase(getMyCart.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(getMyCart.fulfilled, (state, action) => {
                state.status = "success";
                state.cart = action.payload;
            })
            .addCase(getMyCart.rejected, (state, action) => {
                state.status = "failed";
            })
            //add to cart
            .addCase(addToMyCart.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(addToMyCart.fulfilled, (state, action) => {
                state.status = "success";
                if (action.payload.msg == "cart updated")
                    state.cart = action.payload.myCart;
            })
            .addCase(addToMyCart.rejected, (state, action) => {
                state.status = "failed";
            })
            //delete all cart
            .addCase(deleteAllCart.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(deleteAllCart.fulfilled, (state, action) => {
                state.status = "success";
                if (action.payload?.msg == "All courses in cart deleted") {
                    state.cart = [];
                }
            })
            .addCase(deleteAllCart.rejected, (state, action) => {
                state.status = "failed";
            })
            //buy all the cart
            .addCase(buyAllCart.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(buyAllCart.fulfilled, (state, action) => {
                state.status = "success";
                if (action.payload.msg == "buying all the cart") {
                    state.cart = []
                }
            })
            .addCase(buyAllCart.rejected, (state, action) => {
                state.status = "failed";
            })
    }
});

export const { setIsCartOpen } = cartSlice.actions
export default cartSlice.reducer