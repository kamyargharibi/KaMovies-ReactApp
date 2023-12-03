import { createSlice } from "@reduxjs/toolkit";

export const movieSlice = createSlice({
  name: "movie",
  initialState: {
    url: {},
    genres: {},
  },
  reducers: {
    getApiData: (state, action) => {
      state.url = action.payload;
    },
    getGenres: (state, action) => {
      state.genres = action.payload;
    },
  },
});

export const { getApiData, getGenres } = movieSlice.actions;

export default movieSlice.reducer;
