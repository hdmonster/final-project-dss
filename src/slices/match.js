import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  home: {
    id: {},
    score: {},
    startingEleven: [],
    goals: [],
    cards: [],
  },
  away: {
    id: {},
    score: {},
    startingEleven: [],
    goals: [],
    cards: [],
  },
};

const reducers = {
  setHomeData: (state, action) => {
    state.home = { ...state.home, ...action.payload };
  },
  setAwayData: (state, action) => {
    state.away = { ...state.away, ...action.payload };
  },
};

const slice = createSlice({
  name: "match",
  initialState,
  reducers,
});

export const { setHomeData, setAwayData } = slice.actions;

export const getMatch = (state) => state.match;
export const selectMatchHome = (state) => state.match.home;
export const selectMatchAway = (state) => state.match.away;

export const { reducer } = slice;
