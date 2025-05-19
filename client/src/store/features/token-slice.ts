import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TokenState {
  tokens: number;
}

const initialState: TokenState = {
  tokens: 0,
};

const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    initToken: (state, action: PayloadAction<{ tokens: number }>) => {
      state.tokens = action.payload.tokens;
    },
    deductToken: (state, action) => {
      state.tokens = state.tokens - 1;
    },
  },
});

export const { initToken, deductToken } = tokenSlice.actions;
export const tokenReducer = tokenSlice.reducer;
