import {
  DATA_LOAD_BOOTLEGS,
  DATA_LOAD_INFO,
  DATA_LOAD_TRADERS,
  DATA_LOAD_WISHLIST,
  DATA_LOAD_RATIOS,
  DATA_FILTER_SHOWS
} from '../actions/actionTypes';

const initialState = {
  loadingBootlegs: true,
  bootlegs: [],
  filteredBootlegs: [],
  isFiltered: false,
  wishlist: [],
  traders: [],
  stats: {},
  ratios: {},
  info: { tradingStatus: 'Open for trade', email: 'tafnwin@gmail.com' }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case DATA_LOAD_BOOTLEGS:
      return {
        ...state,
        bootlegs: action.payload.bootlegs,
        stats: { ...action.payload.stats },
        filteredBootlegs: action.payload.bootlegs,
        loadingBootlegs: false
      };
    case DATA_LOAD_INFO:
      return {
        ...state,
        info: action.payload
      };
    case DATA_LOAD_TRADERS:
      return {
        ...state,
        traders: action.payload
      };
    case DATA_LOAD_WISHLIST:
      return {
        ...state,
        wishlist: action.payload
      };
    case DATA_LOAD_RATIOS:
      return {
        ...state,
        ratios: action.payload
      };
    case DATA_FILTER_SHOWS:
      return {
        ...state,
        filteredBootlegs: action.payload.shows,
        isFiltered: action.payload.isFiltered
      };
    default:
      return state;
  }
};

export default reducer;
