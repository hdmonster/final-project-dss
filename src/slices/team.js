import { createSlice } from "@reduxjs/toolkit";
import { getTeams } from "src/thunks/team";

const initialState = {
  data: [],
  // home: {},
  // away: {},
};

const reducers = {
  // setHomeTeam: (state, action) => {
  //   const team = action.payload;
  //   state.home = { ...state.home, ...team };
  // },
  // setAwayTeam: (state, action) => {
  //   const team = action.payload;
  //   state.away = { ...state.away, ...team };
  // },
};

const slice = createSlice({
  name: "team",
  initialState,
  reducers,
  extraReducers: (builder) => {
    builder.addCase(getTeams.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export const { setHomeTeam, setAwayTeam } = slice.actions;

export const selectTeams = (state) => state.team.data;
// export const selectHomePlayers = (state) => state.team.home.players;
// export const selectAwayPlayers = (state) => state.team.away.players;

export const { reducer } = slice;

export default slice;
