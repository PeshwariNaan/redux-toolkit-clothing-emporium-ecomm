import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import userReducer from '../features/user/userSlice'
import categoryReducer from '../features/categories/categorySlice'
import cartReducer from '../features/cart/cartSlice'
// import { persistStore, persistReducer } from "redux-persist";

const reducer = {
    user: userReducer, 
    category: categoryReducer,
    cart: cartReducer, 
}

export const store = configureStore({
    reducer,
    middleware: [logger],
    //devTools: process.env.NODE_ENV !== 'production',
})