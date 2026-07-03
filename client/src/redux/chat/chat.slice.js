import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    chats: [],
    loading: false,
    error: null,
    unreadChats: [],
    activeChat: null,
};

export const fetchChats = createAsyncThunk(
    'chat/fetchChats',
    async (userId, { dispatch, getState }) => {
        const jwt = getState().user.jwt;
        const response = await fetch(`${process.env.REACT_APP_SERVER_URI}/api/v1/chats/${userId}`, {
            headers: {
                Authorization: jwt,
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch chats');
        }
        const resJson = await response.json();
        dispatch(setChats({ chats: resJson.data, currentUserId: userId }));

    }
);

export const deleteChat = createAsyncThunk(
    'chat/deleteChat',
    async (chatId, { dispatch, getState }) => {
        const jwt = getState().user.jwt;
        const response = await fetch(`${process.env.REACT_APP_SERVER_URI}/api/v1/chats/${chatId}`, {
            method: 'DELETE',
            headers: {
                Authorization: jwt,
            },
        });
        if (!response.ok) {
            throw new Error('Failed to delete chat');
        }
        dispatch(removeChat(chatId));
        return chatId;
    }
);

export const toggleBlockChat = createAsyncThunk(
    'chat/toggleBlockChat',
    async (chatId, { dispatch, getState }) => {
        const jwt = getState().user.jwt;
        const response = await fetch(`${process.env.REACT_APP_SERVER_URI}/api/v1/chats/${chatId}/block`, {
            method: 'PATCH',
            headers: {
                Authorization: jwt,
            },
        });
        if (!response.ok) {
            throw new Error('Failed to update block status');
        }
        const resJson = await response.json();
        dispatch(setOneChat(resJson.data));
        return resJson.data;
    }
);

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        setChats: (state, action) => {
            state.chats = action.payload.chats;
            action.payload.chats.forEach((chat) => {
                if (chat.unreadCount > 0 && chat.lastMessage?.sender !== action.payload.currentUserId) {
                    if (!state.unreadChats.includes(chat._id)) {
                        state.unreadChats.push(chat._id);
                    }
                }
            });
        },
        setOneChat: (state, action) => {
            const chatIndex = state.chats.findIndex((chat) => chat._id === action.payload._id);
            if (chatIndex !== -1) {
                state.chats[chatIndex] = action.payload;
            } else {
                state.chats.push(action.payload);
            }
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        resetChatUnreadCount: (state, action) => {
            const chatIndex = state.chats.findIndex((chat) => chat._id === action.payload);
            if (chatIndex !== -1) {
                state.chats[chatIndex].unreadCount = 0; // Reset unread count for the selected chat
            }
        },
        increamentChatUnreadCount: (state, action) => {
            const chatIndex = state.chats.findIndex((chat) => chat._id === action.payload);
            if (chatIndex !== -1) {
                state.chats[chatIndex].unreadCount = (state.chats[chatIndex].unreadCount || 0) + 1;
            }
        },
        updateChatLastMessage: (state, action) => {
            const { chat, sender, content, timestamp } = action.payload;
            const chatIndex = state.chats.findIndex((chatObj) => chatObj._id === chat);
            if (chatIndex !== -1) {
                state.chats[chatIndex].lastMessage = {
                    sender,
                    content,
                    timestamp: timestamp || new Date().toISOString()
                };
            }
        },
        updateUnreadChats: (state, action) => {
            const chatId = action.payload;
            if (!state.unreadChats.includes(chatId)) {
                state.unreadChats.push(chatId);
            }
        },
        removeUnreadChat: (state, action) => {
            const chatId = action.payload;
            state.unreadChats = state.unreadChats.filter(id => id !== chatId);
        },
        removeChat: (state, action) => {
            const chatId = action.payload;
            state.chats = state.chats.filter(chat => chat._id !== chatId);
            state.unreadChats = state.unreadChats.filter(id => id !== chatId);
        },
        setActiveChat: (state, action) => {
            state.activeChat = action.payload;
        }
    },
});

export const { setChats, setOneChat, setLoading, setError, resetChatUnreadCount, increamentChatUnreadCount, updateChatLastMessage, updateUnreadChats, removeUnreadChat, removeChat, setActiveChat } = chatSlice.actions;

export default chatSlice.reducer;