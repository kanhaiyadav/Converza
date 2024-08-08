import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "./user/user.slice";

const rootReducer = combineReducers({
    user: userSlice
});


export default rootReducer;