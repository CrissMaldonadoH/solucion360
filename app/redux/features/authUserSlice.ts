import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const fetchUserByEmail = createAsyncThunk(
  "user/fetchUserByEmail",
  async (email: string, thunkAPI) => {
    try {
      const response = await fetch(`${window.location.origin}/api/getUser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user info");
      }
      
      const data = await response.json();
      Cookies.set("auth", data.token, { expires: 1 });
      return data.token; 
    } catch (error) {
      return thunkAPI.rejectWithValue((error as Error).message);
    }
  }
);

export const authUserSlice= createSlice({
    name:'user',
    initialState:{
        isAuthenticated: false,
        token: null as string | null,
        loading: false,
        error: null as string | null,
    },
    reducers:{
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
        setUser: (state, action: PayloadAction<string>) => {
            state.isAuthenticated = true;
        },
        clearUser: (state) => {
            state.isAuthenticated = false;
            state.token = null;
            state.error = null;
            Cookies.remove("auth");
        },
    },
    extraReducers: (builder) => {
    builder
      .addCase(fetchUserByEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserByEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
      })
      .addCase(fetchUserByEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
})

export const { setUser, clearUser} = authUserSlice.actions;
export default authUserSlice.reducer;