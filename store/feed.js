import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import { fetchFeed } from '../lib/appwriteFunctions';

const initialState = {
    listings: {},
    status: 'idle',
    error: null,
};

export const fetchFeedListings = createAsyncThunk(
    'feed/fetchFeedListings',
    async ({ long, lat, userId, radius = 10, page = 1 }) => {
        return await fetchFeed(long, lat, userId, radius, page);
    }
);

const feedSlice = createSlice({
    name: 'feed',
    initialState,
    reducers: {
        setListings: (state, action) => {
            state.listings = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFeedListings.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchFeedListings.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.listings = action.payload.reduce((acc, listing) => {
                    acc[listing.$id] = listing;
                    return acc;
                }, {});
            })
            .addCase(fetchFeedListings.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { setFeedListings } = feedSlice.actions;

// FEED LISTINGS ARRAY SELECTOR
const selectFeed = state => state.feed;

export const feedListingsArray = createSelector(
    [selectFeed],
    (feed) => Object.values(feed?.listings || {})
);

export default feedSlice.reducer;
