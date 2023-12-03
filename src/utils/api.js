import axios from "axios";

// Base URL for { API }
const BASE_URL = "https://api.themoviedb.org/3";

// API Read Access Token import from .env file
const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;

// Headers & Token
const headers = {
  Authorization: "Bearer " + TMDB_TOKEN,
};

// Fetch Data from { API }
export const fetchDataFromApi = async (url, params) => {
  try {
    const { data } = await axios.get(BASE_URL + url, {
      headers,
      params,
    });
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
