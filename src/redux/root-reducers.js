import { combineReducers } from "@reduxjs/toolkit";
import contactsSlice from "./contacts/contacts.slice";


const rootReducer = combineReducers({
    contacts: contactsSlice
});


export default rootReducer;