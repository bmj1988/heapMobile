import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    feedListings: {},
    status: 'idle',
    error: null,
};

export const fetchFeedListings = createAsyncThunk(
    'feed/fetchFeedListings',
    async () => {
        const response = await fetch('your-api-endpoint/feed');
        const data = await response.json();
        return data;
    }
);

const feedSlice = createSlice({
    name: 'feed',
    initialState,
    reducers: {
        setFeedListings: (state, action) => {
            state.feedListings = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFeedListings.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchFeedListings.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.feedListings = action.payload.reduce((acc, listing) => {
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

export default feedSlice.reducer;

export const selectAllFeedListings = (state) =>
    Object.values(state.feed.feedListings);
