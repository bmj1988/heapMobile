import { configureStore } from '@reduxjs/toolkit';
import feedListingsReducer from './feed';

const store = configureStore({
    reducer: {
        feedListings: feedListingsReducer,
    },
});

export default store;
