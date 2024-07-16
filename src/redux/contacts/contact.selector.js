import { createSelector } from "@reduxjs/toolkit";

const selectContacts = (state) => state.contacts;

export const selectAllContacts = createSelector(
    [selectContacts],
    (contacts) => contacts.contacts
)

export const selectContact = (contactId) => {

    return createSelector(
        [selectAllContacts],
        (contacts) => contacts.find((contact) => contact.to === contactId)
    )
}