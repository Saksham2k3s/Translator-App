import { configureStore } from '@reduxjs/toolkit'
import translateReducer from './translateSlice'
export const store = configureStore({
    reducer: {
       translate : translateReducer
    }
});

