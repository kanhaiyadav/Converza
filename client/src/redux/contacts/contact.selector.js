import { createSelector } from "@reduxjs/toolkit";

const selectContactsSlice = (state) => state.contacts;

export const selectContacts = createSelector(
    [selectContactsSlice],
    (contactSlice) => contactSlice.contacts
);

export const selectContact = (id) => createSelector(
    [selectContacts],
    (contacts) => contacts[id]
);

export const selectMessages = (roomId) => createSelector(
    [selectContacts],
    (contacts) => {
        if (!contacts[roomId].room.readMessages)
            return [];
        else
            return Object.values(contacts[roomId].room.readMessages);
    }
);

export const selectUnreadMessages = (roomId) => createSelector(
    [selectContacts],
    (contacts) => {
        if (!contacts[roomId].room.unreadMessages)
            return [];
        else
            return Object.values(contacts[roomId].room.unreadMessages);
    }
);