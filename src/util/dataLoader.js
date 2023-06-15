import Axios from 'axios';

import { parseBootlegs, parseInfo, parseRatios, parseTraders, parseWishlist } from './fileParser';

export const loadBootlegs = async () => {
    const file = await Axios.get(`/assets/data/bootlegs.tsv?t=${Date.now()}`);
    const data = parseBootlegs(file.data);

    return data;
};

export const loadTraders = async () => {
    const file = await Axios.get(`/assets/data/traders.tsv?t=${Date.now()}`);
    const data = parseTraders(file.data);

    return data;
};

export const loadWishlist = async () => {
    const file = await Axios.get(`/assets/data/wishlist.tsv?t=${Date.now()}`);
    const data = parseWishlist(file.data);

    return data;
};

export const loadInfo = async () => {
    const file = await Axios.get(`/assets/data/info.tsv?t=${Date.now()}`);
    const data = parseInfo(file.data);

    return data;
};

export const loadRatios = async () => {
    const file = await Axios.get(`/assets/data/ratios.tsv?t=${Date.now()}`);
    const data = parseRatios(file.data);

    return data;
};
