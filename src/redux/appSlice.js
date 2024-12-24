import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
    name: "app",
    initialState: {
        open: false,
        selectedMail: null,
        searchText: "",
        emails: [], // Initialized as an empty array
        authUser: null,
    },
    reducers: {
        setOpen: (state, action) => {
            state.open = action.payload;
        },
        setSelectedMail: (state, action) => {
            state.selectedMail = action.payload;
        },
        setSearchText: (state, action) => {
            state.searchText = action.payload;
        },
        setEmails: (state, action) => {
            const serializedEmails = action.payload.map((email) => ({
                ...email,
                createdAt: email.createdAt?.toDate ? email.createdAt.toDate() : email.createdAt,
            }));
            state.emails = serializedEmails; // Replace old emails with new ones
        },
        
        setAuthUser: (state, action) => {
            console.log("Setting authUser:", action.payload); // Debugging log
            state.authUser = action.payload;
        },
        clearState: (state) => {
            state.open = false;
            state.selectedMail = null;
            state.searchText = "";
            state.emails = [];
            state.authUser = null;
        },
    },
});

export const {
    setOpen,
    setSelectedMail,
    setSearchText,
    setEmails,
    setAuthUser,
    clearState,
} = appSlice.actions;

export default appSlice.reducer;
