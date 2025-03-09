import { configureStore } from '@reduxjs/toolkit';
import feedReducer from './feed';
import listingsReducer from './listings';

const store = configureStore({
    reducer: {
        feed: feedReducer,
        listings: listingsReducer,
    },
});

export default store;
