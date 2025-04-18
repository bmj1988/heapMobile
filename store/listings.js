import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import { deleteListing, editListing, fetchUserListings, postListing } from '../lib/lambdas/listings';
import { uploadFile, uploadImages } from '../lib/appwrite';
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
            const uploadedImages = await uploadImages(images, newListing.$id);
            newListing = { ...newListing, images: uploadedImages }
            return newListing;
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to post listing');
        }
    }
)

export const deleteListingThunk = createAsyncThunk(
    'listings/deleteListing',
    async (listingId, { rejectWithValue }) => {
        try {
            const response = await deleteListing(listingId);
            if (response) {
                return listingId;
            } else {
                return rejectWithValue(response.error || 'Failed to delete listing');
            }
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to delete listing');
        }
    }
)

export const editListingThunk = createAsyncThunk(
    'listings/editListing',
    async ({ form, images, deletedImages }, { rejectWithValue }) => {
        try {
            let editedListing = await editListing(form);
            if (deletedImages?.length) {
                await deleteImages(deletedImages);
                const uploadedImages = await uploadImages(images, form.$id);
                editedListing = { ...editedListing, images: uploadedImages }
            }
            return editedListing;
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to edit listing');
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
            })
            .addCase(deleteListingThunk.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteListingThunk.fulfilled, (state, action) => {
                state.status = 'succeeded';
                console.log("DELETED LISTING", action.payload)
                delete state.openListings[action.payload];
                delete state.closedListings[action.payload];
            })
            .addCase(deleteListingThunk.rejected, (state, action) => {
                console.log("ERROR", action.error.message)
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(editListingThunk.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(editListingThunk.fulfilled, (state, action) => {
                state.status = 'succeeded';
                console.log("EDITED LISTING", action.payload)
                state.openListings[action.payload.$id] = action.payload;
            })
            .addCase(editListingThunk.rejected, (state, action) => {
                console.log("ERROR", action.error.message)
                state.status = 'failed';
                state.error = action.error.message;
            })

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
