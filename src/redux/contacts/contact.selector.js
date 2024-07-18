import { createSelector } from "@reduxjs/toolkit";

const selectContacts = (state) => state.contacts;

export const selectAllContacts = createSelector(
    [selectContacts],
    (contacts) => contacts.contacts
)

export const selectContact = (contactId) => {

    return createSelector(
        [selectAllContacts],
        (contacts) => contacts.find((contact) => contact._id === contactId)
    )
}

export const selectJwt = createSelector(
    [selectContacts],
    (contacts) => contacts.jwt
);

export const selectUser = createSelector(
    [selectContacts],
    (contacts) => contacts.user
);