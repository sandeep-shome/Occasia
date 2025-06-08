import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Subscription {
  id: String;
  tokens: number;
  userId: String;
  amount: number;
  successful: Boolean;
  createdAt: Date;
}

const initialState: { data: Subscription[] } = {
  data: [],
};

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {
    setInitialSubscriptionState: (
      state,
      action: PayloadAction<{ data: Subscription[] }>
    ) => {
      state.data = action.payload.data;
    },
    addToSubscription: (
      state,
      action: PayloadAction<{ data: Subscription }>
    ) => {
      state.data.unshift(action.payload.data);
    },
  },
});

export const { setInitialSubscriptionState, addToSubscription } =
  subscriptionSlice.actions;
export const subscriptionReducer = subscriptionSlice.reducer;
