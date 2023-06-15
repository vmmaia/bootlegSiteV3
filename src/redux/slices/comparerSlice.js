import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    shows: [],
};

export const comparerSlice = createSlice({
    name: 'comparer',
    initialState: { ...initialState },
    reducers: {
        addToComparer: (state, action) => {
            state.shows.push(action.payload.id);
        },
        removeFromComparer: (state, action) => {
            state.shows = state.shows.filter((showId) => showId !== action.payload.id);
        },
        resetComparer: (state) => {
            state = { ...initialState };
        },
    },
});

export const { addToComparer, removeFromComparer, resetComparer } = comparerSlice.actions;
export default comparerSlice.reducer;
