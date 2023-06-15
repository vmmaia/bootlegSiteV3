import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    traders: [],
};

export const tradersSlice = createSlice({
    name: 'traders',
    initialState: { ...initialState },
    reducers: {
        add: (state, action) => {
            state.traders = action.payload;
        },
    },
});

export const { add } = tradersSlice.actions;
export default tradersSlice.reducer;
