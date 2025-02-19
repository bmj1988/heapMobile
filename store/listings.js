import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    listings: {},
    status: 'idle',
    error: null,
};

// Create async thunk for fetching listings
export const fetchListings = createAsyncThunk(
    'listings/fetchListings',
    async () => {
        const response = await fetch('your-api-endpoint/listings');
        const data = await response.json();
        return data;
    }
);

const listingsSlice = createSlice({
    name: 'listings',
    initialState: initialState,
    reducers: {
        setListings: (state, action) => {
            state.listings = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchListings.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchListings.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.listings = action.payload.reduce((acc, listing) => {
                    acc[listing.$id] = listing;
                    return acc;
                }, {});
            })
            .addCase(fetchListings.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { setListings } = listingsSlice.actions;

export default listingsSlice.reducer;

// Add selector to get listings as array
export const selectAllListings = (state) =>
    Object.values(state.listings.listings);
