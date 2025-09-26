import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "./user/user.slice";
import chatSlice from "./chat/chat.slice";

import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";

const appReducer = combineReducers({
    user: userSlice,
    chat: chatSlice
});

const rootReducer = (state, action) => {
    if (action.type === 'LOGOUT') {
        state = undefined;  // Reset the state to initial state
    }
    return appReducer(state, action);
};

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer ;