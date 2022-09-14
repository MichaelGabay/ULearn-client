import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import cartReducer from "./features/cartSlice"
import wishListReducer from "./features/wishListSlice"
import myLearningReducer from "./features/myLearningSlice";
const myStore = configureStore({
    reducer: {
        userReducer,
        cartReducer,
        wishListReducer,
        myLearningReducer
    }
});

export default myStore;