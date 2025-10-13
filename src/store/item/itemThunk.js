import { createAsyncThunk } from "@reduxjs/toolkit";

import {
    getItems as getitemsApi,
    addItem as addItemApi
} from '../../api/backend_helper'

export const getItems = createAsyncThunk(
    "item/getItems",
    async () => {
        try {
        const response = getitemsApi();
        return response;
        } catch (error) {
        return error;
        }
    }
);

export const addItem = createAsyncThunk(
    "item/addItem",
    async (event) => {
        try {
        const response = addItemApi(event);
        return response;
        } catch (error) {
        return error;
        }
    }
);