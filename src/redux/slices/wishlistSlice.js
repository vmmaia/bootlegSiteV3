import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    shows: [],
};

export const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState: { ...initialState },
    reducers: {
        add: (state, action) => {
            state.shows = action.payload;
        },
    },
});

export const { add } = wishlistSlice.actions;
export default wishlistSlice.reducer;
