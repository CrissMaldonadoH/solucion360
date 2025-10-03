import { configureStore } from "@reduxjs/toolkit";
import { authUserSlice } from "./features/authUserSlice";
import { pathSlice } from "./features/pathSlice";

const store =  configureStore({
    reducer:{
        user:authUserSlice.reducer,
        path: pathSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;