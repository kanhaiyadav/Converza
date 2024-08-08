import { createSelector } from "@reduxjs/toolkit";

const selectUserSlice = (state) => state.user;

export const selectChatId = createSelector(
    [selectUserSlice],
    (userSlice) => userSlice.chat_id
)


export const selectContacts = createSelector(
    [selectUserSlice],
    (userSlice) => userSlice.contacts
)

export const selectContact = (contactId) => {

    return createSelector(
        [selectContacts],
        (contacts) => contacts.find((contact) => contact._id === contactId)
    )
}

export const selectJwt = createSelector(
    [selectUserSlice],
    (userSlice) => userSlice.jwt
);

export const selectUserInfo = createSelector(
    [selectUserSlice],
    (userSlice) => userSlice.userInfo
);