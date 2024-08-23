import { createSelector } from "@reduxjs/toolkit";

const selectUserSlice = (state) => state.user;
const selectContactsSlice = (state) => state.contacts;

export const selectJwt = createSelector(
    [selectUserSlice],
    (userSlice) => userSlice.jwt
);

export const selectUserInfo = createSelector(
    [selectUserSlice],
    (userSlice) => userSlice.userInfo
);

export const selectContacts = createSelector(
    [selectContactsSlice],
    (contactSlice) => contactSlice.contacts
);

export const selectContact = (id) => createSelector(
    [selectContacts],
    (contacts) => contacts.find(contact => contact._id === id)
);