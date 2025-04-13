import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import { fetchUserListings, postListing } from '../lib/lambdas/listings';
import { uploadFile } from '../lib/appwrite';
import { createImageRecord } from '../lib/lambdas/images';
const initialState = {
    openListings: {},
    closedListings: {},
    newBids: false,
    status: 'idle',
    error: null,
};

// Create async thunk for fetching listings
export const fetchOwnListings = createAsyncThunk(
    'listings/fetchOwnListings',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await fetchUserListings(userId);

            // Validate response format
            if (!response?.openListings || !response?.closedListings) {
                return rejectWithValue('Invalid response format');
            }

            return response;
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to fetch listings');
        }
    }
);

export const postListingThunk = createAsyncThunk(
    'listings/postListing',
    async (form, { rejectWithValue }) => {
        try {
            const { images, ...listing } = form;
            let newListing = await postListing(listing);
            console.log("NEW LISTING", newListing)
            const uploadedImages = await Promise.all(images.map(async (image) => {
                const fileUrl = await uploadFile(image, 'image');
                return { url: fileUrl, listing: newListing.$id };
            }));
            console.log("UPLOADED IMAGES", uploadedImages)
            // fire and forget, adjust if encountering issues
            // will have to change for production anyway.
            createImageRecord(uploadedImages);
            newListing = { ...newListing, images: uploadedImages }
            console.log("NEW LISTING", newListing)
            return newListing;
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to post listing');
        }
    }
)

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
            .addCase(fetchOwnListings.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchOwnListings.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.openListings = action.payload.openListings;
                state.closedListings = action.payload.closedListings;

            })
            .addCase(fetchOwnListings.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(postListingThunk.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(postListingThunk.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.openListings[action.payload.$id] = action.payload;
                console.log("NEW LISTING", action.payload)
            })
            .addCase(postListingThunk.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
                console.log("ERROR", action.error.message)
            });
    },
});

export const { setListings } = listingsSlice.actions;

export default listingsSlice.reducer;

// Memoized listing selectors

const selectOpenListings = (state) => state.listings.openListings;
const selectClosedListings = (state) => state.listings.closedListings;

export const openListingsArray = createSelector(
    [selectOpenListings],
    (openListings) => Object.values(openListings)
);

export const closedListingsArray = createSelector(
    [selectClosedListings],
    (closedListings) => Object.values(closedListings)
);
