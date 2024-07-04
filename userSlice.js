import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    email: "",
    uid: ""
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setEmail: (state, action) => {
            state.email = action.payload
        },

        setUid: (state, action) => {
            state.uid = action.payload
        },

        deleteUser: (state, action) => {
            state.email = ""
            state.uid = ""

        }
    },


});

export const userActions = userSlice.actions

export default userSlice.reducer