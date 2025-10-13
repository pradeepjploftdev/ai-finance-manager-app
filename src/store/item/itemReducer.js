import { createSlice } from "@reduxjs/toolkit";

import {
    addItem,
    getItems,
} from "./itemThunk";

export const initialState = {
    items: [],
    error: {},
    status: 0
};

const itemsSlice = createSlice({
    name: "items",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        // Add item
        builder.addCase(getItems.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = action.payload.statusCode;
        })
        builder.addCase(getItems.rejected, (state, action) => {
            state.error = action.payload || null;
        })

        // Add item
        builder.addCase(addItem.fulfilled, (state, action) => {
            state.status = action.payload.statusCode;
        })
        builder.addCase(addItem.rejected, (state, action) => {
            state.error = action.payload || null;
        })
    },
});

export default itemsSlice.reducer;