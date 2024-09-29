import { createSelector } from "@reduxjs/toolkit";

const selectUserSlice = (state) => state.user;

export const selectJwt = createSelector(
    [selectUserSlice],
    (userSlice) => userSlice.jwt
);

export const selectUserInfo = createSelector(
    [selectUserSlice],
    (userSlice) => userSlice.userInfo
);

