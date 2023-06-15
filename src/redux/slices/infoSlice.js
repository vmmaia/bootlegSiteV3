import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    info: {},
};

export const infoSlice = createSlice({
    name: 'info',
    initialState: { ...initialState },
    reducers: {
        add: (state, action) => {
            state.info = action.payload;
        },
    },
});

export const { add } = infoSlice.actions;
export default infoSlice.reducer;
