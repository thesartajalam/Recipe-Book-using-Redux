import { createSlice } from "@reduxjs/toolkit";

const favouritesSclice = createSlice({
    name: 'favourites',
    initialState: {
        ids: []
    },
    reducers: {
        addFavourite: (state, action) => {
            state.ids.push(action.payload.id);
        },
        removeFavourite: (state) => {
            state.ids.splice(state.ids.indexOf(action.payload.id), 1);
        }
    }
});

export const addFavourite = favouritesSclice.actions.addFavourite;
export const removeFavourite = favouritesSclice.actions.removeFavourite;
export default favouritesSclice.reducer;