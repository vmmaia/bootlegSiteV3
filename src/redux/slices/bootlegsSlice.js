import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    bootlegs: [],
    stats: {},
};

export const bootlegsSlice = createSlice({
    name: 'bootlegs',
    initialState: { ...initialState },
    reducers: {
        add: (state, action) => {
            state.bootlegs = action.payload.bootlegs;
            state.stats = action.payload.stats;
        },
    },
});

export const { add } = bootlegsSlice.actions;
export default bootlegsSlice.reducer;
