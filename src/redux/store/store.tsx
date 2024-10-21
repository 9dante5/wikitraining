import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "../slices/userSlice";
import ejercicioSlice from "../slices/ejercicioSlice"
import trainerSlice from "../slices/trainerSlice"
import adminSlice from "../slices/adminSlice"

const store = configureStore({
    reducer: combineReducers({
        user: userSlice,
        ejercicio: ejercicioSlice,
        trainer: trainerSlice,
        admin: adminSlice,
    }),
    devTools: process.env.NODE_ENV === 'development',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch

export default store;