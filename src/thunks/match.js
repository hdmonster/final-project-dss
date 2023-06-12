import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createMatch = createAsyncThunk("match/create", async (data) => {
  const res = await axios.post("/api/matches/create", data);
  console.log(res.data);
});
