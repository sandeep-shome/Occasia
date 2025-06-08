import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import tokens from "razorpay/dist/types/tokens";

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
    deductToken: (state) => {
      state.tokens = state.tokens - 1;
    },
    addToken: (state, action: PayloadAction<{ tokens: number }>) => {
      state.tokens = state.tokens + action.payload.tokens;
    },
  },
});

export const { initToken, deductToken, addToken } = tokenSlice.actions;
export const tokenReducer = tokenSlice.reducer;
