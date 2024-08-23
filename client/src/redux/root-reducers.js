import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "./user/user.slice";

import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
    user: userSlice
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer ;