import { combineReducers } from "@reduxjs/toolkit";
import { reducer as matchReducer } from "src/slices/match";
import { reducer as teamReducer } from "src/slices/team";

export const rootReducer = combineReducers({
  match: matchReducer,
  team: teamReducer,
});
