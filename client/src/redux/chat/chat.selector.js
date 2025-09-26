import { createSelector } from "@reduxjs/toolkit";

export const selectChatState = (state) => state.chat;

export const selectChats = createSelector(
    [selectChatState],
    (chat) => {
        return chat.chats
    }
);

export const selectChatById = (chatId) => createSelector(
    [selectChatState],
    (chat) => {
        return chat.chats.find((c) => c._id === chatId);
    }
);

export const selectUnreadChatsCount = createSelector(
    [selectChatState],
    (chat) => chat?.unreadChats?.length
);

export const selectLoading = createSelector(
    [selectChatState],
    (chat) => chat.loading
);

export const selectError = createSelector(
    [selectChatState],
    (chat) => chat.error
);

export const selectActiveChat = createSelector(
    [selectChatState],
    (chat) => chat.activeChat
);