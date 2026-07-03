import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    userInfo: {},
    jwt: "",
}

export const signup = createAsyncThunk('user/signup', async (data) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URI}/api/v1/user/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (response.ok) {
            const data = await response.json();
            // console.log(data);
            return data;
        } else {
            const data = await response.json();
            throw new Error(data.message);
        }
    } catch (err) {
        throw err;
    }
});

export const signin = createAsyncThunk('user/signin', async (data) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URI}/api/v1/user/signin`, {
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


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {  
        logout: (state) => {
            state.userInfo = {};
            state.jwt = "";
        }
    },
    extraReducers: (builder) => {
        builder.addCase(signin.fulfilled, (state, action) => {
            state.userInfo = action.payload.data.user;
            state.jwt = action.payload.data.jwt;
        });
    }
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;