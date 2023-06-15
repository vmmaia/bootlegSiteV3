import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import bootlegsSlice from '../slices/bootlegsSlice';
import wishlistSlice from '../slices/wishlistSlice';
import tradersSlice from '../slices/tradersSlice';
import comparerSlice from '../slices/comparerSlice';
import ratiosSlice from '../slices/ratiosSlice';
import infoSlice from '../slices/infoSlice';

export default configureStore({
    reducer: {
        bootlegs: bootlegsSlice,
        wishlist: wishlistSlice,
        traders: tradersSlice,
        comparer: comparerSlice,
        ratios: ratiosSlice,
        info: infoSlice,
    },
    middleware: [thunk],
});
