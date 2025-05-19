import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TokenState {
  token: number;
}

const initialState: TokenState = {
  token: 0,
};

const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    initToken: (state, action: PayloadAction<{ tokens: number }>) => {
      state.token = action.payload.tokens;
    },
  },
});

export const { initToken } = tokenSlice.actions;
export const tokenReducer = tokenSlice.reducer;
