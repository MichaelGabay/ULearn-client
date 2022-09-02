import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import cartReducer from "./features/cartSlice"
import wishListReducer from "./features/wishListSlice"

const myStore = configureStore({
    reducer: {
        userReducer,
        cartReducer,
        wishListReducer
    }
});

export default myStore;