import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    contacts: [],
}

export const getContacts = createAsyncThunk('contacts/getContacts', async (id) => {
    try {
        const response = await fetch(`http://localhost:3000/api/v1/user/contacts/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            const data = await response.json();
            throw new Error(data.message);
        }
    } catch (err) {
        throw err;
    }
});

export const newContact = createAsyncThunk('contacts/newContact', async (data) => {
    try {
        const response = await fetch(`http://localhost:3000/api/v1/user/newContact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            const data = await response.json();
            throw new Error(data.message);
        }
    } catch (err) {
        throw err;
    }
});

const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
        addContact: (state, action) => {
            state.contacts.push(action.payload);
        },
        updateContact: (state, action) => {
            const index = state.contacts.findIndex(contact => contact.room._id === action.payload._id);
            if (index !== -1) {
                state.contacts[index].room.lastMessage = action.payload.message;
            }
        },
        incUnreadMessagesCount: (state, action) => {
            const index = state.contacts.findIndex(contact => contact.room._id === action.payload);
            if (index !== -1) {
                console.log("Incrementing unread messages count");
                state.contacts[index].room.unreadMessagesCount += 1;
            }
        },
        resetUnreadMessagesCount: (state, action) => {
            const index = state.contacts.findIndex(contact => contact.room._id === action.payload);
            if (index !== -1) {
                state.contacts[index].room.unreadMessagesCount = 0;
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getContacts.fulfilled, (state, action) => {
            state.contacts = action.payload.data.contacts;
        });
        builder.addCase(newContact.fulfilled, (state, action) => {
            state.contacts.push(action.payload.data.contact);
        })
    }
});

export const { addContact, updateContact, incUnreadMessagesCount, resetUnreadMessagesCount } = contactsSlice.actions;

export default contactsSlice.reducer;