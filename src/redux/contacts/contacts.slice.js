import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    user: {},
    jwt: "",
    contacts: [],
};

export const create = createAsyncThunk('contacts/createOrUpdate', async (data) => {
    try {
        const response = await fetch(`http://localhost:3000/api/v1/user/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if(response.ok) {
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

export const login = createAsyncThunk('contacts/login', async (data) => {
    try {
        const response = await fetch(`http://localhost:3000/api/v1/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if(response.ok) {
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

export const update = createAsyncThunk('contacts/update', async ({ chatid, id }) => {
    try {
        const response = await fetch(`http://localhost:3000/api/v1/user/update/${chatid}/${id}`);
        if(response.ok) {
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
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(create.fulfilled, (state, action) => {
            state.user = action.payload.data.user;
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.user = action.payload.data.user;
            state.jwt = action.payload.data.jwt;
            state.contacts = action.payload.data.contacts;
        });
    }
});


export default contactsSlice.reducer;
