import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage/session";
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import userSlice from './userSlice';
import adminsSlice from './adminsSlice';
import { configure } from "@testing-library/react";

const reducers = combineReducers({
    user : userSlice.reducer,
    admins : adminsSlice.reducer,
})

const persistConfig = {
    key:'root',
    storage,
    whitelist:['user']
}


const persistedReducer = persistReducer(persistConfig, reducers);



export default configureStore({
    reducer:persistedReducer,
})