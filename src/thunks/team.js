import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getTeams = createAsyncThunk("team/all", async (thunkApi) => {
  const res = await axios.get("/api/clubs");
  return res.data;
});
