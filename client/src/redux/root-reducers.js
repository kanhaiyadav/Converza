import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "./user/user.slice";
import contactsSlice from "./contacts/contacts.slice";

import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
    user: userSlice,
    contacts: contactsSlice
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user', 'contacts']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer ;