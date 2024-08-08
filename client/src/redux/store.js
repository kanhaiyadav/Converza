import { configureStore } from "@reduxjs/toolkit";

import rootReducer from "./root-reducers";


const store = configureStore({
    reducer: rootReducer
});


export default store;