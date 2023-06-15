import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    ratios: [],
};

export const ratiosSlice = createSlice({
    name: 'ratios',
    initialState: { ...initialState },
    reducers: {
        add: (state, action) => {
            state.ratios = action.payload;
        },
    },
});

export const { add } = ratiosSlice.actions;
export default ratiosSlice.reducer;
