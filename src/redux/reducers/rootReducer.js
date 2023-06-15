import { combineReducers } from 'redux';

import dataReducer from './dataReducer';
import comparerReducer from './comparerReducer';

export default combineReducers({
    data: dataReducer,
    comparer: comparerReducer,
});
